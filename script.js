// FIREBASE CONFIG

const firebaseConfig = {
    apiKey: "AIzaSyCcJchr26rP-GeW_6FYa5sXxpHQPT5k0eY",
    authDomain: "leagueiq-d3e04.firebaseapp.com",
    projectId: "leagueiq-d3e04",
    storageBucket: "leagueiq-d3e04.firebasestorage.app",
    messagingSenderId: "938215290237",
    appId: "1:938215290237:web:b9c4dd35e0d53772a88814"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();


// SCREENS

const authScreen =
    document.getElementById("auth-screen");

const signupScreen =
    document.getElementById("signup-screen");

const leagueScreen =
    document.getElementById("league-connect-screen");

const appContainer =
    document.getElementById("app-container");


// BUTTONS

const loginBtn =
    document.getElementById("login-btn");

const gotoSignup =
    document.getElementById("goto-signup");

const backLogin =
    document.getElementById("back-login");

const createAccountBtn =
    document.getElementById(
        "create-account-btn"
    );

const connectBtn =
    document.getElementById("connect-btn");


// LEAGUE

const platformSelect =
    document.getElementById(
        "platform-select"
    );

const leagueIdInput =
    document.getElementById(
        "league-id"
    );


// SIGNUP SCREEN

gotoSignup.addEventListener(
    "click",
    () => {

        authScreen.classList.add(
            "hidden"
        );

        signupScreen.classList.remove(
            "hidden"
        );

    }
);

backLogin.addEventListener(
    "click",
    () => {

        signupScreen.classList.add(
            "hidden"
        );

        authScreen.classList.remove(
            "hidden"
        );

    }
);


// PLATFORM DROPDOWN

platformSelect.addEventListener(
    "change",
    () => {

        leagueIdInput.disabled =
            platformSelect.value === "";

    }
);


// CREATE ACCOUNT

createAccountBtn.addEventListener(
    "click",
    () => {

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
                "experience"
            ).value;

        if (
            !name ||
            !email ||
            !password ||
            !confirm
        ) {

            alert(
                "Please complete all required fields."
            );

            return;
        }

        if (
            password !== confirm
        ) {

            alert(
                "Passwords do not match."
            );

            return;
        }

        auth
        .createUserWithEmailAndPassword(
            email,
            password
        )
        .then(
            userCredential => {

                const uid =
                    userCredential.user.uid;

                return db
                .collection("users")
                .doc(uid)
                .set({

                    name:name,
                    email:email,
                    experience:experience,
                    createdAt:
                    Date.now()

                });

            }
        )
        .then(() => {

            signupScreen.classList.add(
                "hidden"
            );

            leagueScreen.classList.remove(
                "hidden"
            );

        })
        .catch(
            error => {

                alert(
                    error.message
                );

            }
        );

    }
);


// LOGIN

loginBtn.addEventListener(
    "click",
    () => {

        const email =
            document.getElementById(
                "login-email"
            ).value;

        const password =
            document.getElementById(
                "login-password"
            ).value;

        auth
        .signInWithEmailAndPassword(
            email,
            password
        )
        .then(
            userCredential => {

                const uid =
                    userCredential.user.uid;

                db.collection("users")
                .doc(uid)
                .get()
                .then(
                    doc => {

                        if (
                            doc.exists &&
                            doc.data().leagueID
                        ) {

                            authScreen.classList.add(
                                "hidden"
                            );

                            appContainer.classList.remove(
                                "hidden"
                            );

                        } else {

                            authScreen.classList.add(
                                "hidden"
                            );

                            leagueScreen.classList.remove(
                                "hidden"
                            );

                        }

                    }
                );

            }
        )
        .catch(
            error => {

                alert(
                    error.message
                );

            }
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
            leagueID === ""
        ) {

            alert(
                "Select platform and enter League ID."
            );

            return;
        }

        const uid =
            auth.currentUser.uid;

        db.collection("users")
        .doc(uid)
        .update({

            platform:
            platform,

            leagueID:
            leagueID

        })
        .then(() => {

            leagueScreen.classList.add(
                "hidden"
            );

            appContainer.classList.remove(
                "hidden"
            );

        });

    }
);


// AUTO LOGIN

auth.onAuthStateChanged(
    user => {

        if (user) {

            db.collection("users")
            .doc(user.uid)
            .get()
            .then(
                doc => {

                    if (
                        doc.exists &&
                        doc.data().leagueID
                    ) {

                        authScreen.classList.add(
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

                }
            );

        }

    }
);


// TABS

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
