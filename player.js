const players = [
    {
        playerId:12345,
        name:"Aaron Judge",
        team:"NYY",
        positions:["OF"],
        age:34,
        height:"6'7\"",
        weight:282,
        jersey:99,
        bats:"R",
        throws:"R",
        grade:96,
        fantasyRank:1,
        fantasyPoints:487,
        ppg:18.7,
        tradeValue:98,
        avg:".342",
        hr:21,
        rbi:53,
        runs:58,
        sb:4,
        ops:"1.145",
        outlook:
        "Elite fantasy asset with MVP upside."
    }
];
const params =
new URLSearchParams(
    window.location.search);
const playerId =
params.get("id");
const player =
players.find(
    p =>
    String(p.playerId) ===
    String(playerId));
if(player){
    document.getElementById(
        "player-name"
    ).textContent =
    player.name;
    document.getElementById(
        "player-meta"
    ).textContent =
    `${player.team} • ${player.positions.join(", ")}`;
    document.getElementById(
        "player-grade"
    ).textContent =
    player.grade;
    document.getElementById(
        "player-avg"
    ).textContent =
    player.avg;
    document.getElementById(
        "player-hr"
    ).textContent =
    player.hr;
    document.getElementById(
        "player-rbi"
    ).textContent =
    player.rbi;
    document.getElementById(
        "player-ops"
    ).textContent =
    player.ops;
    document.getElementById(
        "player-outlook"
    ).textContent =
    player.outlook;
}
const homepageBtn =
document.getElementById(
    "homepage-btn"
);

if(homepageBtn){
    homepageBtn.addEventListener(
        "click",
        () => {
            window.location.href =
            "index.html";
        }
    );
}
const rankingsBtn =
document.getElementById(
    "nav-rankings"
);

if(rankingsBtn){
    rankingsBtn.addEventListener(
        "click",
        () => {
            window.location.href =
            "index.html";
        }
    );
}
const trendingBtn =
document.getElementById(
    "nav-trending"
);

if(trendingBtn){
    trendingBtn.addEventListener(
        "click",
        () => {
            window.location.href =
            "index.html";
        }
    );
}
const tradeBtn =
document.getElementById(
    "nav-trade"
);

if(tradeBtn){
    tradeBtn.addEventListener(
        "click",
        () => {
            window.location.href =
            "index.html";
        }
    );
}
const moreDropdown =
document.getElementById(
    "more-dropdown"
);

const moreBtn =
document.getElementById(
    "more-btn"
);

if(moreBtn){
    moreBtn.addEventListener(
        "click",
        (event) => {
            event.stopPropagation();
            moreDropdown.classList.toggle(
                "more-open"
            );
        }
    );
}

document.addEventListener(
    "click",
    () => {
        moreDropdown.classList.remove(
            "more-open"
        );
    }
);
// LOGIN BUTTON
const loginBtn =
document.getElementById(
    "public-login-btn"
);

if(loginBtn){
    loginBtn.addEventListener(
        "click",
        () => {
            window.location.href =
            "index.html";
        }
    );
}

// SIGNUP BUTTON
const signupBtn =
document.getElementById(
    "public-signup-btn"
);

if(signupBtn){
    signupBtn.addEventListener(
        "click",
        () => {
            window.location.href =
            "index.html";
        }
    );
}