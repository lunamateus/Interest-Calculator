const clearButton = document.getElementById("clear"); // Select the button element
const numberFields = document.querySelectorAll('#calculator-form input[type="number"]'); // Select only number input fields

clearButton.addEventListener('click', () => {
  numberFields.forEach(field => {
    field.value = ""; // Clear the value of each number field
  });
});
