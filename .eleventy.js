const markdownItAnchor = require("markdown-it-anchor");
const htmlmin = require("html-minifier");

const shortcodes = require("./cfg/_11ty/shortcodes");
const plugins = require("./cfg/_11ty/plugins");
const filters = require("./cfg/_11ty/filters");

module.exports = function (eleventyConfig) {
	Object.keys(plugins).forEach((pluginName) => {
		plugins[pluginName](eleventyConfig);
	});

	Object.keys(shortcodes).forEach((shortcodeName) => {
		shortcodes[shortcodeName](eleventyConfig);
	});

	Object.keys(filters).forEach((filterName) => {
		eleventyConfig.addFilter(filterName, filters[filterName]);
	});

	// Copy the contents of the `public` folder to the output folder
	// For example, `./public/css/` ends up in `_site/css/`
	eleventyConfig.addPassthroughCopy({
		"./src/public/": "/",
		"./src/content/**/*.mp4": "/videos/",
	});

	// Run Eleventy when these files change:
	// https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

	// Watch content images for the image pipeline.
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg,mp4}");

	// Customize Markdown library settings:
	eleventyConfig.amendLibrary("md", (mdLib) => {
		mdLib.use(markdownItAnchor, {
			permalink: markdownItAnchor.permalink.linkInsideHeader({
				placement: "after",
				class: "header-anchor",
				symbol: "#<span class='sr-only'> Anchor link </span>",
				//ariaHidden: true,
			}),
			level: [1, 2, 3, 4],
			slugify: eleventyConfig.getFilter("slugify"),
		});
	});

	// Minify HTML output
	eleventyConfig.addTransform("htmlmin", function (content) {
		// Prior to Eleventy 2.0: use this.outputPath instead
		if (
			process.env.ELEVENTY_ENV === "production" &&
			this.page.outputPath &&
			this.page.outputPath.endsWith(".html")
		) {
			return htmlmin.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true,
			});
		}
		return content;
	});

	// Features to make your build faster (when you need them)

	// If your passthrough copy gets heavy and cumbersome, add this line
	// to emulate the file copy on the dev server. Learn more:
	// https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve

	// eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

	return {
		// Control which files Eleventy will process
		// e.g.: *.md, *.njk, *.html, *.liquid
		templateFormats: ["md", "njk"],

		// Pre-process *.md files with: (default: `liquid`)
		markdownTemplateEngine: "njk",

		// Pre-process *.html files with: (default: `liquid`)
		htmlTemplateEngine: "njk",

		// These are all optional:
		dir: {
			input: "./src/content", // default: "."
			output: "./_site", // default: "_site"
			includes: "../_includes", // default: "_includes"
			layouts: "../_includes/layouts", // default: "_layouts"
			data: "../_data", // default: "_data"
		},

		// -----------------------------------------------------------------
		// Optional items:
		// -----------------------------------------------------------------

		// If your site deploys to a subdirectory, change `pathPrefix`.
		// Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

		// When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
		// it will transform any absolute URLs in your HTML to include this
		// folder name and does **not** affect where things go in the output folder.
		pathPrefix: "/",
	};
};
