export class Investment {
  constructor(amount, monthlyInvestment = 0, increaseRate = 0, interest, years) {
    this.amount = [amount];
    this.monthlyInvestment = [monthlyInvestment];
    this.increaseRate = increaseRate;
    this.interest = interest;
    this.years = years;
    this.currentMonth = 0;
  }

  getAmount() {
    return this.amount[this.currentMonth];
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
    let actualAmount = lastAmount * this.getRateFactor(this.interest);

    this.monthlyInvestment.push(actualMonthlyInvetment);
    this.amount.push(actualAmount + actualMonthlyInvetment);
    this.currentMonth++;
  }
};
