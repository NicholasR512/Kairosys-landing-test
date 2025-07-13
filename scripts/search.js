document.addEventListener("DOMContentLoaded", () => {
  // DOM helpers
  const searchBar      = document.getElementById("search-bar");
  const categorySelect = document.getElementById("category-select");
  const resultsBox     = document.getElementById("search-results");
  const noResultsMsg   = document.getElementById("no-results");

  let glossary = [];                      // gets filled after fetch

  // 1. Load JSON once at page start
  fetch("data/terms.json")
    .then(r => r.json())
    .then(data => {
      glossary = data;
      filterAndRender();                 // show everything on first load
    })
    .catch(err => console.error("Glossary load error:", err));

  // 2. Re-run filtering whenever the user types or changes category
  searchBar.addEventListener("input",  filterAndRender);
  categorySelect.addEventListener("change", filterAndRender);

  function filterAndRender() {
    const q        = searchBar.value.trim().toLowerCase();
    const category = categorySelect.value;        // "all", "reddit", etc.

    const filtered = glossary.filter(item => {
      const matchesText  = item.term.toLowerCase().includes(q);
      const matchesCat   = category === "all" || item.category === category;
      return matchesText && matchesCat;
    });

    renderCards(filtered);
  }

  // 3. Replace innerHTML of the results box with fresh cards
  function renderCards(list) {
    resultsBox.innerHTML = "";           // clear old results

    if (list.length === 0) {
      noResultsMsg.style.display = "block";
      return;
    }
    noResultsMsg.style.display = "none";

    list.forEach(item => {
      const card = document.createElement("div");
      card.className = "word-card";
      card.innerHTML = `
        <h2 class="word">${item.term}</h2>
        <div class="definition">
          <p><strong>Definition:</strong> ${item.definition}</p>
        </div>
        <div class="relation">
          <p><strong>Relation:</strong> ${item.relation}</p>
        </div>
        ${item.link ? `<a class="read-more" href="${item.link}" target="_blank" rel="noopener">Read&nbsp;More&nbsp;></a>` : ""}
      `;
      resultsBox.appendChild(card);
    });
  }
});
