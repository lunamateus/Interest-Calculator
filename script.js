import {Investment} from './investment.js'

const calculateButton = document.getElementById('calculate');
const resultsDiv = document.getElementById('results');
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
  let results = 
  `<table class="table table-hover">
    <thead class="table-dark">
      <tr>
        <th scope="col">${header[0]}</th>
        <th scope="col">${header[1]}</th>
      </tr>
    </thead>
    <tbody>`;

  for (let month = 1; month <= investment.getMonths();) {
    investment.increase();
    results += 
    `<tr>
      <th scope="row">${month++}</td>
      <td>$${investment.getAmount().toFixed(2)}</td>
    </tr>`;
  }
  results += `</tbody>
              </table>`;

  resultsDiv.innerHTML = results;
});
