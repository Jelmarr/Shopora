export const formatPrice = (
  amount: number,
  currency: string = "PHP",
  locale: string = "en-US",
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    // maximumFractionDigits: 0, // Optional: uncomment if you don't want decimals like .00
  }).format(amount);
};
