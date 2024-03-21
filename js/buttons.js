import { generateData } from './table.js';

const calculatorButton = document.getElementById("calculator-form");
const clearButton = document.getElementById("clear");
const numberFields = document.querySelectorAll('#calculator-form input[type="number"]');
const chart = document.getElementById("evoChart");

function getInputFieldValues(fields) {
  const values = [];

  fields.forEach(field => {
    values.push(parseFloat(field.value));
  });

  return values;
}

calculatorButton.addEventListener("submit", function(event) {
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

  generateData(getInputFieldValues(numberFields));
  chart.scrollIntoView({ behavior: "smooth" });
});

clearButton.addEventListener('click', () => {
  numberFields.forEach(field => {
    field.value = "";
  });
});
