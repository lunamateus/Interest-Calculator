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

  getTotalAmount() {
    return this.amount[this.totalMonths];
  }

  getTotalAmounts() {
    return this.amount;
  }

  getMonths() {
    return this.months;
  }

  getTotalMonths() {
    return this.totalMonths;
  }

  getInvestedAmounts() {
    return this.invested;
  }

  getRateFactor(rate) {
    return rate + 1;
  }

  formatNumber(number) {
    return parseFloat(number.toFixed(2));
  }

  grow() {
    for (let month = 0; month < this.totalMonths; month++) {
      let lastAmount = this.amount[month];
      let lastMonthlyInvestment = this.monthlyInvestment[month];
      let actualMonthlyInvestment = lastMonthlyInvestment * this.getRateFactor(this.increaseRate);
      let totalInvested = actualMonthlyInvestment + this.invested[month];
      let actualAmount = lastAmount * this.getRateFactor(this.interest) + actualMonthlyInvestment;
  
      this.monthlyInvestment.push(this.formatNumber(actualMonthlyInvestment));
      this.invested.push(this.formatNumber(totalInvested));
      this.amount.push(this.formatNumber(actualAmount));
    }
  }
};
