const clearButton = document.getElementById("clear");
const numberFields = document.querySelectorAll('#calculator-form input[type="number"]');

clearButton.addEventListener('click', () => {
  numberFields.forEach(field => {
    field.value = "";
  });
});
