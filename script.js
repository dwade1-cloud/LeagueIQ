// FIREBASE CONFIG
const firebaseConfig = {
    apiKey: "AIzaSyCcJchr26rP-GeW_6FYa5sXxpHQPT5k0eY",
    authDomain:
    "leagueiq-d3e04.firebaseapp.com",
    projectId:
    "leagueiq-d3e04",
    storageBucket:
    "leagueiq-d3e04.firebasestorage.app",
    messagingSenderId:
    "938215290237",
    appId:
    "1:938215290237:web:b9c4dd35e0d53772a88814"
};
// INITIALIZE FIREBASE
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
// SPORT IMAGES
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
// SPORT PAGE CONTENT
const sportContent = {

    mlb:{
        heroTitle:
        '<span class="homepage-hero-fantasy">Fantasy</span> <span class="homepage-hero-sport">Baseball</span>',

        heroText:
        "Built to help you win more fantasy baseball leagues.",

        comingSoon:false
    },

    nfl:{
        heroTitle:
        '<span class="homepage-hero-fantasy">Fantasy</span> <span class="homepage-hero-sport">Football</span>',

        heroText:"Dominate your fantasy football league with advanced rankings, trade analysis, player insights, waiver recommendations, and league intelligence. LeagueIQ Football is currently in development.",

	comingSoonText:"LeagueIQ currently focuses on fantasy baseball. Additional sports such as Football are planned for future versions as we continue expanding the platform.",

	futureText:"Fantasy Football is planned as the next major expansion for LeagueIQ. Create a free account and be among the first to hear about future updates and new feature releases.",

        comingSoon:true
    },

    nba:{
        heroTitle:
        '<span class="homepage-hero-fantasy">Fantasy</span> <span class="homepage-hero-sport">Basketball</span>',

        heroText:"Build smarter fantasy basketball rosters with advanced rankings, player analytics, trade tools, and league intelligence. LeagueIQ Basketball is currently on the horizon.",

	comingSoonText:"LeagueIQ currently focuses on fantasy baseball. Additional sports such as Basketball are planned for future versions as we continue expanding the platform.",

	futureText:"Fantasy Basketball is planned as a future expansion of LeagueIQ following fantasy football. Create a free account to stay informed about future updates, feature releases, and platform growth.",

        comingSoon:true
    },

    nhl:{
        heroTitle:
        '<span class="homepage-hero-fantasy">Fantasy</span> <span class="homepage-hero-sport">Hockey</span>',

        heroText:"Gain an edge with fantasy hockey rankings, player analytics, trade evaluations, and league insights. LeagueIQ Hockey is planned as a future expansion of the platform.",

	comingSoonText:"LeagueIQ currently focuses on fantasy baseball. Additional sports such as Hockey are planned for future versions as we continue expanding the platform.",

	futureText:"Fantasy Hockey is part of the long-term vision for LeagueIQ. As the platform continues to expand beyond baseball, football, and basketball, hockey tools and analytics are planned for a future release.",

        comingSoon:true
    }

};
// SCREENS

const loginScreen =
document.getElementById(
    "login-screen"
);

const signupScreen =
document.getElementById(
    "signup-screen"
);

const leagueScreen =
document.getElementById(
    "league-connect-screen"
);

const appContainer =
document.getElementById(
    "app-container"
);

// LOGIN / SIGNUP NAVIGATION

document
.getElementById(
    "show-signup-btn"
)
.addEventListener(
    "click",
    () => {

        loginScreen.classList.add(
            "hidden"
        );

        signupScreen.classList.remove(
            "hidden"
        );

    }
);

document
.getElementById(
    "back-login-btn"
)
.addEventListener(
    "click",
    () => {

        signupScreen.classList.add(
            "hidden"
        );

        loginScreen.classList.remove(
            "hidden"
        );

    }
);

// SIGNUP

