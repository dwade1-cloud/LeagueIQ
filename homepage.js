// =========================
// HOMEPAGE DATA
// =========================
// SPORT IMAGES =======================================
const sportImages = {
  mlb: "images/baseball.png",
  nfl: "images/football.png",
  nba: "images/basketball.png",
  nhl: "images/hockey-puck.png",
};
// HOMEPAGE CONTENT
const sportContent = {
  mlb: {
    heroTitle:
      '<span class="homepage-hero-fantasy">Fantasy</span> <span class="homepage-hero-sport">Baseball</span>',
    heroText: "Built to help you win more fantasy baseball leagues.",
    comingSoonText: "",
    futureText: "",
    comingSoon: false,
  },
  nfl: {
    heroTitle:
      '<span class="homepage-hero-fantasy">Fantasy</span> <span class="homepage-hero-sport">Football</span>',
    heroText:
      "Dominate your fantasy football league with advanced rankings, trade analysis, player insights, waiver recommendations, and league intelligence. LeagueIQ Football is currently in development.",
    comingSoonText:
      "LeagueIQ currently focuses on fantasy baseball. Additional sports such as Football are planned for future versions as we continue expanding the platform.",
    futureText:
      "Fantasy Football is planned as the next major expansion for LeagueIQ. Create a free account and be among the first to hear about future updates and new feature releases.",
    comingSoon: true,
  },
  nba: {
    heroTitle:
      '<span class="homepage-hero-fantasy">Fantasy</span> <span class="homepage-hero-sport">Basketball</span>',
    heroText:
      "Build smarter fantasy basketball rosters with advanced rankings, player analytics, trade tools, and league intelligence. LeagueIQ Basketball is currently on the horizon.",
    comingSoonText:
      "LeagueIQ currently focuses on fantasy baseball. Additional sports such as Basketball are planned for future versions as we continue expanding the platform.",
    futureText:
      "Fantasy Basketball is planned as a future expansion of LeagueIQ following fantasy football. Create a free account to stay informed about future updates, feature releases, and platform growth.",
    comingSoon: true,
  },
  nhl: {
    heroTitle:
      '<span class="homepage-hero-fantasy">Fantasy</span> <span class="homepage-hero-sport">Hockey</span>',
    heroText:
      "Gain an edge with fantasy hockey rankings, player analytics, trade evaluations, and league insights. LeagueIQ Hockey is planned as a future expansion of the platform.",
    comingSoonText:
      "LeagueIQ currently focuses on fantasy baseball. Additional sports such as Hockey are planned for future versions as we continue expanding the platform.",
    futureText:
      "Fantasy Hockey is part of the long-term vision for LeagueIQ. As the platform continues to expand beyond baseball, football, and basketball, hockey tools and analytics are planned for a future release.",
    comingSoon: true,
  },
};
// =========================
// SPORT DROPDOWN
// =========================
let homepageDropdownInitialized = false;
function initializeHomepageDropdown() {
  if (homepageDropdownInitialized) return true;

  const headerContainer = document.getElementById("header-container");
  if (!headerContainer) return false;

  const customDropdown = headerContainer.querySelector("#custom-dropdown");
  const dropdownSelected = headerContainer.querySelector("#dropdown-selected");
  const selectedSport = headerContainer.querySelector("#selected-sport");
  const dropdownOptionButtons = headerContainer.querySelectorAll(".dropdown-option");

  if (!customDropdown || !dropdownSelected || !selectedSport || dropdownOptionButtons.length === 0) {
    return false;
  }

  dropdownSelected.addEventListener("click", (event) => {
    event.stopPropagation();
    customDropdown.classList.toggle("dropdown-open");
  });

  dropdownOptionButtons.forEach((option) => {
    option.addEventListener("click", () => {
      currentSport = option.dataset.sport;
      selectedSport.innerText = currentSport.toUpperCase();
      changeSportBackground(currentSport);
      updateHomepageContent(currentSport);
      dropdownOptionButtons.forEach((btn) => {
        btn.classList.remove("active-option");
      });
      option.classList.add("active-option");
      customDropdown.classList.remove("dropdown-open");
      console.log("Current Sport:", currentSport);
    });
  });

  document.addEventListener("click", () => {
    customDropdown.classList.remove("dropdown-open");
  });

  homepageDropdownInitialized = true;
  return true;
}

