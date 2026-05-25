// LOGIN / CONNECT

const connectBtn = document.getElementById("connect-btn");
const loginScreen = document.getElementById("login-screen");
const appContainer = document.getElementById("app-container");

connectBtn.addEventListener("click", () => {

    const leagueId =
        document.getElementById("league-id").value;

    if (leagueId.trim() === "") {

        alert("Please enter a League ID.");
        return;
    }

    // Save league locally

    localStorage.setItem(
        "leagueID",
        leagueId
    );

    // Show app

    loginScreen.style.display = "none";

    appContainer.classList.remove("hidden");

});


// AUTO LOGIN

window.addEventListener("load", () => {

    const savedLeague =
        localStorage.getItem("leagueID");

    if (savedLeague) {

        loginScreen.style.display = "none";

        appContainer.classList.remove("hidden");
    }

});


// TAB SWITCHING

const tabButtons =
    document.querySelectorAll(".tab-btn");

const tabContents =
    document.querySelectorAll(".tab-content");

tabButtons.forEach(button => {

    button.addEventListener("click", () => {

        const targetTab =
            button.dataset.tab;

        // Remove active

        tabButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        tabContents.forEach(tab =>
            tab.classList.remove("active")
        );

        // Activate clicked

        button.classList.add("active");

        document
            .getElementById(targetTab)
            .classList.add("active");

    });

});


// MOCK TRADE BUTTON

const tradeButton =
    document.querySelector(".gold-btn");

if (tradeButton) {

    tradeButton.addEventListener("click", () => {

        alert(
            "Trade analysis coming in FullCount V2."
        );

    });

}
