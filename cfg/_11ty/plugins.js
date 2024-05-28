/**
 * Add Eleventy plugins here
 * https://www.11ty.dev/docs/plugins/
 */

module.exports = {
    MetaGenerator: (eleventyConfig) => {
        const plugin = require("eleventy-plugin-metagen");
        eleventyConfig.addPlugin(plugin);
    },

    PhosphorIcons: (eleventyConfig) => {
        const plugin = require("eleventy-plugin-phosphoricons");
        eleventyConfig.addPlugin(plugin);
    },

    SpeculationRules: (eleventyConfig) => {
        const plugin = require("eleventy-plugin-speculation-rules");
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
