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

        toggleTheme() {
            this.theme.dark = !this.theme.dark;
            localStorage.setItem("theme", this.theme.dark ? "dark" : "light");
            document.documentElement.classList.toggle("dark", this.theme.dark);
        },

        uuid() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
                /[xy]/g,
                (c) => {
                    const r = (Math.random() * 16) | 0;
                    const v = c === "x" ? r : (r & 0x3) | 0x8;
                    return v.toString(16);
                },
            );
        },

        init() {
            debugLog("AlpineJS DOM init");
            this.theme.dark = localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
        },
    };
};
