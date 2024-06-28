import easyImport from "postcss-easy-import/index.js";
import discardComments from "postcss-discard-comments";
import tailwindNesting from "tailwindcss/nesting/index.js";
import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";
import mergeRules from "postcss-merge-rules";

export default {
    plugins: [
        easyImport,
        tailwindNesting,
        tailwind,
        discardComments({ removeAll: true }),
        autoprefixer,
        mergeRules,
    ],
};
