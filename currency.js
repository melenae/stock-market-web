const exchangeRates = {
  USD: 1,
  EUR: 0.93,
  RUB: 90.12,
  JPY: 158.2,
};

let currentCurrency = "USD";

document.addEventListener("DOMContentLoaded", () => {
  const currencySelect = document.getElementById("currency-select");

  if (currencySelect) {
    currencySelect.addEventListener("change", () => {
      const selectedCurrency = currencySelect.value;
      convertCurrency(selectedCurrency);
      currentCurrency = selectedCurrency;
    });
  }
});

function convertCurrency(currency) {
  document
    .querySelectorAll(".stat-value, .stock-price, .market-value")
    .forEach((el) => {
      const usdValue = parseFloat(el.dataset.usd);
      const converted = usdValue * exchangeRates[currency];
      el.textContent = formatCurrency(converted, currency);
    });
}

function formatCurrency(value, currency) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(value);
}
