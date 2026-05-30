export function formatCurrency(
  amount: number
) {
  return new Intl.NumberFormat(
    "en-UG",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  ).format(amount);
}