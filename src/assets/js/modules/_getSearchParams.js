import debugLog from "./_debugLog";

export default (param = false, url = false) => {
    url = url ? url : window.location.href;

    debugLog(`getSearchParams: "${param}" from [${url}]`);

    const vars = {};

    url.replace(location.hash, "").replace(
        /[?&]+([^=&]+)=?([^&]*)?/gi,
        (m, key, value) => {
            vars[key] = value !== void 0 ? value : "";
        },
    );

    if (param) {
        if (vars[param]) {
            return vars[param];
        } else {
            return null;
        }
    }

    return vars;
};
