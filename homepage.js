// =========================
// HOMEPAGE DATA
// =========================
// SPORT IMAGES =======================================
const sportImages = {
    mlb:
    "images/baseball.png",
    nfl:
    "images/football.png",
    nba:
    "images/basketball.png",
    nhl:
    "images/hockey-puck.png"
};
// HOMEPAGE CONTENT
const sportContent = {
    mlb:{
        heroTitle:'<span class="homepage-hero-fantasy">Fantasy</span> <span class="homepage-hero-sport">Baseball</span>',
        heroText:"Built to help you win more fantasy baseball leagues.",
	comingSoonText:"",       
	futureText:"",
	comingSoon:false
    },
    nfl:{
        heroTitle:'<span class="homepage-hero-fantasy">Fantasy</span> <span class="homepage-hero-sport">Football</span>',
        heroText:"Dominate your fantasy football league with advanced rankings, trade analysis, player insights, waiver recommendations, and league intelligence. LeagueIQ Football is currently in development.",
	comingSoonText:"LeagueIQ currently focuses on fantasy baseball. Additional sports such as Football are planned for future versions as we continue expanding the platform.",
	futureText:"Fantasy Football is planned as the next major expansion for LeagueIQ. Create a free account and be among the first to hear about future updates and new feature releases.",
        comingSoon:true
    },
    nba:{
        heroTitle:'<span class="homepage-hero-fantasy">Fantasy</span> <span class="homepage-hero-sport">Basketball</span>',
        heroText:"Build smarter fantasy basketball rosters with advanced rankings, player analytics, trade tools, and league intelligence. LeagueIQ Basketball is currently on the horizon.",
	comingSoonText:"LeagueIQ currently focuses on fantasy baseball. Additional sports such as Basketball are planned for future versions as we continue expanding the platform.",
	futureText:"Fantasy Basketball is planned as a future expansion of LeagueIQ following fantasy football. Create a free account to stay informed about future updates, feature releases, and platform growth.",
        comingSoon:true
    },
    nhl:{
        heroTitle:'<span class="homepage-hero-fantasy">Fantasy</span> <span class="homepage-hero-sport">Hockey</span>',
        heroText:"Gain an edge with fantasy hockey rankings, player analytics, trade evaluations, and league insights. LeagueIQ Hockey is planned as a future expansion of the platform.",
	comingSoonText:"LeagueIQ currently focuses on fantasy baseball. Additional sports such as Hockey are planned for future versions as we continue expanding the platform.",
	futureText:"Fantasy Hockey is part of the long-term vision for LeagueIQ. As the platform continues to expand beyond baseball, football, and basketball, hockey tools and analytics are planned for a future release.",
        comingSoon:true
    }
};
// =========================
// PLAYER SEARCH
// =========================
// SEARCH DATA ========================================
const playerDatabase = [
    {playerId:10001,
     name:"Shohei Ohtani",
     meta:"LAD • DH/SP • Trending ↑"},
    {playerId:12345,
     name:"Aaron Judge",
     meta:"NYY • OF • Power Leader"},
    {playerId:10003,
     name:"Bobby Witt Jr.",
     meta:"KC • SS • Top Dynasty"},
    {playerId:10004,
     name:"Julio Rodriguez",
     meta:"SEA • OF • Buy Low"},
    {playerId:10005,
     name:"Ronald Acuna Jr.",
     meta:"ATL • OF • Injury Recovery"},
    {playerId:10006,
     name:"Jackson Holliday",
     meta:"BAL • INF • Top Prospect"},
    {playerId:10007,
     name:"Wyatt Langford",
     meta:"TEX • OF • Trending ↑"},
    {playerId:10008,
     name:"Paul Skenes",
     meta:"PIT • SP • Ace Potential"}
];
// SEARCH INPUT =======================================
const playerSearch =
document.getElementById(
    "player-search");
// SEARCH RESULTS =====================================
const searchResults =
document.getElementById(
    "search-results");
