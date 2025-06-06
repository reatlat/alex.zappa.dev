// import "./modules/tracker";
import Alpine from "alpinejs";
import intersect from "@alpinejs/intersect";
import dataDOM from "./modules/Alpine.data/DOM";
import "lite-youtube-embed";
import asyncLoadScripts from "./modules/_loadScript";

// The window.Alpine = Alpine bit is optional, but is nice to have for
// freedom and flexibility. Like when tinkering with Alpine from the devtools for example.
window.Alpine = Alpine;

// If you imported Alpine into a bundle, you have to make sure you are registering any
// extension code IN BETWEEN when you import the Alpine global object, and when you
// initialize Alpine by calling Alpine.start().

// Add plugins to Alpine
Alpine.plugin(intersect);

Alpine.data("xDOM", dataDOM);

// Start Alpine when the page is ready.
window.addEventListener("DOMContentLoaded", () => {
    Alpine.start();

    // if .codepen is present, load the embed script
    if (document.querySelector(".codepen")) {
        const codepenObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // load the script
                    asyncLoadScripts(
                        "//cpwebassets.codepen.io/assets/embed/ei.js",
                    );
                    // stop observing
                    codepenObserver.disconnect();
                }
            });
        });
        codepenObserver.observe(document.querySelector(".codepen"));
    }

    // listener for link click with class header-anchor
    document.addEventListener("click", (event) => {
        if (event.target.matches(".header-anchor")) {
            const target = event.target.getAttribute("href");
            // copy the target to the clipboard
            navigator.clipboard.writeText(
                location.origin + location.pathname + target,
            );
        }
    });
});
