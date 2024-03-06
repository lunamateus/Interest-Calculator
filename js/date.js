export function getMonthYears(nMonths) {
  const monthYearStrings = [];
  const currentDate = new Date();

  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth();

  for (let i = 0; i < nMonths; i++) {
    const formattedString = new Date(currentYear, currentMonth, 1)
      .toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    monthYearStrings.push(formattedString);

    // Update month and year for the next iteration
    currentMonth++;
    if (currentMonth >= 12) {
      currentMonth = 0;
      currentYear++;
    }
  }

  return monthYearStrings;
}