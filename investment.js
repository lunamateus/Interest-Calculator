export class Investment {
  constructor(amount, monthlyInvestment = 0, increaseRate = 0, interest, years) {
    this.amount = amount;
    this.monthlyInvestment = monthlyInvestment;
    this.increaseRate = increaseRate;
    this.interest = interest;
    this.years = years;
  }

  getAmount() {
    return this.amount;
  }

  getMonths() {
    return this.years * 12;
  }

  getRateFactor(rate) {
    return rate + 1;
  }

  increase() {
    this.monthlyInvestment *= this.getRateFactor(this.increaseRate);
    this.amount *= this.getRateFactor(this.interest);
    this.amount += this.monthlyInvestment;
  }
};
