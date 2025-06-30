// Пример акций — можешь импортировать или расширить
const allStocks = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 180.95,
    change: 3.25,
    percentChange: 1.83,
    marketCap: 2850000000000,
    sector: "Technology",
    description:
      "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 337.22,
    change: 2.25,
    percentChange: 0.67,
    marketCap: 2510000000000,
    sector: "Technology",
    description:
      "Microsoft develops, licenses, and supports software, services, devices, and solutions worldwide.",
  },
  // добавь остальные по аналогии
];

function formatMarketCap(cap) {
  return cap / 1e12 >= 1
    ? (cap / 1e12).toFixed(2) + "T"
    : (cap / 1e9).toFixed(2) + "B";
}

function renderStockPage(symbol) {
  const stock = allStocks.find((s) => s.symbol === symbol);
  const container = document.getElementById("stock-info");

  if (!stock) {
    container.innerHTML = `<h2>Stock not found</h2>`;
    return;
  }

  container.innerHTML = `
    <h1>${stock.name} (${stock.symbol})</h1>
    <p><strong>Sector:</strong> ${stock.sector}</p>
    <p><strong>Price:</strong> $${stock.price.toFixed(2)}</p>
    <p><strong>Change:</strong> ${
      stock.change >= 0 ? "+" : ""
    }${stock.change.toFixed(2)} (${
    stock.percentChange >= 0 ? "+" : ""
  }${stock.percentChange.toFixed(2)}%)</p>
    <p><strong>Market Cap:</strong> $${formatMarketCap(stock.marketCap)}</p>
    <p><strong>About:</strong> ${
      stock.description || "No description available."
    }</p>
  `;
}

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const symbol = params.get("symbol");
  if (symbol) {
    renderStockPage(symbol.toUpperCase());
  } else {
    document.getElementById(
      "stock-info"
    ).innerHTML = `<h2>No stock selected</h2>`;
  }
});
