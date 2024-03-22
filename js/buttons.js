import { generateData } from './table.js';

const calculatorButton = document.getElementById("calculator-form");
const clearButton = document.getElementById("clear");
const numberFields = document.querySelectorAll('#calculator-form input[type="number"]');
const chart = document.getElementById("evoChart");
const MAX_YEARS = 100;
const MAX_MONTHS = 1200

function getInputFieldValues(fields, values) {
  const obj = {};
  for (let index = 0; index < fields.length; index++) {
    obj[fields[index]] = parseFloat(values[index].value);
  }
  return obj;
}

calculatorButton.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission
  //Validate input data
  const fieldsID = ["principal", "monthlyContribution", "increaseRate", "interest", "years", "months"];
  const fields = getInputFieldValues(fieldsID, numberFields);
  let isValid = true;
  let errorMessage = "Please, enter valid numbers for: ";

  for (let index = 0; index < fieldsID.length; index++) {
    if (isNaN(fields[fieldsID[index]])) {
      isValid = false;
      errorMessage += `${fields[fieldsID[index]]}, `;
    }
  }
  if (!isValid) {
    alert(errorMessage.slice(0, -2));
    return;
  }
  if (fields.years > MAX_YEARS) {
    alert(`${errorMessage.slice(0, -2)} years between 1 and ${MAX_YEARS}`);
    return;
  }
  if (fields.months > MAX_MONTHS) {
    alert(`${errorMessage.slice(0, -2)} months between 1 and ${MAX_MONTHS}`);
    return
  }

  generateData(fields);
  chart.scrollIntoView({ behavior: "smooth" });
});

clearButton.addEventListener('click', () => {
  numberFields.forEach(field => {
    field.value = "";
  });
});
