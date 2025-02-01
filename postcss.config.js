import easyImport from "postcss-easy-import/index.js";
import discardComments from "postcss-discard-comments";
import tailwind from "tailwindcss";
import mergeRules from "postcss-merge-rules";

export default {
    plugins: [
        easyImport,
        tailwind,
        discardComments({ removeAll: true }),
        mergeRules,
    ],
};
