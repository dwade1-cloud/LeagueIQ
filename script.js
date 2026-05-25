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

// INITIALIZE

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

const leagueConnectScreen =
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
    "goto-signup-btn"
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

// SIGN UP

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
            "experience-level"
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

            leagueConnectScreen
            .classList.remove(
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

        // CHECK LEAGUE CONNECT

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

            leagueConnectScreen
            .classList.remove(
                "hidden"
            );

        } else {

            loginScreen.classList.add(
                "hidden"
            );

            signupScreen.classList.add(
                "hidden"
            );

            leagueConnectScreen
            .classList.add(
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

        leagueConnectScreen
        .classList.add(
            "hidden"
        );

        appContainer.classList.add(
            "hidden"
        );

    }

});

// PLATFORM SELECT

const platformSelect =
document.getElementById(
    "platform-select"
);

const leagueInput =
document.getElementById(
    "league-id"
);

platformSelect.addEventListener(
    "change",
    () => {

        if(platformSelect.value){

            leagueInput.disabled =
            false;

        } else {

            leagueInput.disabled =
            true;

        }

    }
);

// CONNECT LEAGUE

document
.getElementById(
    "connect-league-btn"
)
.addEventListener(
    "click",
    async () => {

        const user =
            auth.currentUser;

        const platform =
        platformSelect.value;

        const leagueID =
        leagueInput.value;

        if(
            !platform ||
            !leagueID
        ){

            alert(
                "Please complete all fields."
            );

            return;

        }

        try {

            await db
            .collection("users")
            .doc(user.uid)
            .update({

                platform:platform,
                leagueID:leagueID

            });

            leagueConnectScreen
            .classList.add(
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

// NAVIGATION

const navButtons =
document.querySelectorAll(
    ".nav-btn"
);

const tabSections =
document.querySelectorAll(
    ".tab-section"
);

navButtons.forEach(
(button) => {

    button.addEventListener(
        "click",
        () => {

            navButtons.forEach(
            (btn) => {

                btn.classList.remove(
                    "active"
                );

            });

            tabSections.forEach(
            (tab) => {

                tab.classList.remove(
                    "active-tab"
                );

            });

            button.classList.add(
                "active"
            );

            document
            .getElementById(
                button.dataset.tab
            )
            .classList.add(
                "active-tab"
            );

        }
    );

}
);

// LOGOUT

document
.getElementById(
    "logout-btn"
)
.addEventListener(
    "click",
    async () => {

        await auth.signOut();

    }
);

// STRIPE CHECKOUT

const upgradeBtn =
document.getElementById(
    "upgrade-btn"
);

if(upgradeBtn){

    upgradeBtn.addEventListener(
        "click",
        async () => {

            const user =
                auth.currentUser;

            if(!user){

                alert(
                    "You must be logged in."
                );

                return;

            }

            try {

                const response =
                await fetch(

                    "PASTE_CREATE_CHECKOUT_SESSION_FUNCTION_URL",

                    {

                        method:"POST",

                        headers:{
                            "Content-Type":
                            "application/json"
                        },

                        body:JSON.stringify({

                            uid:user.uid

                        })

                    }

                );

                const data =
                    await response.json();

                window.location.href =
                    data.url;

            } catch(error){

                console.error(error);

                alert(
                    "Stripe checkout failed."
                );

            }

        }
    );

}