playerSearch.addEventListener(
    "input",
    () => {
        const query =
        playerSearch.value
        .toLowerCase()
        .trim();
        if(!query){
            searchResults.innerHTML = "";
            searchResults.classList.add(
                "hidden");
            return;
        }
        const matches =
        playerDatabase.filter(
            player =>
            player.name
            .toLowerCase()
            .includes(query));
        searchResults.innerHTML = "";
        matches.forEach(
            player => {
                const result =
                document.createElement(
                    "button");
                result.classList.add(
                    "search-player-item");
                result.innerHTML = `
                    <div>
                        ${player.name}
                    </div>
                    <div class="search-player-meta">
                        ${player.meta}
                    </div>
                `;
                searchResults.appendChild(
                    result);
		result.addEventListener(
    		    "click",
    		    () => {
       			window.location.href =
        		`player.html?id=${player.playerId}`;
    		    }
		);
            }
        );
        searchResults.classList.remove(
            "hidden");
    }
);
// CLOSE SEARCH RESULTS ===============================
window.addEventListener(
    "click",
    (event) => {
        if(
            !event.target.closest(
                ".search-container")
        ){
            searchResults.classList.add(
                "hidden");
        }
    }
);
playerSearch.addEventListener(
    "click",
    (event) => {
        event.stopPropagation();
    }
);
// SEARCH ICON BUTTON =================================
if(mobileSearchBtn){
    mobileSearchBtn.addEventListener(
        "click",
        (event) => {
            event.stopPropagation();
            searchOverlay.classList.remove(
                "hidden");
            expandedSearch.value = "";
            setTimeout(
                () => {
                    expandedSearch.focus();
                },
                10);
            renderExpandedResults("");
        }
    );
}
// =========================
// SEARCH OVERLAY
// =========================
const searchOverlay =
document.getElementById(
    "search-overlay");
const expandedSearch =
document.getElementById(
    "expanded-search");
const expandedSearchResults =
document.getElementById(
    "expanded-search-results");
// OPEN SEARCH OVERLAY ================================
playerSearch.addEventListener(
    "click",
    (event) => {
        event.stopPropagation();
        if(window.innerWidth < 1617){
            searchOverlay.classList.remove(
                "hidden");
            expandedSearch.value =
            playerSearch.value;
            setTimeout(() => {
                expandedSearch.focus();}, 10);
            renderExpandedResults(
                expandedSearch.value);
	}
    }
);
// RENDER RESULTS =====================================
function renderExpandedResults(query){
    expandedSearchResults.innerHTML ="";
    const matches =
    playerDatabase.filter(
        player =>
        player.name
        .toLowerCase()
        .includes(
            query.toLowerCase()));
    matches.forEach(
        player => {
            const result =
            document.createElement(
                "button");
            result.classList.add(
                "search-player-item");
            result.innerHTML = `
                <div>
                    ${player.name}
                </div>
                <div class="search-player-meta">
                    ${player.meta}
                </div>`;
            expandedSearchResults.appendChild(
                result);
	}
    );
}
// LIVE SEARCH ========================================
expandedSearch.addEventListener(
    "input",
    () => {
        renderExpandedResults(
            expandedSearch.value);
    }
);
// CLOSE SEARCH OVERLAY ===============================
document.addEventListener(
    "click",
    (event) => {
        const searchBox =
        document.querySelector(
            ".search-overlay-box");
        if(
            searchOverlay.classList.contains(
                "hidden")){
            return;}
        if(
            searchBox.contains(
                event.target)){
            return;}
        searchOverlay.classList.add(
            "hidden");
    }
);
// =========================
// SPORT DROPDOWN
// =========================
const customDropdown =
document.getElementById(
    "custom-dropdown");
const dropdownSelected =
document.getElementById(
    "dropdown-selected");
const selectedSport =
document.getElementById(
    "selected-sport");
const dropdownOptionButtons =
document.querySelectorAll(
    ".dropdown-option");
// OPEN / CLOSE DROPDOWN ==============================
dropdownSelected.addEventListener(
    "click",
    (event) => {
        event.stopPropagation();
        customDropdown.classList.toggle(
            "dropdown-open");
    }
);
// SELECT OPTION ======================================
dropdownOptionButtons.forEach(
    option => {
        option.addEventListener(
            "click",
            () => {
                currentSport =
                option.dataset.sport;
		selectedSport.innerText =
                currentSport.toUpperCase();
		changeSportBackground(
    		    currentSport);
		updateHomepageContent(
    		    currentSport);
                dropdownOptionButtons.forEach(
                    btn => {
                        btn.classList.remove(
                            "active-option");
                    }
                );
                option.classList.add(
                    "active-option");
                customDropdown.classList.remove(
                    "dropdown-open");
                console.log(
                    "Current Sport:",
                    currentSport);
            }
        );
    }
);
// CLOSE OUTSIDE CLICK ================================
document.addEventListener(
    "click",
    () => {
        customDropdown.classList.remove(
            "dropdown-open");
    }
);
// =========================
// HOMEPAGE INITIALIZATION
// =========================
// CURRENT SPORT ======================================
let currentSport = "mlb";
const publicHomepage =
document.getElementById(
    "public-homepage");
updateHomepageContent(
    "mlb");
// DEFAULT VIEW =======================================
document.getElementById(
    "login-screen"
)?.classList.add("hidden");
document.getElementById(
    "signup-screen"
)?.classList.add("hidden");
document.getElementById(
    "league-connect-screen"
)?.classList.add("hidden");
document.getElementById(
    "app-container"
)?.classList.add("hidden");
// =========================
// UI EFFECTS
// =========================
// HEADER SHRINK
const publicHeader =
document.querySelector(
    ".public-header");
