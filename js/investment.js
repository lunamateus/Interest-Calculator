export class Investment {
  constructor(amount, monthlyInvestment = 0, increaseRate = 0, interest, numOfMonths) {
    this.amount = [this.formatNumber(amount)];
    this.monthlyInvestment = [monthlyInvestment];
    this.increaseRate = increaseRate;
    this.interest = interest;
    this.currentMonth = 0;
    this.numOfMonths = numOfMonths;
    this.invested = [this.formatNumber(amount)];
    this.months = Array(this.numOfMonths + 1).fill(0).map((n, i) => n + i);
  }

  getTotalAmount() {
    return this.amount[this.numOfMonths];
  }

  getTotalAmounts() {
    return this.amount;
  }

  getNumOfMonths() {
    return this.numOfMonths;
  }

  getMonths() {
    return this.months;
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
    for (let month = 0; month < this.numOfMonths; month++) {
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