document
.getElementById(
    "signup-btn"
)
.addEventListener(
    "click",
    async () => {

        const name =
        document.getElementById(
            "signup-name"
        ).value;

        const email =
        document.getElementById(
            "signup-email"
        ).value;

        const password =
        document.getElementById(
            "signup-password"
        ).value;

        const confirm =
        document.getElementById(
            "signup-confirm"
        ).value;

        const experience =
        document.getElementById(
            "signup-experience"
        ).value;

        const favoriteSport =
        document.getElementById(
            "signup-sport"
        ).value;

        if(
            !name ||
            !email ||
            !password ||
            !confirm
        ){

            alert(
                "Please complete all fields."
            );

            return;

        }

        if(password !== confirm){

            alert(
                "Passwords do not match."
            );

            return;

        }

        try {

            const userCredential =
            await auth
            .createUserWithEmailAndPassword(
                email,
                password
            );

            const user =
                userCredential.user;

            await db
            .collection("users")
            .doc(user.uid)
            .set({

                name:name,

                email:email,

                favoriteSport:favoriteSport,

                experience:experience,

                plan:"free",

                platform:"",

                leagueID:"",

                createdAt:
                new Date()

            });

            signupScreen.classList.add(
                "hidden"
            );

            leagueScreen.classList.remove(
                "hidden"
            );

        } catch(error){

            alert(error.message);

        }

    }
);

document
.getElementById(
    "coming-soon-signup-btn")
.addEventListener(
    "click",
    () => {
        document
        .getElementById(
            "public-homepage")
        .classList.add(
            "hidden");
        document
        .getElementById(
            "signup-screen")
        .classList.remove(
            "hidden");});
// LOGIN

document
.getElementById(
    "login-btn"
)
.addEventListener(
    "click",
    async () => {

        const email =
        document.getElementById(
            "login-email"
        ).value;

        const password =
        document.getElementById(
            "login-password"
        ).value;

        try {

            document
            .getElementById(
                "login-error"
            )
            .classList.add(
                "hidden"
            );

            console.log(
                "LOGIN BUTTON CLICKED"
            );

            await auth
            .signInWithEmailAndPassword(
                email,
                password
            );

        } catch(error){

            console.error(error);

            const loginError =
            document.getElementById(
                "login-error"
            );

            loginError.classList.remove(
                "hidden"
            );

            if(
                error.code ===
                "auth/user-not-found"
            ){

                loginError.innerText =
                "Invalid Email";

            } else if(

                error.code ===
                "auth/wrong-password"

            ){

                loginError.innerText =
                "Invalid Password";

            } else if(

                error.code ===
                "auth/invalid-credential"

            ){

                loginError.innerText =
                "Invalid Email or Password";

            } else {

                loginError.innerText =
                "Login Failed";

            }

        }

    }
);

// AUTH STATE

auth.onAuthStateChanged(
async (user) => {

    if(user){

        console.log(
            "USER LOGGED IN"
        );

        loginScreen.classList.add(
            "hidden"
        );

        signupScreen.classList.add(
            "hidden"
        );

        leagueScreen.classList.add(
            "hidden"
        );

        appContainer.classList.remove(
            "hidden"
        );

    } else {

        console.log(
            "NO USER"
        );

        loginScreen.classList.remove(
            "hidden"
        );

        signupScreen.classList.add(
            "hidden"
        );

        leagueScreen.classList.add(
            "hidden"
        );

        appContainer.classList.add(
            "hidden"
        );

    }

});

// TAB NAVIGATION

const tabButtons =
document.querySelectorAll(
    ".tab-btn"
);

const tabContents =
document.querySelectorAll(
    ".tab-content"
);

tabButtons.forEach(
(button) => {

    button.addEventListener(
        "click",
        () => {

            tabButtons.forEach(
            (btn) => {

                btn.classList.remove(
                    "active-tab-btn"
                );

            });

            tabContents.forEach(
            (tab) => {

                tab.classList.remove(
                    "active-content"
                );

            });

            button.classList.add(
                "active-tab-btn"
            );

            document
            .getElementById(
                button.dataset.tab
            )
            .classList.add(
                "active-content"
            );

        }
    );

});

