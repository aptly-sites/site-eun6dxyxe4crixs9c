import { test } from 'node:test';
import assert from 'node:assert/strict';
import { affordability, withinBudget, rentVsSell, type Assumptions } from '../src/features/calculators/math';
const base:Assumptions={homeValue:100000,mortgageBalance:0,interestRate:0,monthlyPayment:1000,taxesInsurance:0,monthlyRent:1000,appreciationRate:0,yearsToHold:1,vacancyRate:0,maintenanceRate:0,pmFeeRate:0,investmentReturn:0,sellingCosts:10,rentGrowth:0,costInflation:0};
test('affordability handles blank, zero, negative, large and currency units',()=>{
 assert.equal(affordability('5000'),2000);assert.equal(affordability('0'),0);
 for(const value of ['', '-1','Infinity','10000001','oops']) assert.equal(affordability(value),null);
});
test('debt-free rental pays no mortgage and both outcomes include selling costs',()=>{
 const row=rentVsSell(base)[0]; assert.equal(row.mortgageExpense,0);assert.equal(row.wealthSellNow,90000);assert.equal(row.wealthRentOut,102000);assert.equal(row.difference,12000);
});
test('payoff caps final payment and zero-rate mortgage is supported',()=>{
 const row=rentVsSell({...base,mortgageBalance:1500})[0];assert.equal(row.mortgageExpense,-1500);assert.equal(row.houseEquity,100000);
});
test('percentages, monthly costs and horizon growth are applied once',()=>{
 const rows=rentVsSell({...base,yearsToHold:2,vacancyRate:10,pmFeeRate:10,taxesInsurance:100,rentGrowth:10,costInflation:10});
 assert.equal(rows.length,2);assert.equal(rows[0].rentalIncome,10800);assert.equal(rows[0].netCashFlow,8520);assert.ok(Math.abs(rows[1].rentalIncome-11880)<.001);
});
test('underpayment grows balance; horizon stays bounded',()=>{
 const row=rentVsSell({...base,mortgageBalance:10000,interestRate:12,monthlyPayment:0})[0];assert.ok(row.houseEquity<90000);assert.equal(rentVsSell({...base,yearsToHold:1000000}).length,30);
});

test("Aptly cents are compared with dollar budgets",()=>{assert.equal(withinBudget(200000,2000),true);assert.equal(withinBudget(200001,2000),false);assert.equal(withinBudget(undefined,2000),false);assert.equal(withinBudget(0,2000),false);});
