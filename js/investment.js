export class Investment {
  constructor(amount, monthlyInvestment = 0, increaseRate = 0, interest, numOfMonths, annualIncrease = false) {
    this.amount = [this.formatNumber(amount)];
    this.monthlyInvestment = [monthlyInvestment];
    this.increaseRate = increaseRate / 100;
    this.interest = interest;
    this.currentMonth = 0;
    this.numOfMonths = numOfMonths;
    this.invested = [this.formatNumber(amount)];
    this.months = Array(this.numOfMonths + 1).fill(0).map((n, i) => n + i);
    this.annualIncrease = annualIncrease;
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

  annualIncreaseRate(value, month) {
    let currentValue = value;
    if (!this.annualIncrease || month % 12 == 0) {
      currentValue *= this.getRateFactor(this.increaseRate);
    }
    return currentValue;
  }

  formatNumber(number) {
    return parseFloat(number.toFixed(2));
  }

  grow() {
    for (let month = 0; month < this.numOfMonths; month++) {
      let lastAmount = this.amount[month];
      let lastMonthlyInvestment = this.monthlyInvestment[month];
      let currentMonthlyInvestment = this.annualIncreaseRate(lastMonthlyInvestment, month + 1);
      let totalInvested = currentMonthlyInvestment + this.invested[month];
      let currentAmount = lastAmount * this.getRateFactor(this.interest) + currentMonthlyInvestment;
  
      this.monthlyInvestment.push(this.formatNumber(currentMonthlyInvestment));
      this.invested.push(this.formatNumber(totalInvested));
      this.amount.push(this.formatNumber(currentAmount));
    }
  }
};
