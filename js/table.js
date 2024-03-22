import {Investment} from './investment.js';
import {drawChart} from './chart.js';
import { getJsonValue, userLang, dataT } from './utils.js';

let chart = new Chart("evoChart", {});
let buttonsText;
const resultsDiv = document.getElementById("results");

function clearData() {
  chart.destroy();
  resultsDiv.innerHTML = "";
}

function appendToParent(element, parent, content = '', scope = '') {
  const child = document.createElement(element);
  child.textContent = content;
  child.scope = scope;
  parent.appendChild(child);
}

function getMonthYears(nMonths, lang) {
  const monthYearStrings = [];
  const currentDate = new Date();

  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth();

  for (let i = 0; i < nMonths; i++) {
    const formattedString = new Date(currentYear, currentMonth, 1)
      .toLocaleDateString(lang, { month: 'long', year: 'numeric' });
    monthYearStrings.push(formattedString);

    currentMonth++;
    if (currentMonth >= 12) {
      currentMonth = 0;
      currentYear++;
    }
  }

  return monthYearStrings;
}

function truncateString(str, maxLength = 21) {
  return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
}

export function formatToCurrency(content) {
  return `$${truncateString(content.toLocaleString())}`;
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

function getColumnNames(data) {
  return [data.month, data.date, data.invested, data.totalAmount];
}

function createTableHeader(headerRow, columns) {
  for (const column in columns) {
    const header = document.createElement("th");
    header.scope = "col";
    header.textContent = columns[column];
    headerRow.appendChild(header);
  }

  return headerRow;
}

function createTable(nRows, columns, tableData) {
  const tableDiv = document.createElement("div");
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  const headerRow = document.createElement("tr");

  tableDiv.classList.add("collapse");
  tableDiv.setAttribute("id", "table");
  table.classList.add("table", "table-hover");
  thead.classList.add("table-dark");

  thead.appendChild(createTableHeader(headerRow, columns));

  for (let row = 0; row <= nRows; row++) {
    const thisRow = document.createElement("tr");

    appendToParent("th", thisRow, tableData[0][row], "row");
    appendToParent("td", thisRow, tableData[1][row]);
    appendToParent("td", thisRow, formatToCurrency(tableData[2][row]));
    appendToParent("td", thisRow, formatToCurrency(tableData[3][row]));

    tbody.appendChild(thisRow);
  }
  
  table.appendChild(thead);
  table.appendChild(tbody);
  tableDiv.appendChild(table);

  return tableDiv;
}

function timeInMonths(years, months) {
  return years * 12 + months;
}

export function generateData(values) {
  const columns = getColumnNames(dataT.chart);
  const collapseDiv = document.createElement("div");
  let tableDiv;
  let investmentData;
  const investment = new Investment(values[0], values[1], values[2] / 100, values[3] / 100, timeInMonths(values[4], values[5]));
  const dates = getMonthYears(investment.getNumOfMonths() + 1, userLang);
  
  clearData();
  investment.grow();
  
  investmentData = [investment.getMonths(), dates, investment.getInvestedAmounts(), investment.getTotalAmounts()];
  tableDiv = createTable(investment.getNumOfMonths(), columns, investmentData);

  buttonsText = dataT.buttons;
  collapseDiv.classList.add("d-grid", "gap-2");
  collapseDiv.appendChild(createCollapseButton("table", buttonsText.showTable, buttonsText.hideTable));
  collapseDiv.appendChild(tableDiv);
  console.log(investmentData); //////////////

  chart = drawChart(
    investment.getMonths(), 
    investment.getTotalAmounts(),
    investment.getInvestedAmounts(),
    getJsonValue('chart'),
    `${formatToCurrency(investment.getTotalAmount())}`);

  resultsDiv.appendChild(collapseDiv);
}