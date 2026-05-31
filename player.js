const players = {

    "aaron-judge":{

        name:"Aaron Judge",

        team:"NYY",

        position:"OF",

        grade:96,

        avg:".342",

        hr:"21",

        rbi:"53",

        ops:"1.145",

        outlook:
        "Elite fantasy asset with MVP upside. One of the safest power bats in fantasy baseball."

    }

};

const params =
new URLSearchParams(
    window.location.search
);

const playerId =
params.get("id");

const player =
players[playerId];

if(player){

    document.getElementById(
        "player-name"
    ).textContent =
    player.name;

    document.getElementById(
        "player-meta"
    ).textContent =
    `${player.team} • ${player.position}`;

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