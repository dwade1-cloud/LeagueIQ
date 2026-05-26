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

            await auth
            .signInWithEmailAndPassword(
                email,
                password
            );

        } catch(error){

            alert(error.message);

        }

    }
);

// AUTH STATE

auth.onAuthStateChanged(
async (user) => {

    if(user){

        const doc =
        await db
        .collection("users")
        .doc(user.uid)
        .get();

        const userData =
            doc.data();

        // PLAN BADGE

        const planBadge =
        document.getElementById(
            "plan-badge"
        );

        if(
            userData.plan === "pro"
        ){

            planBadge.innerText =
            "PRO PLAN";

            document
            .getElementById(
                "premium-card"
            )
            .style.display =
            "none";

        } else {

            planBadge.innerText =
            "FREE PLAN";

        }

        // CHECK LEAGUE

        if(
            !userData.platform ||
            !userData.leagueID
        ){

            loginScreen.classList.add(
                "hidden"
            );

            signupScreen.classList.add(
                "hidden"
            );

            appContainer.classList.add(
                "hidden"
            );

            leagueScreen.classList.remove(
                "hidden"
            );

        } else {

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

        }

    } else {

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
		leagueIDUnput.value,

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