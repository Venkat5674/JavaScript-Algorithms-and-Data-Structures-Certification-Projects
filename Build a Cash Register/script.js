// Define the price and cash-in-drawer (cid) variables
let price = 19.5;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

// Currency unit values in dollars
const currencyUnitValues = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.1,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
};

// Display the price on page load
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("price-display").textContent = `$${price.toFixed(2)}`;
  displayCashInDrawer();
});

// Display the cash in drawer
function displayCashInDrawer() {
  const drawerDisplay = document.getElementById("drawer-display");
  drawerDisplay.innerHTML = "";
  
  cid.forEach(item => {
    const [name, amount] = item;
    const div = document.createElement("div");
    div.textContent = `${name}: $${amount.toFixed(2)}`;
    drawerDisplay.appendChild(div);
  });
}

// Handle the purchase button click
document.getElementById("purchase-btn").addEventListener("click", function() {
  const cashInput = document.getElementById("cash");
  const cashValue = parseFloat(cashInput.value);
  const changeDue = document.getElementById("change-due");
  
  // Check if the cash input is valid
  if (isNaN(cashValue) || cashValue <= 0) {
    alert("Please enter a valid cash amount");
    return;
  }
  
  // Check if the customer has enough money
  if (cashValue < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }
  
  // If exact cash, no change due
  if (cashValue === price) {
    changeDue.textContent = "No change due - customer paid with exact cash";
    return;
  }
  
  // Calculate change
  const changeAmount = cashValue - price;
  const changeResult = calculateChange(changeAmount);
  
  // Display change result
  changeDue.textContent = formatChangeOutput(changeResult);
});

// Function to calculate change
function calculateChange(changeAmount) {
  let change = [];
  let totalCID = 0;
  
  // Calculate total cash in drawer
  for (let i = 0; i < cid.length; i++) {
    totalCID += cid[i][1];
  }
  totalCID = Math.round(totalCID * 100) / 100;
  
  // Handle CLOSED status case - when total CID equals change amount
  if (Math.abs(totalCID - changeAmount) < 0.001) {
    return { status: "CLOSED", change: [...cid] };
  }
  
  // Create a copy of CID in reverse order (highest to lowest)
  const reversedCID = [...cid].reverse();
  
  // Loop through each currency unit to calculate change
  for (let i = 0; i < reversedCID.length; i++) {
    const currencyName = reversedCID[i][0];
    const currencyTotal = reversedCID[i][1];
    const unitValue = currencyUnitValues[currencyName];
    
    let currencyAmount = 0;
    
    // Calculate how many of this unit we can use
    while (changeAmount >= unitValue && currencyAmount < currencyTotal) {
      changeAmount = Math.round((changeAmount - unitValue) * 100) / 100;
      currencyAmount = Math.round((currencyAmount + unitValue) * 100) / 100;
    }
    
    // Add to change array if we used this currency
    if (currencyAmount > 0) {
      change.push([currencyName, currencyAmount]);
    }
  }
  
  // Handle INSUFFICIENT_FUNDS case
  if (changeAmount > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }
  
  return { status: "OPEN", change: change };
}

// Format change output
function formatChangeOutput(result) {
  if (result.status === "INSUFFICIENT_FUNDS") {
    return "Status: INSUFFICIENT_FUNDS";
  }
  
  if (result.status === "CLOSED") {
    let output = `Status: CLOSED`;
    result.change.forEach(item => {
      if (item[1] > 0) {
        output += ` ${item[0]}: $${item[1].toFixed(2)}`;
      }
    });
    return output.trim();
  }
  
  if (result.status === "OPEN") {
    let output = `Status: OPEN`;
    result.change.forEach(item => {
      output += ` ${item[0]}: $${item[1].toFixed(2)}`;
    });
    return output.trim();
  }
}