// LOGOUT BUTTON

window.addEventListener(
    "load",
    () => {

        const logoutBtn =
        document.getElementById(
            "logout-btn"
        );

        if(logoutBtn){

            logoutBtn.onclick =
            async () => {

                try {

                    await firebase
                    .auth()
                    .signOut();

                    location.reload();

                } catch(error){

                    console.error(error);

                    alert(
                        "Logout failed."
                    );

                }

            };

        }

    }
);

// LEAGUE CONNECT FLOW

const sportSelect =
document.getElementById(
    "sport-select"
);

const platformSelectNew =
document.getElementById(
    "platform-select"
);

const leagueNameInput =
document.getElementById(
    "league-name"
);

const autoImportCheckbox =
document.getElementById(
    "auto-import-name"
);

const leagueIdInput =
document.getElementById(
    "league-id-input"
);

const leagueTypeSelect =
document.getElementById(
    "league-type"
);

const fantasyNameInput =
document.getElementById(
    "fantasy-name"
);

const continueDashboardBtn =
document.getElementById(
    "continue-dashboard-btn"
);

// SPORT SELECT

sportSelect.addEventListener(
    "change",
    () => {

        if(
            sportSelect.value
        ){

            platformSelectNew.disabled =
            false;

        }

    }
);

// PLATFORM SELECT

platformSelectNew.addEventListener(
    "change",
    () => {

        if(
            platformSelectNew.value
        ){

            leagueNameInput.disabled =
            false;

            autoImportCheckbox.disabled =
            false;

        }

    }
);

// LEAGUE NAME

leagueNameInput.addEventListener(
    "input",
    () => {

        if(
            leagueNameInput.value
        ){

            leagueIdInput.disabled =
            false;

        }

    }
);

// LEAGUE ID

leagueIdInput.addEventListener(
    "input",
    () => {

        if(
            leagueIdInput.value
        ){

            leagueTypeSelect.disabled =
            false;

        }

    }
);

// LEAGUE TYPE

leagueTypeSelect.addEventListener(
    "change",
    () => {

        if(
            leagueTypeSelect.value
        ){

            fantasyNameInput.disabled =
            false;

        }

    }
);

// FANTASY NAME

fantasyNameInput.addEventListener(
    "input",
    () => {

        if(
            fantasyNameInput.value
        ){

            continueDashboardBtn.disabled =
            false;

        }

    }
);

// CONTINUE TO DASHBOARD

continueDashboardBtn.addEventListener(
    "click",
    async () => {

        const user =
            auth.currentUser;

        try {

            await db
            .collection("users")
            .doc(user.uid)
            .update({

                sport:
                sportSelect.value,

                platform:
                platformSelectNew.value,

                leagueName:
                leagueNameInput.value,

		leagueID:
		leagueIDInput.value,

                leagueType:
                leagueTypeSelect.value,

                fantasyName:
                fantasyNameInput.value,

                leagueConnected:true

            });

            leagueScreen.classList.add(
                "hidden"
            );

            appContainer.classList.remove(
                "hidden"
            );

        } catch(error){

            alert(error.message);

        }

    }
);

// AUTO IMPORT LEAGUE NAME

autoImportCheckbox.addEventListener(
    "change",
    () => {

        if(
            autoImportCheckbox.checked
        ){

            leagueNameInput.disabled =
            true;

            leagueNameInput.value =
            "Auto Import Enabled";

            leagueNameInput.style.color =
            "#8a8a8a";

            leagueIdInput.disabled =
            false;

        } else {

            leagueNameInput.disabled =
            false;

            leagueNameInput.value =
            "";

            leagueNameInput.style.color =
            "white";

        }

    }
);

