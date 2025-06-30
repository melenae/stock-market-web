document.addEventListener("DOMContentLoaded", function () {
  const sectorFilter = document.getElementById("sector-filter");
  const sortFilter = document.getElementById("sort-filter");

  function applyFilters() {
    const sectorValue = sectorFilter.value;
    const sortValue = sortFilter.value;

    let filtered = [...window.allStocks];

    // Фильтрация по сектору
    if (sectorValue !== "all") {
      filtered = filtered.filter((stock) => stock.sector === sectorValue);
    }

    // Сортировка
    filtered.sort((a, b) => {
      if (sortValue === "price") {
        return b.price - a.price;
      } else if (sortValue === "market-cap") {
        return b.marketCap - a.marketCap;
      } else if (sortValue === "change") {
        return b.percentChange - a.percentChange;
      }
      return 0;
    });

    // Передаём в пагинацию
    if (typeof window.setFilteredStocks === "function") {
      window.setFilteredStocks(filtered);
    }
  }

  sectorFilter.addEventListener("change", applyFilters);
  sortFilter.addEventListener("change", applyFilters);

  // При старте тоже применим (можно убрать, если уже вызывается в pagination.js)
  applyFilters();
});
