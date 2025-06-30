document.addEventListener("DOMContentLoaded", () => {
  const selectedCurrency = localStorage.getItem("preferredCurrency") || "USD";

  const currencySelect = document.getElementById("stat-value");
  if (currencySelect) {
    currencySelect.value = selectedCurrency;
    currencySelect.dispatchEvent(new Event("change"));
  }
});
