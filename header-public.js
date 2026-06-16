// SEARCH DATA ============================================================
const playerDatabase = [
  { playerId: 10001, name: "Shohei Ohtani", meta: "LAD • DH/SP • Trending ↑" },
  {
    playerId: "aaron-judge",
    name: "Aaron Judge",
    meta: "NYY • OF • Power Leader",
  },
  { playerId: 10003, name: "Bobby Witt Jr.", meta: "KC • SS • Top Dynasty" },
  { playerId: 10004, name: "Julio Rodriguez", meta: "SEA • OF • Buy Low" },
  {
    playerId: 10005,
    name: "Ronald Acuna Jr.",
    meta: "ATL • OF • Injury Recovery",
  },
  {
    playerId: 10006,
    name: "Jackson Holliday",
    meta: "BAL • INF • Top Prospect",
  },
  { playerId: 10007, name: "Wyatt Langford", meta: "TEX • OF • Trending ↑" },
  { playerId: 10008, name: "Paul Skenes", meta: "PIT • SP • Ace Potential" },
];
// SEARCH INPUT ===========================================================
const playerSearch = document.getElementById("player-search");
// SEARCH RESULTS =========================================================
const searchResults = document.getElementById("search-results");
playerSearch.addEventListener("input", () => {
  console.log("SEARCHING:", playerSearch.value);
  const query = playerSearch.value.toLowerCase().trim();
  if (!query) {
    searchResults.innerHTML = "";
    searchResults.classList.add("hidden");
    return;
  }
  const matches = playerDatabase.filter((player) =>
    player.name.toLowerCase().includes(query),
  );
  searchResults.innerHTML = "";
  matches.forEach((player) => {
    const result = document.createElement("button");
    result.classList.add("search-player-item");
    result.innerHTML = `<div>${player.name}</div>
<div class="search-player-meta">${player.meta}</div>`;
    searchResults.appendChild(result);
    result.addEventListener("click", () => {
      window.location.href = `player-public.html?id=${player.playerId}`;
    });
  });
  searchResults.classList.remove("hidden");
});
// CLOSE SEARCH RESULTS ===================================================
window.addEventListener("click", (event) => {
  if (!event.target.closest(".search-container")) {
    searchResults.classList.add("hidden");
  }
});
playerSearch.addEventListener("click", (event) => {
  event.stopPropagation();
});
// SEARCH ICON BUTTON =====================================================
const mobileSearchBtn = document.getElementById("mobile-search-btn");
if (mobileSearchBtn) {
  mobileSearchBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    searchOverlay.classList.remove("hidden");
    expandedSearch.value = "";
    setTimeout(() => {
      expandedSearch.focus();
    }, 10);
    renderExpandedResults("");
  });
}
// SEARCH OVERLAY =========================================================
const searchOverlay = document.getElementById("search-overlay");
const expandedSearch = document.getElementById("expanded-search");
const expandedSearchResults = document.getElementById(
  "expanded-search-results",
);
// OPEN SEARCH OVERLAY ====================================================
playerSearch.addEventListener("click", (event) => {
  event.stopPropagation();
  if (window.innerWidth < 1617) {
    searchOverlay.classList.remove("hidden");
    expandedSearch.value = playerSearch.value;
    setTimeout(() => {
      expandedSearch.focus();
    }, 10);
    renderExpandedResults(expandedSearch.value);
  }
});
// RENDER RESULTS =========================================================
function renderExpandedResults(query) {
  expandedSearchResults.innerHTML = "";
  const matches = playerDatabase.filter((player) =>
    player.name.toLowerCase().includes(query.toLowerCase()),
  );
  matches.forEach((player) => {
    const result = document.createElement("button");
    result.classList.add("search-player-item");
    result.innerHTML = `
            <div>
                ${player.name}
            </div>
            <div class="search-player-meta">
                ${player.meta}
            </div>`;
    expandedSearchResults.appendChild(result);
    result.addEventListener("click", () => {
      window.location.href = `player-public.html?id=${player.playerId}`;
    });
  });
}
// LIVE SEARCH ============================================================
expandedSearch.addEventListener("input", () => {
  renderExpandedResults(expandedSearch.value);
});
// RESPONSIVE SEARCH BAR TEXT =============================================
function updateSearchPlaceholder() {
  const search = document.getElementById("player-search");
  if (window.innerWidth < 910) {
    search.placeholder = "Search";
  } else {
    search.placeholder = "Search any active player";
  }
}
window.addEventListener("resize", updateSearchPlaceholder);
updateSearchPlaceholder();
// CLOSE SEARCH OVERLAY ===================================================
document.addEventListener("click", (event) => {
  if (!searchOverlay) {
    return;
  }
  const searchBox = document.querySelector(".search-overlay-box");
  if (!searchBox) {
    return;
  }
  if (searchOverlay.classList.contains("hidden")) {
    return;
  }
  if (searchBox.contains(event.target)) {
    return;
  }
  searchOverlay.classList.add("hidden");
});
// HEADER SHRINK ==========================================================
const publicHeader = document.querySelector(".public-header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    publicHeader.style.height = "60px";
  } else {
    publicHeader.style.height = "68px";
  }
});
const publicHomepageBtn = document.getElementById("homepage-btn");
if (publicHomepageBtn) {
  publicHomepageBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}
// CONNECT NAV BUTTONS ====================================================
document.getElementById("homepage-btn")?.addEventListener("click", () => {
  window.location.href = "index.html";
});
document.getElementById("nav-rankings")?.addEventListener("click", () => {
  window.location.href = "rankings.html";
});
document.getElementById("nav-trending")?.addEventListener("click", () => {
  window.location.href = "trending.html";
});
document.getElementById("nav-trade")?.addEventListener("click", () => {
  window.location.href = "trade.html";
});
// MORE DROPDOWN MENU =====================================================
const moreDropdown = document.getElementById("more-dropdown");
const moreBtn = document.getElementById("more-btn");
const moreMenu = document.getElementById("more-dropdown-menu");
moreBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  moreDropdown.classList.toggle("more-open");
});
document.addEventListener("click", () => {
  moreDropdown.classList.remove("more-open");
});
document.getElementById("nav-injuries")?.addEventListener("click", () => {
  window.location.href = "injuries.html";
});
document.getElementById("nav-waiver")?.addEventListener("click", () => {
  window.location.href = "waiver.html";
});
document.getElementById("nav-buylow")?.addEventListener("click", () => {
  window.location.href = "buylow.html";
});
document.getElementById("nav-boombust")?.addEventListener("click", () => {
  window.location.href = "boombust.html";
});
document.getElementById("nav-teamstats")?.addEventListener("click", () => {
  window.location.href = "teamstats.html";
});
// MORE MENU DUPLICATE BUTTONS ============================================
document.getElementById("more-rankings")?.addEventListener("click", () => {
  window.location.href = "rankings.html";
});
document.getElementById("more-trending")?.addEventListener("click", () => {
  window.location.href = "trending.html";
});
document.getElementById("more-trade")?.addEventListener("click", () => {
  window.location.href = "trade.html";
});
// LOGIN BUTTON ===========================================================
document.getElementById("public-login-btn")?.addEventListener("click", () => {
  window.location.href = "login.html";
});
// SIGNUP BUTTON ==========================================================
document.getElementById("public-signup-btn")?.addEventListener("click", () => {
  window.location.href = "signup.html";
});
const isHomepage = document.getElementById("public-homepage") !== null;

if (!isHomepage) {
  document.getElementById("custom-dropdown")?.classList.add("hidden");
  document.getElementById("homepage-btn")?.classList.remove("hidden");
}