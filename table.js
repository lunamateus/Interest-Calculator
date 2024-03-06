import {Investment} from './investment.js';
import {getMonthYears} from './date.js';
import {drawChart} from './chart.js';

let chart = new Chart("evoChart", {});

function appendToParent(element, parent, content = '', scope = '') {
  const child = document.createElement(element);
  child.scope = scope;
  child.textContent = content;
  parent.appendChild(child);
}

function formatToCurrency(content) {
  return `$${content.toLocaleString()}`;
}

export function generateData(fields) {
  const columns = ["Month", "Date", "Deposited", "Total Amount"];
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  const headerRow = document.createElement("tr");
  const investment = new Investment(
    parseFloat(document.getElementById(fields[0]).value), // principal
    parseFloat(document.getElementById(fields[1]).value), // monthlyContribution
    parseFloat(document.getElementById(fields[2]).value) / 100, // increaseRate
    parseFloat(document.getElementById(fields[3]).value) / 100, // interest
    parseInt(document.getElementById(fields[4]).value) // years
  );
  const dates = getMonthYears(investment.getTotalMonths() + 1);
  
  investment.grow();
  
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

    appendToParent("th", row, month, "row");
    appendToParent("td", row, dates[month]);
    appendToParent("td", row, formatToCurrency(investment.getInvestedAmount(month)));
    appendToParent("td", row, formatToCurrency(investment.getAmount(month)));

    tbody.appendChild(row);
  }
  
  table.appendChild(thead);
  table.appendChild(tbody);

  chart.destroy();
  chart = drawChart(
    investment.getMonths(), 
    investment.getTotalAmounts(),
    investment.getInvestedAmounts(),
    `Total Amount: ${formatToCurrency(investment.getAmount(investment.getTotalMonths()))}`);

  return table;
}

