document.addEventListener('DOMContentLoaded', function() {
    // API URL
    const apiUrl = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon';
  
    // Get DOM elements
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const pokemonInfo = document.querySelector('.pokemon-info');
    const pokemonName = document.getElementById('pokemon-name');
    const pokemonId = document.getElementById('pokemon-id');
    const pokemonWeight = document.getElementById('weight');
    const pokemonHeight = document.getElementById('height');
    const pokemonTypes = document.getElementById('types');
    const pokemonHp = document.getElementById('hp');
    const pokemonAttack = document.getElementById('attack');
    const pokemonDefense = document.getElementById('defense');
    const pokemonSpecialAttack = document.getElementById('special-attack');
    const pokemonSpecialDefense = document.getElementById('special-defense');
    const pokemonSpeed = document.getElementById('speed');
    const pokemonImage = document.querySelector('.pokemon-image');
  
    // Add event listener to search button
    searchButton.addEventListener('click', searchPokemon);
    
    // Also allow search on Enter key press
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        searchPokemon();
      }
    });
  
    // Function to search for Pokémon
    function searchPokemon() {
      const searchTerm = searchInput.value.toLowerCase().trim();
      
      if (!searchTerm) {
        return;
      }
  
      // Fetch Pokémon data
      fetch(`${apiUrl}/${searchTerm}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Pokémon not found');
          }
          return response.json();
        })
        .then(data => {
          displayPokemonData(data);
        })
        .catch(error => {
          alert('Pokémon not found');
          console.error('Error:', error);
        });
    }
  
    // Function to display Pokémon data
    function displayPokemonData(pokemon) {
      // Display pokemon info container
      pokemonInfo.style.display = 'block';
      
      // Set basic info
      pokemonName.textContent = pokemon.name.toUpperCase();
      pokemonId.textContent = `#${pokemon.id}`;
      pokemonHeight.textContent = pokemon.height;
      pokemonWeight.textContent = pokemon.weight;
      
      // Clear and set types
      pokemonTypes.innerHTML = '';
      pokemon.types.forEach(typeInfo => {
        const typeElement = document.createElement('span');
        typeElement.textContent = typeInfo.type.name.toUpperCase();
        typeElement.classList.add('type', typeInfo.type.name.toLowerCase());
        pokemonTypes.appendChild(typeElement);
      });
      
      // Set stats
      let stats = {};
      pokemon.stats.forEach(stat => {
        stats[stat.stat.name] = stat.base_stat;
      });
      
      pokemonHp.textContent = stats.hp;
      pokemonAttack.textContent = stats.attack;
      pokemonDefense.textContent = stats.defense;
      pokemonSpecialAttack.textContent = stats['special-attack'];
      pokemonSpecialDefense.textContent = stats['special-defense'];
      pokemonSpeed.textContent = stats.speed;
      
      // Set sprite image
      pokemonImage.innerHTML = '';
      const spriteImg = document.createElement('img');
      spriteImg.id = 'sprite';
      spriteImg.src = pokemon.sprites.front_default;
      spriteImg.alt = pokemon.name;
      pokemonImage.appendChild(spriteImg);
    }
  });