function waitForHomepageDropdown() {
  if (initializeHomepageDropdown()) {
    return;
  }

  const headerContainer = document.getElementById("header-container");
  if (!headerContainer) {
    return;
  }

  const observer = new MutationObserver(() => {
    if (initializeHomepageDropdown()) {
      observer.disconnect();
    }
  });

  observer.observe(headerContainer, { childList: true, subtree: true });
}

waitForHomepageDropdown();
// =========================
// HOMEPAGE INITIALIZATION
// =========================
// CURRENT SPORT ======================================
let currentSport = "mlb";
const publicHomepage = document.getElementById("public-homepage");
updateHomepageContent("mlb");
// DEFAULT VIEW =======================================
document.getElementById("login-screen")?.classList.add("hidden");
document.getElementById("signup-screen")?.classList.add("hidden");
document.getElementById("league-connect-screen")?.classList.add("hidden");
document.getElementById("app-container")?.classList.add("hidden");
// BACKGROUND ANIMATION ===============================
function changeSportBackground(sport) {
  const image = document.getElementById("sport-image");
  image.classList.remove("sport-slide-in");
  image.classList.add("sport-slide-out");
  setTimeout(() => {
    image.classList.remove("sport-mlb", "sport-nfl", "sport-nba", "sport-nhl");
    image.classList.add(`sport-${sport}`);
    image.src = sportImages[sport];
    image.classList.remove("sport-slide-out");
    image.classList.add("sport-slide-in");
  }, 500);
}
// RESPONSIVE SEARCH BAR TEXT =========================
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
// =========================
// HOMEPAGE CONTENT
// =========================
function updateHomepageContent(sport) {
  const data = sportContent[sport];
  document.getElementById("hero-title").innerHTML = data.heroTitle;
  document.getElementById("hero-text").textContent = data.heroText;
  const comingSoonDescription = document.getElementById(
    "coming-soon-description",
  );
  if (comingSoonDescription) {
    comingSoonDescription.textContent = data.comingSoonText;
  }
  const futureLeagueIQText = document.getElementById("future-leagueiq-text");
  if (futureLeagueIQText) {
    futureLeagueIQText.textContent = data.futureText;
  }
  const mlbSection = document.getElementById("mlb-rankings-section");
  const comingSoonSection = document.getElementById("coming-soon-section");
  if (sport === "mlb") {
    mlbSection.classList.remove("hidden");
    comingSoonSection.classList.add("hidden");
  } else {
    mlbSection.classList.add("hidden");
    comingSoonSection.classList.remove("hidden");
  }
}
// =========================
// HOMEPAGE HEADER CONTENT
// =========================
const publicPages = [
  "public-homepage",
  "rankings-page",
  "trending-page",
  "trade-page",
  "injuries-page",
  "waiver-page",
  "buylow-page",
  "boombust-page",
  "teamstats-page",
];
// HOMEPAGE BUTTON ====================================
function showPage(pageId) {
  const headerContainer = document.getElementById("header-container");
  const homepageBtn = headerContainer?.querySelector("#homepage-btn");
  const customDropdown = headerContainer?.querySelector("#custom-dropdown");

  publicPages.forEach((page) => {
    document.getElementById(page).classList.add("hidden");
  });
  document.getElementById(pageId).classList.remove("hidden");
  if (pageId === "public-homepage") {
    homepageBtn?.classList.add("hidden");
    customDropdown?.classList.remove("hidden");
  } else {
    homepageBtn?.classList.remove("hidden");
    customDropdown?.classList.add("hidden");
  }
}
