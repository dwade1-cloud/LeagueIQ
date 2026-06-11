console.log("Current User:", auth.currentUser);
const headerContainer =
document.getElementById(
    "header-container"
);

auth.onAuthStateChanged(
    user => {

        const headerFile =
        user
        ? "header-dashboard.html"
        : "header-public.html";

        fetch(
            headerFile
        )
        .then(
            response =>
            response.text()
        )
        .then(
            html => {

                headerContainer.innerHTML =
                html;

                const script =
                document.createElement(
                    "script"
                );

                script.src =
                user
                ? "header-dashboard.js"
                : "header-public.js";

                document.body.appendChild(
                    script
                );

            }
        );

    }
);