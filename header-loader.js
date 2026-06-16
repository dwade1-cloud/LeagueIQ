console.log("Current User:", auth.currentUser);
const headerContainer =
document.getElementById(
    "header-container"
);

auth.onAuthStateChanged(
    user => {

        const path = window.location.pathname;
        const isDashboardPage = path.includes("dashboard");

        const headerFile =
            isDashboardPage || user
                ? "header-dashboard.html"
                : "header-public.html";

        const scriptFile =
            isDashboardPage || user
                ? "header-dashboard.js"
                : "header-public.js";

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

                script.src = scriptFile;

                document.body.appendChild(
                    script
                );

            }
        );

    }
);