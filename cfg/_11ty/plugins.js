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
import { eleventyImageTransformPlugin as pluginImageTransform } from "@11ty/eleventy-img";

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

    ImageTransform: (eleventyConfig) => {
        // Image optimization: https://www.11ty.dev/docs/plugins/image/#eleventy-transform
        eleventyConfig.addPlugin(pluginImageTransform, {
            // File extensions to process in _site folder
            extensions: "html",

            // Output formats for each image.
            formats: ["avif", "webp", "auto"],

            outputDir: "./_site/img/",
            urlPath: "/img/",

            // optional, output image widths
            widths: ["auto"],

            defaultAttributes: {
                // e.g. <img loading decoding> assigned on the HTML tag will override these values.
                loading: "lazy",
                decoding: "async",
                class: "mx-auto rounded drop-shadow-lg",
            },
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