window.addEventListener(
    "scroll",
    () => {
        if(window.scrollY > 40){
            publicHeader.style.height =
            "60px";
        } else {
            publicHeader.style.height =
            "68px";
        }
    }
);
// BACKGROUND ANIMATION ===============================
function changeSportBackground(sport){
    const image =
    document.getElementById(
        "sport-image");
    image.classList.remove(
        "sport-slide-in");
    image.classList.add(
        "sport-slide-out");
    setTimeout(() => {
	image.classList.remove(
    	    "sport-mlb",
    	    "sport-nfl",
    	    "sport-nba",
    	    "sport-nhl");
	image.classList.add(
    	    `sport-${sport}`);
        image.src =
        sportImages[sport];
        image.classList.remove(
            "sport-slide-out");
        image.classList.add(
            "sport-slide-in");
	},500
    );
}
// RESPONSIVE SEARCH BAR TEXT =========================
function updateSearchPlaceholder(){
    const search =
    document.getElementById(
        "player-search");
    if(window.innerWidth < 910){
        search.placeholder = "Search";
    }else{
        search.placeholder =
        "Search any active player";
    }
}
window.addEventListener(
    "resize",
    updateSearchPlaceholder);
updateSearchPlaceholder();
// =========================
// HOMEPAGE CONTENT
// =========================
function updateHomepageContent(
    sport
){
    const data =
    sportContent[sport];
    document.getElementById(
        "hero-title"
    ).innerHTML =
    data.heroTitle;
    document.getElementById(
        "hero-text"
    ).textContent =
    data.heroText;
    const comingSoonDescription =
    document.getElementById(
        "coming-soon-description");
    if(comingSoonDescription){
        comingSoonDescription.textContent =
        data.comingSoonText;}
    const futureLeagueIQText =
    document.getElementById(
        "future-leagueiq-text");
    if(futureLeagueIQText){
        futureLeagueIQText.textContent =
        data.futureText;}
    const mlbSection =
    document.getElementById(
        "mlb-rankings-section");
    const comingSoonSection =
    document.getElementById(
        "coming-soon-section");
    if(sport === "mlb"){
        mlbSection.classList.remove(
            "hidden");
        comingSoonSection.classList.add(
            "hidden");
    }else{
        mlbSection.classList.add(
            "hidden");
        comingSoonSection.classList.remove(
            "hidden");
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
    "teamstats-page"
];
// HOMEPAGE BUTTON ====================================
const homepageBtn =
document.getElementById(
    "homepage-btn");
function showPage(pageId){
    publicPages.forEach(
        page => {
            document
            .getElementById(page)
            .classList.add(
                "hidden");
        }
    );
    document
    .getElementById(pageId)
    .classList.remove(
        "hidden");
    if(
    	pageId ===
    	"public-homepage"
    ){
    	homepageBtn.classList.add(
            "hidden");
    	customDropdown.classList.remove(
            "hidden");
    }else{
    	homepageBtn.classList.remove(
            "hidden");
    	customDropdown.classList.add(
            "hidden");
    }
}
homepageBtn.addEventListener(
    "click",
    () => {
        showPage(
            "public-homepage");
    }
);
// CONNECT NAV BUTTONS ================================
document
.getElementById(
    "nav-rankings")
.addEventListener(
    "click",
    () => {
        showPage(
            "rankings-page");
    }
);
document
.getElementById(
    "nav-trending")
.addEventListener(
    "click",
    () => {
        showPage(
            "trending-page");
    }
);
document
.getElementById(
    "nav-trade")
.addEventListener(
    "click",
    () => {
        showPage(
            "trade-page");
    }
);
// MORE DROPDOWN MENU =================================
const moreDropdown =
document.getElementById(
    "more-dropdown");
const moreBtn =
document.getElementById(
    "more-btn");
const moreMenu =
document.getElementById(
    "more-dropdown-menu");
moreBtn.addEventListener(
    "click",
    (event) => {
        event.stopPropagation();
        moreDropdown.classList.toggle(
            "more-open");
    }
);
document.addEventListener(
    "click",
    () => {
        moreDropdown.classList.remove(
            "more-open");
    }
);
document
.getElementById(
    "nav-injuries")
.addEventListener(
    "click",
    () => {
        showPage(
            "injuries-page");
    }
);
document
.getElementById(
    "nav-waiver")
.addEventListener(
    "click",
    () => {
        showPage(
            "waiver-page");
    }
);
document
.getElementById(
    "nav-buylow")
.addEventListener(
    "click",
    () => {
        showPage(
            "buylow-page");
    }
);
document
.getElementById(
    "nav-boombust")
.addEventListener(
    "click",
    () => {
        showPage(
            "boombust-page");
    }
);
document
.getElementById(
    "nav-teamstats")
.addEventListener(
    "click",
    () => {
        showPage(
            "teamstats-page");
    }
);