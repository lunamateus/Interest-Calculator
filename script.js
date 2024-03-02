import {Investment} from './investment.js'

const calculateButton = document.getElementById('calculate');
const currentYearSpan = document.getElementById("currentYear");
let chart = new Chart("evoChart", {});

currentYearSpan.textContent = new Date().getFullYear();

// TO DO -> Reset Button
//const resetButton = document.getElementById('reset');

function drawChart(xData, yData, head) {
  return new Chart("evoChart", {
    type: "line",
    data: {
      labels: xData,
      datasets: [{
        label: `Investment`,
        fill: false,
        lineTension: 1,
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "rgba(0,0,255,0.2)",
        data: yData
      }]
    },
    options: {
      responsive: true,
      legend: {
        display: true
      },
      plugins : {
        title: {
          display: true,
          text: head,
          font: {
            size: 20
          }
        },
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Months',
            color: '#000',
          }
        },
        y: {
          min: Math.floor(yData[0]), 
          max: Math.ceil(yData[yData.length-1]),
          ticks: {
            callback: function(value, index, ticks) {
              return '$' + value;
            }
          }
        }
      }
    }
  });
}

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
  const tbody = document.createElement("tbody");
  const headerRow = document.createElement("tr");
  const resultsDiv = document.getElementById("results");
  const months = Array(investment.getMonths()).fill(1).map((n, i) => n + i);
  
  table.classList.add("table", "table-hover");
  thead.classList.add("table-dark");
  
  headerRow.innerHTML = `
    <th scope="col">${header[0]}</th>
    <th scope="col">${header[1]}</th>
  `;
  thead.appendChild(headerRow);
  
  for (let month of months) {
    investment.increase();
  
    // Create and populate row elements
    const row = document.createElement("tr");
    const monthCell = document.createElement("th");
    const amountCell = document.createElement("td");

    monthCell.textContent = month++;
    monthCell.scope = "row";
    amountCell.textContent = `$${investment.getAmount()}`;
  
    row.appendChild(monthCell);
    row.appendChild(amountCell);
  
    tbody.appendChild(row);
  }
  
  table.appendChild(thead);
  table.appendChild(tbody);
  
  resultsDiv.innerHTML = ""; // Clear existing content
  resultsDiv.appendChild(table);

  chart.destroy();
  chart = drawChart(months, 
    investment.getAmountSeries().slice(1), 
    "Total Amount: $" + investment.getAmount());
});
