// =========================
// PLAYER SEARCH
// =========================
// SEARCH DATA ========================================
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
// SEARCH ICON BUTTON =================================
const mobileSearchBtn = document.getElementById("mobile-search-btn");
const searchOverlay = document.getElementById("search-overlay");
const expandedSearch = document.getElementById("expanded-search");
const expandedSearchResults = document.getElementById(
  "expanded-search-results",
);
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
// RENDER RESULTS =====================================
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
      window.location.href = `player-dashboard.html?id=${player.playerId}`;
    });
  });
}
// LIVE SEARCH ========================================
expandedSearch.addEventListener("input", () => {
  renderExpandedResults(expandedSearch.value);
});
// CLOSE SEARCH OVERLAY ===============================
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
// =========================
// UI EFFECTS
// =========================
// HEADER SHRINK
const dashboardHeader = document.querySelector(".public-header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    dashboardHeader.style.height = "60px";
  } else {
    dashboardHeader.style.height = "68px";
  }
});
// CONNECT NAV BUTTONS ================================
const leagueDropdown = document.getElementById("league-dropdown");
const leagueSelected = document.getElementById("league-selected");
if (leagueSelected) {
  leagueSelected.addEventListener("click", (event) => {
    event.stopPropagation();
    leagueDropdown.classList.toggle("dropdown-open");
  });
}
document.addEventListener("click", () => {
  leagueDropdown?.classList.remove("dropdown-open");
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
// MORE DROPDOWN MENU =================================
const moreDropdown = document.getElementById("more-dropdown");
const moreBtn = document.getElementById("more-btn");
const moreMenu = document.getElementById("more-dropdown-menu");
if (moreBtn) {
  moreBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    moreDropdown.classList.toggle("more-open");
  });
}
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
// MORE MENU DUPLICATE BUTTONS =======================
document.getElementById("more-rankings")?.addEventListener("click", () => {
  window.location.href = "rankings.html";
});
document.getElementById("more-trending")?.addEventListener("click", () => {
  window.location.href = "trending.html";
});
document.getElementById("more-trade")?.addEventListener("click", () => {
  window.location.href = "trade.html";
});
// PROFILE BUTTON =====================================
document.getElementById("profile-btn")?.addEventListener("click", () => {
  console.log("Profile menu coming soon");
});
document.getElementById(
    "logout-btn"
)?.addEventListener(
    "click",
    async () => {

        await auth.signOut();

        window.location.href =
        "index.html";

    }
);
const isDashboard =
window.location.pathname.endsWith(
    "dashboard.html"
);

const dashboardHomeBtn =
document.getElementById(
    "dashboard-home-btn"
);

if(
    !isDashboard
){
    leagueDropdown?.classList.add(
        "hidden"
    );

    dashboardHomeBtn?.classList.remove(
        "hidden"
    );
}
dashboardHomeBtn?.addEventListener(
    "click",
    () => {
        window.location.href =
        "dashboard.html";
    }
);
// LOGOUT BUTTON ================================
document
  .getElementById("logout-btn")
  .addEventListener("click", async () => {
    await auth.signOut();
    window.location.href = "index.html";
  });

// PROTECT DASHBOARD ==========================
auth.onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = "login.html";
  }
});