const calculateButton = document.getElementById('calculate');
const resultsDiv = document.getElementById('results');
// TO DO -> Reset Button
//const resetButton = document.getElementById('reset');

calculateButton.addEventListener('click', () => {
  // Validate input values
  const fields = ["principal", "monthlyInvestment", "increaseRate", "interest", "years"];
  let isValid = true;
  const errorMessage = "Please enter valid numbers for: ";
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

  // Extract and convert values
  const principal = parseFloat(document.getElementById(fields[0]).value);
  const initialMonthlyInvestment = parseFloat(document.getElementById(fields[1]).value);
  const increaseRate = parseFloat(document.getElementById(fields[2]).value) / 100;
  const interest = parseFloat(document.getElementById(fields[3]).value) / 100;
  const months = parseInt(document.getElementById(fields[4]).value) * 12;

  // Calculate results
  let amount = principal;
  let monthlyInvestment = initialMonthlyInvestment;
  const header = ["Year", "Month", "Amount"];
  let results = `<table class="table table-hover">
                  <thead class="table-dark">
                    <tr>
                      <th scope="col">${header[0]}</th>
                      <th scope="col">${header[1]}</th>
                      <th scope="col">${header[2]}</th>
                    </tr>
                  </thead>
                  <tbody>`;
                  
  //console.log(results)
  for (let i = 0; i < months; i++) {
    // Calculate year and month
    const year = Math.floor(i / 12);
    const month = i % 12 + 1;
  
    // Calculate amount
    amount += amount * interest + monthlyInvestment;
  
    // Format results with year and month
    //results += `<p>Year ${year + 1}, Month ${month}: $${amount.toFixed(2)}</p>`;
    results += `<tr>
                  <th scope="row">${year + 1}</td>
                  <td>${month}</td>
                  <td>$${amount.toFixed(2)}</td>
                </tr>`
  
    // Increase monthly investment
    monthlyInvestment += monthlyInvestment * increaseRate;
  }
  results += `</tbody>
            </table>`;
  
  // Display results
  resultsDiv.innerHTML = results;
});