document.addEventListener('DOMContentLoaded', function() {
    const numberInput = document.getElementById('number');
    const convertBtn = document.getElementById('convert-btn');
    const output = document.getElementById('output');
  
    convertBtn.addEventListener('click', function() {
      const inputValue = numberInput.value;
      
      // Check if input is empty
      if (inputValue === '') {
        displayResult("Please enter a valid number", "error");
        return;
      }
      
      // Parse input to integer
      const num = parseInt(inputValue);
      
      // Check if input is less than 1
      if (num < 1) {
        displayResult("Please enter a number greater than or equal to 1", "error");
        return;
      }
      
      // Check if input is greater than 3999
      if (num > 3999) {
        displayResult("Please enter a number less than or equal to 3999", "error");
        return;
      }
      
      // Convert to Roman numeral
      const romanNumeral = convertToRoman(num);
      displayResult(romanNumeral, "success");
    });
  
    function convertToRoman(num) {
      const romanNumerals = [
        { value: 1000, symbol: 'M' },
        { value: 900, symbol: 'CM' },
        { value: 500, symbol: 'D' },
        { value: 400, symbol: 'CD' },
        { value: 100, symbol: 'C' },
        { value: 90, symbol: 'XC' },
        { value: 50, symbol: 'L' },
        { value: 40, symbol: 'XL' },
        { value: 10, symbol: 'X' },
        { value: 9, symbol: 'IX' },
        { value: 5, symbol: 'V' },
        { value: 4, symbol: 'IV' },
        { value: 1, symbol: 'I' }
      ];
      
      let result = '';
      
      // Iterate through the romanNumerals array
      for (let i = 0; i < romanNumerals.length; i++) {
        // While the current value can be subtracted from num
        while (num >= romanNumerals[i].value) {
          // Add the symbol to result
          result += romanNumerals[i].symbol;
          // Subtract the value from num
          num -= romanNumerals[i].value;
        }
      }
      
      return result;
    }
  
    function displayResult(text, type) {
      output.textContent = text;
      output.className = 'result ' + type;
    }
  });