// NUMBERS ONLY FOR LEAGUE ID

leagueIdInput.addEventListener(
    "input",
    () => {

        leagueIdInput.value =
        leagueIdInput.value.replace(
            /[^0-9]/g,
            ""
        );

    }
);

// FANTASY LEAGUES DROPDOWN

const leagueDropdownBtn =
document.getElementById(
    "league-dropdown-btn"
);

const leagueDropdownMenu =
document.getElementById(
    "league-dropdown-menu"
);

leagueDropdownBtn.addEventListener(
    "click",
    () => {

        leagueDropdownMenu.classList.toggle(
            "hidden"
        );

    }
);

// ADD LEAGUE BUTTON

const addLeagueBtn =
document.getElementById(
    "add-league-btn"
);

addLeagueBtn.addEventListener(
    "click",
    () => {

        appContainer.classList.add(
            "hidden"
        );

        leagueScreen.classList.remove(
            "hidden"
        );

    }
);

// BACK TO DASHBOARD

const backDashboardBtn =
document.getElementById(
    "back-dashboard-btn"
);

backDashboardBtn.addEventListener(
    "click",
    () => {

        if(
            auth.currentUser
        ){

            leagueScreen.classList.add(
                "hidden"
            );

            appContainer.classList.remove(
                "hidden"
            );

        }

    }
);

// DEMO LEAGUE DATA

const demoLeagueData = {

    cleveland: {

        teamTitle:
        "Cleveland Dynasty Dashboard",

        teamDescription:
        "82 Overall Team Grade • #2 Power Ranking • 91 Dynasty Score",

        tradeTitle:
        "Cleveland Dynasty Trades",

        tradeDescription:
        "3 active trade opportunities • Buy Low Alert: Julio Rodriguez",

        leagueTitle:
        "Cleveland Dynasty Rankings",

        leagueDescription:
        "Projected Finish: 2nd • Playoff Odds: 84%",

        playersTitle:
        "Cleveland Dynasty Players",

        playersDescription:
        "Top Prospect: Jackson Holliday • MVP: Ronald Acuna"

    },

    money: {

        teamTitle:
        "Money League Dashboard",

        teamDescription:
        "74 Overall Team Grade • #6 Power Ranking • 58 Redraft Score",

        tradeTitle:
        "Money League Trades",

        tradeDescription:
        "High Risk Trade Market • Sell High Alert: Pete Alonso",

        leagueTitle:
        "Money League Rankings",

        leagueDescription:
        "Projected Finish: 7th • Playoff Odds: 31%",

        playersTitle:
        "Money League Players",

        playersDescription:
        "Top Waiver Add: Wyatt Langford • MVP: Bobby Witt Jr."

    }

};

// LEAGUE SWITCHING

const leagueButtons =
document.querySelectorAll(
    ".league-item-btn"
);

leagueButtons.forEach(
(button) => {

    button.addEventListener(
        "click",
        () => {

            const leagueKey =
            button.dataset.league;

            const league =
            demoLeagueData[
                leagueKey
            ];

            document
            .getElementById(
                "team-title"
            )
            .innerText =
            league.teamTitle;

            document
            .getElementById(
                "team-description"
            )
            .innerText =
            league.teamDescription;

            document
            .getElementById(
                "trade-title"
            )
            .innerText =
            league.tradeTitle;

            document
            .getElementById(
                "trade-description"
            )
            .innerText =
            league.tradeDescription;

            document
            .getElementById(
                "league-title"
            )
            .innerText =
            league.leagueTitle;

            document
            .getElementById(
                "league-description"
            )
            .innerText =
            league.leagueDescription;

            document
            .getElementById(
                "players-title"
            )
            .innerText =
            league.playersTitle;

            document
            .getElementById(
                "players-description"
            )
            .innerText =
            league.playersDescription;

            leagueDropdownMenu.classList.add(
                "hidden"
            );

        }
    );

});

