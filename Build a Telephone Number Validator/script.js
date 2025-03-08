document.addEventListener("DOMContentLoaded", () => {
    const userInput = document.getElementById("user-input");
    const checkBtn = document.getElementById("check-btn");
    const clearBtn = document.getElementById("clear-btn");
    const resultsDiv = document.getElementById("results-div");
  
    // Function to validate US phone numbers
    const validatePhoneNumber = (phoneNumber) => {
      const regex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;
      return regex.test(phoneNumber);
    };
  
    // Function to handle the check button click
    checkBtn.addEventListener("click", () => {
      const inputValue = userInput.value.trim();
      if (!inputValue) {
        alert("Please provide a phone number");
        return;
      }
  
      const isValid = validatePhoneNumber(inputValue);
      if (isValid) {
        resultsDiv.textContent = `Valid US number: ${inputValue}`;
        resultsDiv.style.color = "#28a745";
      } else {
        resultsDiv.textContent = `Invalid US number: ${inputValue}`;
        resultsDiv.style.color = "#dc3545";
      }
    });
  
    // Function to handle the clear button click
    clearBtn.addEventListener("click", () => {
      resultsDiv.textContent = "";
      userInput.value = "";
    });
  });