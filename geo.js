document.addEventListener("DOMContentLoaded", () => {
  if (!navigator.geolocation) {
    console.warn("Geolocation is not supported by your browser");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // Подставь свой API-ключ ниже 👇
      const apiKey = "cb061b5f266042f28e61dbc3f411901a";
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        const country = data.results[0].components.country_code.toUpperCase();

        console.log("User's country:", country);

        // Пример: установка валюты по стране
        const currencyByCountry = {
          US: "USD",
          RU: "RUB",
          JP: "JPY",
          GB: "GBP",
          DE: "EUR",
          IN: "INR",
        };

        const selectedCurrency = currencyByCountry[country] || "USD";

        // Установить валюту по умолчанию (если есть селектор)
        const currencySelect = document.getElementById("stat-value");
        if (currencySelect) {
          currencySelect.value = selectedCurrency;
          currencySelect.dispatchEvent(new Event("change")); // применить изменение
        }
      } catch (error) {
        console.error("Error when receiving geolocation:", error);
      }
    },
    (error) => {
      console.warn(
        "The user has abandoned geolocation or an error has occurred",
        error.message
      );
    }
  );
});
