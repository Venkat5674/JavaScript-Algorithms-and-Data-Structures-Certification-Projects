document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('text-input');
    const checkBtn = document.getElementById('check-btn');
    const result = document.getElementById('result');
  
    checkBtn.addEventListener('click', function() {
      // Check if input is empty
      if (textInput.value.trim() === '') {
        alert('Please input a value');
        return;
      }
  
      const inputText = textInput.value;
      const isPalindrome = checkPalindrome(inputText);
      
      // Display the result
      if (isPalindrome) {
        result.innerHTML = `<span class="palindrome">${inputText} is a palindrome</span>`;
      } else {
        result.innerHTML = `<span class="not-palindrome">${inputText} is not a palindrome</span>`;
      }
    });
  
    function checkPalindrome(str) {
      // Convert to lowercase and remove all non-alphanumeric characters
      const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
      
      // Check if the cleaned string reads the same forwards and backwards
      const reversedStr = cleanStr.split('').reverse().join('');
      
      return cleanStr === reversedStr;
    }
  });