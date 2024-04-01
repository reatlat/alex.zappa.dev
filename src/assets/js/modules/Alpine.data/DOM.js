import debugLog from "../_debugLog";
import loadScript from "../_loadScript";
import getSearchParams from "../_getSearchParams";

export default () => {
    return {
        theme: {
            dark: true,
            name: "dark",
        },

        debugLog: (...args) => debugLog(...args),

        _GET: (param = false, url = false) => getSearchParams(param, url),

        loadScript: (src, loading = "defer", callback) =>
            loadScript(src, loading, callback),

        getThemeName() {
            if (localStorage.getItem("theme")) {
                this.theme.name = localStorage.getItem("theme");
                this.theme.dark = this.theme.name === "dark";
            } else if (
                window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: dark)").matches
            ) {
                this.theme.name = "dark";
                this.theme.dark = true;
            }

            return this.theme.dark ? "dark" : "light";
        },

        toggleTheme() {
            this.theme.dark = !this.theme.dark;
            this.theme.name = this.theme.dark ? "dark" : "light";
            localStorage.setItem("theme", this.theme.name);
            document.documentElement.setAttribute(
                "data-theme",
                this.theme.name
            );
        },

        init() {
            debugLog("AlpineJS DOM init");
            document.documentElement.classList.remove("dark");
            document.documentElement.setAttribute(
                "data-theme",
                this.getThemeName()
            );
        },
    };
};
