document.addEventListener("DOMContentLoaded", function () {
  const rowsPerPage = 5;
  let currentPage = 1;
  let filteredStocks = [];

  const tbody = document.getElementById("stock-tbody");
  const pagination = document.getElementById("pagination");

  // Рендер строк акций
  function renderTablePage() {
    tbody.innerHTML = "";

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageStocks = filteredStocks.slice(start, end);

    for (const stock of pageStocks) {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${stock.symbol}</td>
        <td>
          <div class="stock-name">${stock.name}</div>
          <div class="stock-symbol">${stock.sector}</div>
        </td>
        <td class="stock-price" data-usd="${
          stock.price
        }">$${stock.price.toFixed(2)}</td>
        <td class="stock-change ${
          stock.change >= 0 ? "change-positive" : "change-negative"
        }">${stock.change >= 0 ? "+" : ""}${stock.change.toFixed(2)}</td>
        <td class="stock-change ${
          stock.percentChange >= 0 ? "change-positive" : "change-negative"
        }">${stock.percentChange >= 0 ? "+" : ""}${stock.percentChange.toFixed(
        2
      )}%</td>
        <td class="stock-price" data-usd="${stock.marketCap}">$${
        stock.marketCap / 1e12 >= 1
          ? (stock.marketCap / 1e12).toFixed(2) + "T"
          : (stock.marketCap / 1e9).toFixed(2) + "B"
      }</td>
        <td><div class="stock-chart"></div></td>
        <td>
          <div class="stock-actions">
            <button class="stock-btn" onClick="goToStock('${
              stock.symbol
            }')">Watch</button>
            <button class="stock-btn stock-btn-primary">Buy</button>
          </div>
        </td>
      `;
      tbody.appendChild(row);
    }

    renderPagination();
  }

  // Рендер кнопок пагинации
  function renderPagination() {
    const totalPages = Math.ceil(filteredStocks.length / rowsPerPage);
    pagination.innerHTML = "";

    const createBtn = (label, page, isActive = false) => {
      const btn = document.createElement("button");
      btn.textContent = label;
      btn.className = "pagination-btn";
      if (isActive) btn.classList.add("active");
      btn.dataset.page = page;
      return btn;
    };

    if (currentPage > 1) {
      pagination.appendChild(createBtn("←", "prev"));
    }

    for (let i = 1; i <= totalPages; i++) {
      pagination.appendChild(createBtn(i, i, i === currentPage));
    }

    if (currentPage < totalPages) {
      pagination.appendChild(createBtn("→", "next"));
    }
  }

  // Обработчик кликов по пагинации
  pagination.addEventListener("click", function (e) {
    const target = e.target;
    if (!target.classList.contains("pagination-btn")) return;

    const page = target.dataset.page;
    const totalPages = Math.ceil(filteredStocks.length / rowsPerPage);

    if (page === "prev" && currentPage > 1) {
      currentPage--;
    } else if (page === "next" && currentPage < totalPages) {
      currentPage++;
    } else if (!isNaN(page)) {
      currentPage = parseInt(page);
    }

    renderTablePage();
  });
  document.addEventListener("DOMContentLoaded", function () {
    document.body.addEventListener("click", function (e) {
      if (e.target.classList.contains("stock-btn")) {
        const symbol = e.target.dataset.symbol;
        if (symbol) {
          window.location.href = `stock.html?symbol=${symbol}`;
        }
      }
    });
  });

  // Глобальный метод для фильтра
  window.setFilteredStocks = function (stocks) {
    filteredStocks = stocks;
    currentPage = 1;
    renderTablePage();
  };

  // Инициализация с полным списком
  window.allStocks = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 180.95,
      change: 3.25,
      percentChange: 1.83,
      marketCap: 2850000000000,
      sector: "Technology",
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corporation",
      price: 337.22,
      change: 2.25,
      percentChange: 0.67,
      marketCap: 2510000000000,
      sector: "Technology",
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      price: 131.86,
      change: 0.68,
      percentChange: 0.52,
      marketCap: 1670000000000,
      sector: "Technology",
    },
    {
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      price: 127.74,
      change: -0.64,
      percentChange: -0.5,
      marketCap: 1310000000000,
      sector: "Consumer Cyclical",
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc.",
      price: 237.49,
      change: 1.98,
      percentChange: 0.84,
      marketCap: 753400000000,
      sector: "Automotive",
    },
    {
      symbol: "NVDA",
      name: "NVIDIA Corporation",
      price: 1220.15,
      change: 10.75,
      percentChange: 0.89,
      marketCap: 3000000000000,
      sector: "Technology",
    },
    {
      symbol: "META",
      name: "Meta Platforms Inc.",
      price: 465.33,
      change: -2.55,
      percentChange: -0.55,
      marketCap: 1190000000000,
      sector: "Technology",
    },
    {
      symbol: "BRK.B",
      name: "Berkshire Hathaway Inc.",
      price: 416.5,
      change: 1.12,
      percentChange: 0.27,
      marketCap: 880000000000,
      sector: "Financial Services",
    },
    {
      symbol: "UNH",
      name: "UnitedHealth Group Inc.",
      price: 510.6,
      change: -4.15,
      percentChange: -0.81,
      marketCap: 470000000000,
      sector: "Healthcare",
    },
    {
      symbol: "JNJ",
      name: "Johnson & Johnson",
      price: 148.33,
      change: 0.65,
      percentChange: 0.44,
      marketCap: 430000000000,
      sector: "Healthcare",
    },
    {
      symbol: "V",
      name: "Visa Inc.",
      price: 270.4,
      change: 1.22,
      percentChange: 0.45,
      marketCap: 620000000000,
      sector: "Financial Services",
    },
    {
      symbol: "WMT",
      name: "Walmart Inc.",
      price: 65.27,
      change: 0.95,
      percentChange: 1.48,
      marketCap: 430000000000,
      sector: "Consumer Defensive",
    },
    {
      symbol: "JPM",
      name: "JPMorgan Chase & Co.",
      price: 198.15,
      change: 1.7,
      percentChange: 0.87,
      marketCap: 580000000000,
      sector: "Financial Services",
    },
    {
      symbol: "XOM",
      name: "Exxon Mobil Corporation",
      price: 113.3,
      change: -0.33,
      percentChange: -0.29,
      marketCap: 470000000000,
      sector: "Energy",
    },
    {
      symbol: "PG",
      name: "Procter & Gamble Co.",
      price: 168.49,
      change: 0.44,
      percentChange: 0.26,
      marketCap: 400000000000,
      sector: "Consumer Defensive",
    },
    {
      symbol: "MA",
      name: "Mastercard Inc.",
      price: 452.77,
      change: 3.51,
      percentChange: 0.78,
      marketCap: 430000000000,
      sector: "Financial Services",
    },
    {
      symbol: "HD",
      name: "The Home Depot Inc.",
      price: 344.19,
      change: -1.1,
      percentChange: -0.32,
      marketCap: 340000000000,
      sector: "Consumer Cyclical",
    },
    {
      symbol: "LLY",
      name: "Eli Lilly and Company",
      price: 880.25,
      change: 15.3,
      percentChange: 1.77,
      marketCap: 820000000000,
      sector: "Healthcare",
    },
    {
      symbol: "KO",
      name: "Coca-Cola Company",
      price: 62.48,
      change: 0.18,
      percentChange: 0.29,
      marketCap: 270000000000,
      sector: "Consumer Defensive",
    },
    {
      symbol: "PEP",
      name: "PepsiCo Inc.",
      price: 174.3,
      change: -0.45,
      percentChange: -0.26,
      marketCap: 240000000000,
      sector: "Consumer Defensive",
    },
    {
      symbol: "NFLX",
      name: "Netflix Inc.",
      price: 680.55,
      change: 5.77,
      percentChange: 0.86,
      marketCap: 300000000000,
      sector: "Communication Services",
    },
    {
      symbol: "DIS",
      name: "The Walt Disney Company",
      price: 101.33,
      change: -1.2,
      percentChange: -1.17,
      marketCap: 185000000000,
      sector: "Communication Services",
    },
    {
      symbol: "PFE",
      name: "Pfizer Inc.",
      price: 28.4,
      change: -0.1,
      percentChange: -0.35,
      marketCap: 160000000000,
      sector: "Healthcare",
    },
    {
      symbol: "BA",
      name: "Boeing Company",
      price: 185.55,
      change: 0.85,
      percentChange: 0.46,
      marketCap: 110000000000,
      sector: "Industrials",
    },
    {
      symbol: "CSCO",
      name: "Cisco Systems Inc.",
      price: 48.77,
      change: -0.22,
      percentChange: -0.45,
      marketCap: 198000000000,
      sector: "Technology",
    },
  ];

  document.addEventListener("DOMContentLoaded", function () {
    document.body.addEventListener("click", function (e) {
      if (e.target.classList.contains("watch-btn")) {
        const symbol = e.target.dataset.symbol;
        if (symbol) {
          window.location.href = `stock.html?symbol=${symbol}`;
        }
      }
    });
  });
  // Запуск
  window.setFilteredStocks(window.allStocks);
});
