import { generateData } from './table.js';

const resultsDiv = document.getElementById("results");
const currentYearSpan = document.getElementById("currentYear");

currentYearSpan.textContent = new Date().getFullYear();

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

  resultsDiv.innerHTML = ""; // Clear existing content
  resultsDiv.appendChild(generateData(fields));
});
