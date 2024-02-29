export class Investment {
  constructor(amount, monthlyInvestment = 0, increaseRate = 0, interest, years) {
    this.amount = [parseFloat(amount.toFixed(2))];
    this.monthlyInvestment = [monthlyInvestment];
    this.increaseRate = increaseRate;
    this.interest = interest;
    this.years = years;
    this.currentMonth = 0;
  }

  getAmount() {
    return this.amount[this.currentMonth];
  }

  getAmountSeries() {
    return this.amount;
  }

  getMonths() {
    return this.years * 12;
  }

  getCurrentMonth() {
    return this.currentMonth;
  }

  getRateFactor(rate) {
    return rate + 1;
  }

  increase() {
    let lastAmount = this.amount[this.currentMonth];
    let lastMonthlyInvestment = this.monthlyInvestment[this.currentMonth];
    let actualMonthlyInvetment = lastMonthlyInvestment * this.getRateFactor(this.increaseRate);
    let actualAmount = lastAmount * this.getRateFactor(this.interest) + actualMonthlyInvetment;

    this.monthlyInvestment.push(actualMonthlyInvetment);
    this.amount.push(parseFloat(actualAmount.toFixed(2)));
    this.currentMonth++;
  }
};
