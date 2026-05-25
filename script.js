// ELEMENTS

const authScreen =
    document.getElementById("auth-screen");

const leagueScreen =
    document.getElementById("league-connect-screen");

const appContainer =
    document.getElementById("app-container");

const loginBtn =
    document.getElementById("login-btn");

const signupBtn =
    document.getElementById("signup-btn");

const connectBtn =
    document.getElementById("connect-btn");

const platformSelect =
    document.getElementById("platform-select");

const leagueIdInput =
    document.getElementById("league-id");


// PLATFORM DROPDOWN LOGIC

platformSelect.addEventListener(
    "change",
    () => {

        if (
            platformSelect.value !== ""
        ) {

            leagueIdInput.disabled =
                false;

        } else {

            leagueIdInput.disabled =
                true;
        }

    }
);


// LOGIN

loginBtn.addEventListener(
    "click",
    () => {

        const email =
            document.getElementById(
                "email"
            ).value;

        const password =
            document.getElementById(
                "password"
            ).value;

        if (
            email.trim() === "" ||
            password.trim() === ""
        ) {

            alert(
                "Please enter email and password."
            );

            return;
        }

        localStorage.setItem(
            "leagueiqUser",
            email
        );

        authScreen.classList.add(
            "hidden"
        );

        // CHECK IF LEAGUE ALREADY SAVED

        const savedLeague =
            localStorage.getItem(
                "leagueID"
            );

        if (savedLeague) {

            appContainer.classList.remove(
                "hidden"
            );

        } else {

            leagueScreen.classList.remove(
                "hidden"
            );
        }

    }
);


// CREATE ACCOUNT

signupBtn.addEventListener(
    "click",
    () => {

        alert(
            "Account creation system coming in LeagueIQ V2."
        );

    }
);


// CONNECT LEAGUE

connectBtn.addEventListener(
    "click",
    () => {

        const platform =
            platformSelect.value;

        const leagueID =
            leagueIdInput.value;

        if (
            platform === "" ||
            leagueID.trim() === ""
        ) {

            alert(
                "Please select platform and enter League ID."
            );

            return;
        }

        localStorage.setItem(
            "platform",
            platform
        );

        localStorage.setItem(
            "leagueID",
            leagueID
        );

        leagueScreen.classList.add(
            "hidden"
        );

        appContainer.classList.remove(
            "hidden"
        );

    }
);


// AUTO LOGIN

window.addEventListener(
    "load",
    () => {

        const savedUser =
            localStorage.getItem(
                "leagueiqUser"
            );

        const savedLeague =
            localStorage.getItem(
                "leagueID"
            );

        if (
            savedUser &&
            savedLeague
        ) {

            authScreen.classList.add(
                "hidden"
            );

            leagueScreen.classList.add(
                "hidden"
            );

            appContainer.classList.remove(
                "hidden"
            );

        }

    }
);


// TAB SWITCHING

const tabButtons =
    document.querySelectorAll(
        ".tab-btn"
    );

const tabContents =
    document.querySelectorAll(
        ".tab-content"
    );

tabButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const target =
                    button.dataset.tab;

                tabButtons.forEach(
                    btn =>
                    btn.classList.remove(
                        "active"
                    )
                );

                tabContents.forEach(
                    tab =>
                    tab.classList.remove(
                        "active"
                    )
                );

                button.classList.add(
                    "active"
                );

                document
                    .getElementById(
                        target
                    )
                    .classList.add(
                        "active"
                    );

            }
        );

    }
);


// TRADE BUTTON

const tradeBtn =
    document.querySelector(
        ".gold-btn"
    );

if (tradeBtn) {

    tradeBtn.addEventListener(
        "click",
        () => {

            alert(
                "Trade Analyzer coming in LeagueIQ V2."
            );

        }
    );

}
