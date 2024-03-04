import {Investment} from './investment.js'
import {drawChart} from './chart.js';
import {getMonthYears} from './date.js';

const currentYearSpan = document.getElementById("currentYear");
const resultsDiv = document.getElementById("results");
let chart = new Chart("evoChart", {});
currentYearSpan.textContent = new Date().getFullYear();
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

// TO DO -> Reset Button
//const resetButton = document.getElementById('reset');

document.getElementById("calculator-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission
  //Validate input data
  const fields = ["principal", "monthlyContribution", "increaseRate", "interest", "years"];
  let isValid = true;
  let errorMessage = "Please, enter valid numbers for: ";
  for (const field of fields) {
    if (isNaN(parseFloat(document.getElementById(field).value))) {
      isValid = false;
      errorMessage += `${field}, `;
    }
  }
  if (!isValid) {
    alert(errorMessage.slice(0, -2));
    return;
  }
  if (parseFloat(document.getElementById("years").value) > 100) {
    alert(errorMessage.slice(0, -2) + ' years between 1 and 100');
    return;
  }

  const investment = new Investment(
    parseFloat(document.getElementById(fields[0]).value), // principal
    parseFloat(document.getElementById(fields[1]).value), // monthlyContribution
    parseFloat(document.getElementById(fields[2]).value) / 100, // increaseRate
    parseFloat(document.getElementById(fields[3]).value) / 100, // interest
    parseInt(document.getElementById(fields[4]).value) // years
  );
  investment.generateData();

  const columns = ["Month", "Date", "Deposited", "Total Amount"];
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  const headerRow = document.createElement("tr");
  const dates = getMonthYears(investment.getTotalMonths() + 1);
  
  table.classList.add("table", "table-hover");
  thead.classList.add("table-dark");
  
  for (let column in columns) {
    const header = document.createElement("th");
    header.scope = "col";
    header.textContent = columns[column];
    headerRow.appendChild(header);
  }
  thead.appendChild(headerRow);
  
  for (let month of investment.getMonths()) {  
    // Create and populate row elements
    const row = document.createElement("tr");
    const monthCell = document.createElement("th");
    const dateCell = document.createElement("td");
    const investedCell = document.createElement("td");
    const amountCell = document.createElement("td");

    monthCell.scope = "row";
    monthCell.textContent = month;
    dateCell.textContent = dates[month];
    investedCell.textContent = `$${investment.getInvestedAmount(month).toLocaleString()}`;
    amountCell.textContent = `$${investment.getAmount(month).toLocaleString()}`;

    row.appendChild(monthCell);
    row.appendChild(dateCell);
    row.appendChild(investedCell);
    row.appendChild(amountCell);
    tbody.appendChild(row);
  }
  
  table.appendChild(thead);
  table.appendChild(tbody);
  
  resultsDiv.innerHTML = ""; // Clear existing content
  resultsDiv.appendChild(table);

  chart.destroy();
  chart = drawChart(
    investment.getMonths(), 
    investment.getTotalAmounts(),
    investment.getInvestedAmounts(),
    "Total Amount: $" + investment.getAmount(investment.getTotalMonths()).toLocaleString());
});
