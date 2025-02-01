import twPostcss from "@tailwindcss/postcss";
import easyImport from "postcss-easy-import/index.js";
import discardComments from "postcss-discard-comments";
import mergeRules from "postcss-merge-rules";

export default {
    plugins: [
        twPostcss,
        easyImport,
        discardComments({ removeAll: true }),
        mergeRules,
    ],
};
