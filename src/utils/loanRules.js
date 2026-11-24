// Biashara Loans Salary Brackets & Eligibility Configuration
// Can be customized dynamically by the Super Admin in the Super Admin Portal

export const DEFAULT_LOAN_RULES = {
  interestRateMonthly: 5, // 5% flat per month
  minAge: 18,
  maxTenureMonths: 6,
  salaryBrackets: [
    {
      id: 'tier-1',
      labelEn: 'Below TZS 500,000',
      labelSw: 'Chini ya TZS 500,000',
      range: '0:500000',
      minLoan: 50000,
      maxLoan: 300000,
      descriptionEn: 'Starter tier for micro businesses & street vendors',
      descriptionSw: 'Kikomo cha kuanzia kwa biashara changa na wamachinga'
    },
    {
      id: 'tier-2',
      labelEn: 'TZS 500,001 - 1,000,000',
      labelSw: 'TZS 500,001 - 1,000,000',
      range: '500001:1000000',
      minLoan: 100000,
      maxLoan: 800000,
      descriptionEn: 'Growth tier for steady daily retail cashflow',
      descriptionSw: 'Kikomo cha biashara yenye mauzo imara ya kila siku'
    },
    {
      id: 'tier-3',
      labelEn: 'TZS 1,000,001 - 2,500,000',
      labelSw: 'TZS 1,000,001 - 2,500,000',
      range: '1000001:2500000',
      minLoan: 200000,
      maxLoan: 2000000,
      descriptionEn: 'Medium tier for established retail, salons & transport',
      descriptionSw: 'Kikomo cha maduka ya kati, saluni na usafiri'
    },
    {
      id: 'tier-4',
      labelEn: 'TZS 2,500,001 - 5,000,000',
      labelSw: 'TZS 2,500,001 - 5,000,000',
      range: '2500001:5000000',
      minLoan: 500000,
      maxLoan: 3500000,
      descriptionEn: 'High capacity tier for expanding farming & suppliers',
      descriptionSw: 'Kikomo cha wakulima na wasambazaji wanaopanuka'
    },
    {
      id: 'tier-5',
      labelEn: 'Above TZS 5,000,000',
      labelSw: 'Zaidi ya TZS 5,000,000',
      range: '5000001:15000000',
      minLoan: 1000000,
      maxLoan: 5000000,
      descriptionEn: 'Prime tier for wholesale distributors & large merchants',
      descriptionSw: 'Kiwango cha juu kwa biashara za jumla na maduka makubwa'
    }
  ]
};

export function getStoredLoanRules() {
  try {
    const raw = localStorage.getItem('biashara_loan_rules');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.salaryBrackets)) {
        return parsed;
      }
    }
  } catch (err) {
    // Fallback to default
  }
  return DEFAULT_LOAN_RULES;
}

export function saveStoredLoanRules(rules) {
  try {
    localStorage.setItem('biashara_loan_rules', JSON.stringify(rules));
  } catch (err) {
    // LocalStorage write failed
  }
}
