import yaml from "js-yaml";
export default {
    yamlAsData: function (eleventyConfig) {
        eleventyConfig.addDataExtension("yaml", (contents) =>
            yaml.load(contents),
        );
    },
};