// =========================
// PUBLIC PLAYER SEARCH
// =========================

const playerDatabase = [

    {
        name:"Shohei Ohtani",
        meta:"LAD • DH/SP • Trending ↑"
    },

    {
        name:"Aaron Judge",
        meta:"NYY • OF • Power Leader"
    },

    {
        name:"Bobby Witt Jr.",
        meta:"KC • SS • Top Dynasty"
    },

    {
        name:"Julio Rodriguez",
        meta:"SEA • OF • Buy Low"
    },

    {
        name:"Ronald Acuna Jr.",
        meta:"ATL • OF • Injury Recovery"
    },

    {
        name:"Jackson Holliday",
        meta:"BAL • INF • Top Prospect"
    },

    {
        name:"Wyatt Langford",
        meta:"TEX • OF • Trending ↑"
    },

    {
        name:"Paul Skenes",
        meta:"PIT • SP • Ace Potential"
    }

];

const playerSearch =
document.getElementById(
    "player-search"
);

const searchResults =
document.getElementById(
    "search-results"
);

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
                "hidden"
            );

            return;

        }

        const matches =
        playerDatabase.filter(
            player =>
            player.name
            .toLowerCase()
            .includes(query)
        );

        searchResults.innerHTML = "";

        matches.forEach(
            player => {

                const result =
                document.createElement(
                    "button"
                );

                result.classList.add(
                    "search-player-item"
                );

                result.innerHTML = `

                    <div>
                        ${player.name}
                    </div>

                    <div class="search-player-meta">
                        ${player.meta}
                    </div>

                `;

                searchResults.appendChild(
                    result
                );

            }
        );

        searchResults.classList.remove(
            "hidden"
        );

    }
);

// PREVENT SEARCH CLICK FROM
// IMMEDIATELY CLOSING OVERLAY

playerSearch.addEventListener(
    "click",
    (event) => {

        event.stopPropagation();

    }
);

// CLOSE SEARCH RESULTS

window.addEventListener(
    "click",
    (event) => {

        if(
            !event.target.closest(
                ".search-container"
            )
        ){

            searchResults.classList.add(
                "hidden"
            );

        }

    }
);

// =========================
// LOGIN / SIGN UP BUTTONS
// =========================
const publicLoginBtn =
document.getElementById(
    "public-login-btn"
);
publicLoginBtn.addEventListener(
    "click",
    () => {
        publicHomepage.classList.add(
            "hidden");
        loginScreen.classList.remove(
            "hidden");});
const publicSignupBtn =
document.getElementById(
    "public-signup-btn");
publicSignupBtn.addEventListener(
    "click",
    () => {
        document
        .getElementById(
            "public-homepage")
        .classList.add(
            "hidden");
        document
        .getElementById(
            "signup-screen")
        .classList.remove(
            "hidden");});
const heroSignupBtn =
document.getElementById(
    "hero-signup-btn");
heroSignupBtn.addEventListener(
    "click",
    () => {
        document
        .getElementById(
            "public-homepage")
        .classList.add(
            "hidden");
        document
        .getElementById(
            "signup-screen")
        .classList.remove(
            "hidden");});
// =========================
// BACK TO HOME SCREEN
// =========================
document
.getElementById("back-home-btn")
.addEventListener(
    "click",
    () => {
        document
        .getElementById("signup-screen")
        .classList.add("hidden");
        document
        .getElementById("public-homepage")
        .classList.remove("hidden");});
const backHomeLoginBtn =
document.getElementById(
    "back-home-login-btn");
backHomeLoginBtn.addEventListener(
    "click",
    () => {
        document
        .getElementById(
            "login-screen"
        )
        .classList.add(
            "hidden"
        );
        document
        .getElementById(
            "public-homepage"
        )
        .classList.remove(
            "hidden"
        );
    }
);
// =========================
// PREMIUM SPORT DROPDOWN
// =========================

