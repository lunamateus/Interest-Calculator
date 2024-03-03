export class Investment {
  constructor(amount, monthlyInvestment = 0, increaseRate = 0, interest, years) {
    this.amount = [parseFloat(amount.toFixed(2))];
    this.monthlyInvestment = [monthlyInvestment];
    this.increaseRate = increaseRate;
    this.interest = interest;
    this.years = years;
    this.currentMonth = 0;
    this.totalMonths = years * 12;
    this.invested = [parseFloat(amount.toFixed(2))];
    this.months = Array(this.totalMonths + 1).fill(0).map((n, i) => n + i);
  }

  getAmount(month) {
    return this.amount[month];
  }

  getAmountSeries() {
    return this.amount;
  }

  getMonths() {
    return this.months;
  }

  getTotalMonths() {
    return this.totalMonths;
  }

  getMonthyInvestments() {
    return this.monthlyInvestment;
  }

  getInvestedAmounts() {
    return this.invested;
  }

  getRateFactor(rate) {
    return rate + 1;
  }

  generateData() {
    for (let month = 0; month < this.totalMonths; month++) {
      let lastAmount = this.amount[month];
      let lastMonthlyInvestment = this.monthlyInvestment[month];
      let actualMonthlyInvetment = lastMonthlyInvestment * this.getRateFactor(this.increaseRate);
      let actualAmount = lastAmount * this.getRateFactor(this.interest) + actualMonthlyInvetment;
  
      this.monthlyInvestment.push(parseFloat(actualMonthlyInvetment.toFixed(2)));
      this.invested.push(this.invested[month] + parseFloat(actualMonthlyInvetment.toFixed(2)));
      this.amount.push(parseFloat(actualAmount.toFixed(2)));
    }
    console.log(this.invested);
  }
};
