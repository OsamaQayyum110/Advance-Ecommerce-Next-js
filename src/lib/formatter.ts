const Currency_FORMATTER = new Intl.NumberFormat("en-PK", {
  style: "currency",
    currency: "PKR",
  minimumFractionDigits: 0,
});

export function currencyFormatter(number: number) {
    return Currency_FORMATTER.format(number)
}

const Number_FORMATTER = new Intl.NumberFormat("en-PK");

export function numberFormatter(number: number) {
  return Number_FORMATTER.format(number);
}