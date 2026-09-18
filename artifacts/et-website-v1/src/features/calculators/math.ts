export function affordability(income: string): number | null {
  const value = Number(income);
  return income.trim() && Number.isFinite(value) && value >= 0 && value <= 10000000 ? value / 2.5 : null;
}
export type Assumptions = { homeValue:number; mortgageBalance:number; interestRate:number; monthlyPayment:number; taxesInsurance:number; monthlyRent:number; appreciationRate:number; yearsToHold:number; vacancyRate:number; maintenanceRate:number; pmFeeRate:number; investmentReturn:number; sellingCosts:number; rentGrowth:number; costInflation:number };
export function rentVsSell(a: Assumptions) {
  let balance = a.mortgageBalance, cumulative = 0;
  const saleNow = a.homeValue * (1-a.sellingCosts/100)-balance;
  return Array.from({length: Math.min(30,Math.max(1,Math.floor(a.yearsToHold)))},(_,i)=>{
    const year=i+1;
    const houseValue=a.homeValue*(1+a.appreciationRate/100)**year;
    const rentalIncome=a.monthlyRent*12*(1-a.vacancyRate/100)*(1+a.rentGrowth/100)**i;
    let mortgage=0;
    for(let m=0;m<12;m++) {
      if(balance<=0) break;
      const interest=balance*a.interestRate/1200;
      const payment=Math.min(a.monthlyPayment,balance+interest);
      mortgage+=payment;
      balance=Math.max(0,balance+interest-payment);
    }
    const other=a.taxesInsurance*12*(1+a.costInflation/100)**i+houseValue*a.maintenanceRate/100+rentalIncome*a.pmFeeRate/100;
    const netCashFlow=rentalIncome-mortgage-other;
    cumulative+=netCashFlow;
    const houseEquity=houseValue-balance;
    const wealthRentOut=houseEquity-houseValue*a.sellingCosts/100+cumulative;
    const wealthSellNow=saleNow*(1+a.investmentReturn/100)**year;
    return {year,rentalIncome,mortgageExpense: mortgage ? -mortgage : 0,otherCosts: other ? -other : 0,netCashFlow,houseValue,houseEquity,wealthRentOut,wealthSellNow,difference:wealthRentOut-wealthSellNow};
  });
}

export function withinBudget(rentCents: number | null | undefined, budgetDollars: number) { return typeof rentCents === "number" && Number.isFinite(rentCents) && rentCents > 0 && rentCents <= Math.floor(budgetDollars * 100); }
