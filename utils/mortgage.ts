/**
 * Mortgage calculation utilities for VA loan assumptions
 */

/**
 * Calculate monthly mortgage payment using the standard amortization formula
 * @param principal - Loan amount
 * @param annualRate - Annual interest rate as a percentage (e.g., 5.5 for 5.5%)
 * @param years - Loan term in years (default: 30)
 * @returns Monthly payment amount
 */
export function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  years: number = 30
): number {
  if (principal <= 0 || annualRate < 0) {
    return 0
  }

  const monthlyRate = annualRate / 100 / 12
  const numPayments = years * 12

  // Handle 0% interest rate edge case
  if (monthlyRate === 0) {
    return principal / numPayments
  }

  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1)
  )
}

/**
 * Calculate monthly savings between market rate and VA assumable rate
 * @param loanBalance - Current loan balance
 * @param assumableRate - VA loan interest rate
 * @param marketRate - Current market interest rate (optional, uses current market rate)
 * @returns Monthly savings amount
 */
export function calculateMonthlySavings(
  loanBalance: number,
  assumableRate: number,
  marketRate?: number
): number {
  const currentMarketRate = marketRate ?? getCurrentMarketRate()
  const marketPayment = calculateMonthlyPayment(loanBalance, currentMarketRate)
  const assumablePayment = calculateMonthlyPayment(loanBalance, assumableRate)
  return marketPayment - assumablePayment
}

/**
 * Get the current market interest rate
 * TODO: This should be fetched from an API or admin-configurable setting
 * @returns Current market rate as a percentage
 */
export function getCurrentMarketRate(): number {
  // Hardcoded for now - in production this would come from a rate API or admin setting
  return 7.0
}

/**
 * Calculate total interest paid over the life of the loan
 * @param principal - Loan amount
 * @param annualRate - Annual interest rate as a percentage
 * @param years - Loan term in years (default: 30)
 * @returns Total interest paid
 */
export function calculateTotalInterest(
  principal: number,
  annualRate: number,
  years: number = 30
): number {
  const monthlyPayment = calculateMonthlyPayment(principal, annualRate, years)
  const totalPaid = monthlyPayment * years * 12
  return totalPaid - principal
}

/**
 * Calculate equity needed for VA loan assumption
 * @param salePrice - Total sale price
 * @param loanBalance - Current loan balance
 * @returns Equity/down payment required
 */
export function calculateEquityNeeded(
  salePrice: number,
  loanBalance: number
): number {
  return Math.max(0, salePrice - loanBalance)
}

/**
 * Format currency for display
 * @param amount - Dollar amount
 * @returns Formatted string (e.g., "$1,234")
 */
export function formatCurrency(amount: number): string {
  return `$${Math.round(amount).toLocaleString()}`
}

/**
 * Format monthly payment for display
 * @param amount - Dollar amount
 * @returns Formatted string (e.g., "$1,234/mo")
 */
export function formatMonthlyPayment(amount: number): string {
  return `${formatCurrency(amount)}/mo`
}