const customDropdown =
document.getElementById(
    "custom-dropdown"
);

const dropdownSelected =
document.getElementById(
    "dropdown-selected"
);

const selectedSport =
document.getElementById(
    "selected-sport"
);

const dropdownOptionButtons =
document.querySelectorAll(
    ".dropdown-option"
);

// OPEN / CLOSE

dropdownSelected.addEventListener(
    "click",
    (event) => {

        event.stopPropagation();

        customDropdown.classList.toggle(
            "dropdown-open"
        );

    }
);

// SELECT OPTION

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
                // ACTIVE STATE

                dropdownOptionButtons.forEach(
                    btn => {

                        btn.classList.remove(
                            "active-option"
                        );

                    }
                );

                option.classList.add(
                    "active-option"
                );

                // CLOSE

                customDropdown.classList.remove(
                    "dropdown-open"
                );

                console.log(
                    "Current Sport:",
                    currentSport
                );

            }
        );

    }
);

// CLOSE OUTSIDE CLICK

document.addEventListener(
    "click",
    () => {

        customDropdown.classList.remove(
            "dropdown-open"
        );

    }
);

// PUBLIC HOMEPAGE

// CURRENT SPORT CONTEXT

let currentSport = "mlb";

const publicHomepage =
document.getElementById(
    "public-homepage"
);
updateHomepageContent(
    "mlb"
);

// DEFAULT PUBLIC VIEW

loginScreen.classList.add(
    "hidden"
);

signupScreen.classList.add(
    "hidden"
);

leagueScreen.classList.add(
    "hidden"
);

appContainer.classList.add(
    "hidden"
);

publicHomepage.classList.remove(
    "hidden"
);

// HEADER SHRINK ON SCROLL

const publicHeader =
document.querySelector(
    ".public-header"
);

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

// =========================
// EXPANDED SEARCH OVERLAY
// =========================

const searchOverlay =
document.getElementById(
    "search-overlay"
);

const expandedSearch =
document.getElementById(
    "expanded-search"
);

const expandedSearchResults =
document.getElementById(
    "expanded-search-results");
// =========================
// OPEN SEARCH OVERLAY
// =========================
playerSearch.addEventListener(
    "click",
    (event) => {
        event.stopPropagation();
        if(window.innerWidth < 2000){
            searchOverlay.classList.remove(
                "hidden");
            expandedSearch.value =
            playerSearch.value;
            setTimeout(() => {
                expandedSearch.focus();}, 10);
            renderExpandedResults(
                expandedSearch.value);}});
// =========================
// RENDER RESULTS
// =========================
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
                result);});}
// =========================
// LIVE SEARCH
// =========================
expandedSearch.addEventListener(
    "input",
    () => {
        renderExpandedResults(
            expandedSearch.value);});
// =========================
// CLOSE SEARCH OVERLAY
// =========================
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
            "hidden");});
// =========================
// BACKGROUND ANIMATION
// =========================
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
            "sport-slide-in");},500);}
// =========================
// HOMEPAGE SPORT SPECIFIC CHANGE
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
        "mlb-rankings-section"
    );
    const comingSoonSection =
    document.getElementById(
        "coming-soon-section"
    );
    if(sport === "mlb"){
        mlbSection.classList.remove(
            "hidden"
        );
        comingSoonSection.classList.add(
            "hidden"
        );
    }else{
        mlbSection.classList.add(
            "hidden"
        );
        comingSoonSection.classList.remove(
            "hidden"
        );
    }
}
// =========================
// DISAPEARING SEARCH BAR
// =========================
function updateSearchPlaceholder(){

    const search =
    document.getElementById(
        "player-search"
    );

    if(window.innerWidth < 910){

        search.placeholder = "Search";

    }else{

        search.placeholder =
        "Search any active player";

    }

}
window.addEventListener(
    "resize",
    updateSearchPlaceholder
);

updateSearchPlaceholder();