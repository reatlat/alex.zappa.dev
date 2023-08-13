/**
 * Add Eleventy plugins here
 * https://www.11ty.dev/docs/plugins/
 */

module.exports = {
    MetaGenerator: (eleventyConfig) => {
        const plugin = require("eleventy-plugin-metagen");
        eleventyConfig.addPlugin(plugin);
    },

    Feather: (eleventyConfig) => {
        const plugin = require("eleventy-plugin-feathericons");
        eleventyConfig.addPlugin(plugin);
    },

    // Drafts support
    DraftsSupport: (eleventyConfig) => {
        const plugin = require("./drafts.js");
        eleventyConfig.addPlugin(plugin);
    },

    // Official plugins
    RSS: (eleventyConfig) => {
        const plugin = require("@11ty/eleventy-plugin-rss");
        eleventyConfig.addPlugin(plugin);
    },

    SyntaxHighlight: (eleventyConfig) => {
        const plugin = require("@11ty/eleventy-plugin-syntaxhighlight");
        eleventyConfig.addPlugin(plugin, { preAttributes: { tabindex: 0 } });
    },

    Navigation: (eleventyConfig) => {
        const plugin = require("@11ty/eleventy-navigation");
        eleventyConfig.addPlugin(plugin);
    },

    EleventyHtmlBase: (eleventyConfig) => {
        const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
        eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
    },
};
