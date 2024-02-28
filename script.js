import {Investment} from './investment.js'

const calculateButton = document.getElementById('calculate');
const currentYearSpan = document.getElementById("currentYear");

currentYearSpan.textContent = new Date().getFullYear();

// TO DO -> Reset Button
//const resetButton = document.getElementById('reset');

calculateButton.addEventListener('click', () => {
  // Validate input values
  const fields = ["principal", "monthlyInvestment", "increaseRate", "interest", "years"];
  let isValid = true;
  let errorMessage = "Please enter valid numbers for: ";
  for (const field of fields) {
    if (isNaN(parseFloat(document.getElementById(field).value))) {
      isValid = false;
      errorMessage += `${field}, `;
    }
  }
  if (!isValid) {
    resultsDiv.innerHTML = '<p>' + errorMessage.slice(0, -2) + '</p>';
    return;
  }

  const investment = new Investment(
    parseFloat(document.getElementById(fields[0]).value), // principal
    parseFloat(document.getElementById(fields[1]).value), // monthlyInvestment
    parseFloat(document.getElementById(fields[2]).value) / 100, // increaseRate
    parseFloat(document.getElementById(fields[3]).value) / 100, // interest
    parseInt(document.getElementById(fields[4]).value) // years
  );

  const header = ["Month", "Amount"];
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const resultsDiv = document.getElementById("results");
  
  table.classList.add("table", "table-hover");
  thead.classList.add("table-dark");
  
  headerRow.innerHTML = `
    <th scope="col">${header[0]}</th>
    <th scope="col">${header[1]}</th>
  `;
  thead.appendChild(headerRow);
  
  const tbody = document.createElement("tbody");
  
  for (let month = 1; month <= investment.getMonths();) {
    investment.increase();
  
    // Create and populate row elements
    const row = document.createElement("tr");
    const monthCell = document.createElement("th");

    monthCell.textContent = month++;
    monthCell.scope = "row";
    
    const amountCell = document.createElement("td");
    amountCell.textContent = `$${investment.getAmount().toFixed(2)}`;
  
    row.appendChild(monthCell);
    row.appendChild(amountCell);
  
    tbody.appendChild(row);
  }
  
  table.appendChild(thead);
  table.appendChild(tbody);
  
  resultsDiv.innerHTML = ""; // Clear existing content
  resultsDiv.appendChild(table);
  
});
