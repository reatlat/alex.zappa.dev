/**
 * Add Eleventy shortcodes here
 * https://www.11ty.dev/docs/shortcodes/
 */

const path = require("path");
const eleventyImage = require("@11ty/eleventy-img");


const relativeToInputPath = (inputPath, relativeFilePath) => {
	let split = inputPath.split("/");
	split.pop();
	return path.resolve(split.join(path.sep), relativeFilePath);
}


module.exports = {
	// Eleventy Image shortcode
	// https://www.11ty.dev/docs/plugins/image/
	image: (eleventyConfig) => {
		eleventyConfig.addAsyncShortcode("image", async function imageShortcode(src, alt, widths, classes, sizes) {
			// Full list of formats here: https://www.11ty.dev/docs/plugins/image/#output-formats
			// Warning: Avif can be resource-intensive so take care!
			let formats = ["avif", "webp", "auto"];
			let file = relativeToInputPath(this.page.inputPath, src);
			let metadata = await eleventyImage(file, {
				widths: widths || ["auto"],
				formats,
				// Advanced usage note: `eleventyConfig.dir` works here because we’re using addPlugin.
				outputDir: path.join(eleventyConfig.dir.output, "img"),
			});

			// TODO loading=eager and fetchpriority=high
			let imageAttributes = {
				alt,
				sizes,
				class: classes ? classes + ' rounded drop-shadow-lg' : 'rounded drop-shadow-lg',
				loading: "lazy",
				decoding: "async",
			};

			return eleventyImage.generateHTML(metadata, imageAttributes);
		});
	}
};
