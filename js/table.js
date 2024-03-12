import {Investment} from './investment.js';
import {drawChart} from './chart.js';
import { getJsonValue } from './utils.js';
import data from "../json/texts.json" assert { type: "json" };

let chart = new Chart("evoChart", {});

function appendToParent(element, parent, content = '', scope = '') {
  const child = document.createElement(element);
  child.scope = scope;
  child.textContent = content;
  parent.appendChild(child);
}

function getMonthYears(nMonths) {
  const monthYearStrings = [];
  const currentDate = new Date();

  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth();

  for (let i = 0; i < nMonths; i++) {
    const formattedString = new Date(currentYear, currentMonth, 1)
      .toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    monthYearStrings.push(formattedString);

    currentMonth++;
    if (currentMonth >= 12) {
      currentMonth = 0;
      currentYear++;
    }
  }

  return monthYearStrings;
}

export function formatToCurrency(content) {
  return `$${content.toLocaleString()}`;
}

function createCollapseButton(id, hiddenText, shownText) {
  const button = document.createElement('button');
  button.classList.add('btn', 'btn-outline-dark', 'collapsed');
  button.setAttribute('type', 'button');
  button.setAttribute('data-bs-toggle', 'collapse');
  button.setAttribute('data-bs-target', '#' + id);
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-controls', id);
  button.textContent = hiddenText;
  button.addEventListener('click', function () {
    this.textContent = this.classList.contains('collapsed') ? hiddenText : shownText;
  });

  return button;
}

export function generateData(fields) {
  const columns = ["Month", "Date", "Deposited", "Total Amount"];
  const collapseDiv = document.createElement("div");
  const tableDiv = document.createElement("div");
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
  
  tableDiv.classList.add("collapse");
  tableDiv.setAttribute("id", "table");
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
    const row = document.createElement("tr");

    appendToParent("th", row, month, "row");
    appendToParent("td", row, dates[month]);
    appendToParent("td", row, formatToCurrency(investment.getInvestedAmount(month)));
    appendToParent("td", row, formatToCurrency(investment.getAmount(month)));

    tbody.appendChild(row);
  }
  
  table.appendChild(thead);
  table.appendChild(tbody);
  tableDiv.appendChild(table);
  collapseDiv.classList.add("d-grid", "gap-2");
  collapseDiv.appendChild(
    createCollapseButton("table", data.buttons.showTable, data.buttons.hideTable));
  collapseDiv.appendChild(tableDiv);

  chart.destroy();
  chart = drawChart(
    investment.getMonths(), 
    investment.getTotalAmounts(),
    investment.getInvestedAmounts(),
    getJsonValue("chart"),
    `${formatToCurrency(investment.getAmount(investment.getTotalMonths()))}`);

  return collapseDiv;
}