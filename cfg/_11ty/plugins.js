/**
 * Add Eleventy plugins here
 * https://www.11ty.dev/docs/plugins/
 */
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import pluginMetagen from "eleventy-plugin-metagen";
import pluginPhosphorIcons from "eleventy-plugin-phosphoricons";
import pluginSpeculationRules from "eleventy-plugin-speculation-rules";
import pluginRSS from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

export default {
    // Drafts support
    DraftsSupport: (eleventyConfig) => {
        // When `permalink` is false, the file is not written to disk
        eleventyConfig.addGlobalData("eleventyComputed.permalink", function () {
            return (data) => {
                // Always skip during non-watch/serve builds
                if (data.draft && !process.env.BUILD_DRAFTS) {
                    return false;
                }

                return data.permalink;
            };
        });

        // When `eleventyExcludeFromCollections` is true, the file is not included in any collections
        eleventyConfig.addGlobalData(
            "eleventyComputed.eleventyExcludeFromCollections",
            function () {
                return (data) => {
                    // Always exclude from non-watch/serve builds
                    if (data.draft && !process.env.BUILD_DRAFTS) {
                        return true;
                    }
                    return data.eleventyExcludeFromCollections;
                };
            },
        );

        eleventyConfig.on("eleventy.before", ({ runMode }) => {
            // Set the environment variable
            if (runMode === "serve" || runMode === "watch") {
                process.env.BUILD_DRAFTS = true;
            }
        });
    },

    MetaGenerator: (eleventyConfig) => {
        eleventyConfig.addPlugin(pluginMetagen);
    },

    PhosphorIcons: (eleventyConfig) => {
        eleventyConfig.addPlugin(pluginPhosphorIcons);
    },

    SpeculationRules: (eleventyConfig) => {
        eleventyConfig.addPlugin(pluginSpeculationRules);
    },

    // Official plugins
    RSS: (eleventyConfig) => {
        eleventyConfig.addPlugin(pluginRSS);
    },

    SyntaxHighlight: (eleventyConfig) => {
        eleventyConfig.addPlugin(pluginSyntaxHighlight, {
            preAttributes: { tabindex: 0 },
        });
    },

    EleventyHtmlBase: (eleventyConfig) => {
        eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
    },
};
