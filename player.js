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
    window.location.search
);

const playerId =
params.get("id");

const player =
players.find(
    p =>
    String(p.playerId) ===
    String(playerId)
);

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