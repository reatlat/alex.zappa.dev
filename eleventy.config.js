import markdownItAnchor from "markdown-it-anchor";
import {minify} from "html-minifier";
import yaml from "js-yaml";
import slugify from "slugify";
import path from "path";
import {EleventyHtmlBasePlugin} from "@11ty/eleventy";
import eleventyImage from "@11ty/eleventy-img";
import {eleventyImageTransformPlugin as pluginImageTransform} from "@11ty/eleventy-img";
import pluginPhosphorIcons from "eleventy-plugin-phosphoricons";
import pluginSpeculationRules from "eleventy-plugin-speculation-rules";
import pluginRSS from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import {DateTime} from "luxon";


const slugifyOptions = {
    lower: true,       // convert to lower case
};

const relativeToInputPath = (inputPath, relativeFilePath) => {
    let split = inputPath.split("/");
    split.pop();

    let relativePath = path.resolve(split.join(path.sep), relativeFilePath);

    if (relativeFilePath.startsWith("/")) {
        relativePath = path.resolve("./src/assets" + relativeFilePath);
    }

    return relativePath;
};

const findYouTubeVideoId = (url) => {
    const regex =
        /(?<=v=)[a-zA-Z0-9-]+(?=&)|(?<=v\/)[^&\n]+(?=\?)|(?<=v=)[^&\n]+|(?<=youtu.be\/|www.youtube.com\/embed\/)[^&\n]+/;
    const matches = url.match(regex);
    return matches ? matches[0] : "";
};


export default async function (eleventyConfig) {


    // Eleventy before hook
    // ------------------------------------------------------------
    eleventyConfig.on("eleventy.before", ({runMode}) => {
        // Set the environment variable
        if (runMode === "serve" || runMode === "watch") {
            process.env.BUILD_DRAFTS = true;
        }
    });



    // Add data extensions
    // ------------------------------------------------------------
    eleventyConfig.addDataExtension("yaml", (contents) =>
        yaml.load(contents),
    );



    // Add plugins
    // ------------------------------------------------------------

    // Image pipeline
    eleventyConfig.addPlugin(pluginImageTransform, {
        extensions: "html",
        formats: ["avif", "webp", "auto"],
        outputDir: "./_site/img/",
        urlPath: "/img/",
        widths: ["auto"],
        defaultAttributes: {
            loading: "lazy",
            decoding: "async",
            class: "mx-auto rounded drop-shadow-lg",
        }
    });

    // PhosphorIcons
    eleventyConfig.addPlugin(pluginPhosphorIcons);

    // SpeculationRules
    eleventyConfig.addPlugin(pluginSpeculationRules);

    // EleventyHtmlBase
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

    // RSS Feed
    eleventyConfig.addPlugin(pluginRSS);

    // SyntaxHighlight
    eleventyConfig.addPlugin(pluginSyntaxHighlight, {
        preAttributes: {tabindex: 0},
    });



    // Drafts Support
    // ------------------------------------------------------------

    // When `permalink` is false, the file is not written to disk
    eleventyConfig.addGlobalData("eleventyComputed.permalink", function () {
        return (data) => {
            if (data.draft && !process.env.BUILD_DRAFTS) {
                return false;
            }
            return data.permalink;
        };
    });

    // When `eleventyExcludeFromCollections` is true, the file is not included in any collections
    eleventyConfig.addGlobalData("eleventyComputed.eleventyExcludeFromCollections", function () {
        return (data) => {
            if (data.draft && !process.env.BUILD_DRAFTS) {
                return true;
            }
            return data.eleventyExcludeFromCollections;
        };
    });



    // Add shortcodes
    // ------------------------------------------------------------

    // year - Shortcode to get the current year
    eleventyConfig.addShortcode("year", function yearShortcode() {
        return new Date().getFullYear();
    });

    // signature - Shortcode to add a signature
    eleventyConfig.addShortcode("signature", function signatureShortcode(type) {
        switch (type) {
            case "name":
                return "Alex Zappa";
            case "post":
            default:
                return `<p>May the 4th be with you,<br/>Alex</p>`;
        }
    });

    // video - Shortcode to embed videos
    eleventyConfig.addShortcode("video", function videoShortcode(src, poster, classes) {
        return `<video class="${classes}" poster="${poster}" controls><source src="${src}" type="video/mp4"></video>`;
    });

    // videoImage - Shortcode to embed videos as images
    eleventyConfig.addShortcode("videoImage", function videoImageShortcode(src, classes) {
        if (src.startsWith("./")) {
            src = "/videos/" + src.slice(2);
        }
        classes = classes
            ? classes + " w-full h-auto"
            : "w-full h-auto";
        return `<video class="${classes}" autoplay="" loop="" muted="" playsinlin="" src="${src}"></video>`;
    });

    // youTube - Shortcode to embed YouTube videos
    eleventyConfig.addShortcode("youTube", function youTubeShortcode(videoId, videoTitle = "YouTube video") {
        if (videoId.startsWith("https://")) {
            videoId = findYouTubeVideoId(videoId);
        }
        return `<lite-youtube x-on:click.stop videoid="${videoId}" class="mx-auto rounded drop-shadow-lg" style="background-image: url('https://i.ytimg.com/vi/${videoId}/hqdefault.jpg');"></lite-youtube>`;
    });

    // codepen - Shortcode to embed CodePen
    eleventyConfig.addShortcode("codepen", function codepenShortcode(code, args = {}) {
        const defaults = {
            user: "reatlat",
            theme: "1",
            height: "300",
            defaultTab: "result",
        };
        const {user, theme, height, defaultTab} = {
            ...defaults,
            ...args,
        };
        return `
            <p class="codepen rounded drop-shadow-lg dark:drop-shadow-none flex items-center justify-center border border-solid dark:border-zinc-700 p-4" data-height="${height}" data-theme-id="${theme}" data-default-tab="${defaultTab}" data-slug-hash="${code}" data-user="${user}" style="height: ${height}px;">
              <span>See the Pen <a href="https://codepen.io/reatlat/pen/${code}">
              Selection pseudo class</a> by Alex Zappa (<a href="https://codepen.io/reatlat">@reatlat</a>)
              on <a href="https://codepen.io">CodePen</a>.</span>
            </p>`;
    });

    // image - Shortcode to generate responsive images
    eleventyConfig.addAsyncShortcode("image", async function imageShortcode(src, alt, widths, classes, sizes) {
        let formats = ["avif", "webp", "auto"];
        let file = relativeToInputPath(this.page.inputPath, src);
        let metadata = await eleventyImage(file, {
            widths: widths || ["auto"],
            formats,
            outputDir: path.join(eleventyConfig.dir.output, "img"),
        });
        if (!alt || !alt.length) {
            alt = path.basename(src, path.extname(src));
        }
        let imageAttributes = {
            alt,
            sizes,
            "eleventy:ignore": "",
            class: classes
                ? classes + " rounded drop-shadow-lg"
                : "mx-auto rounded drop-shadow-lg",
            loading: "lazy",
            decoding: "async",
        };
        return eleventyImage.generateHTML(metadata, imageAttributes);
    });

    // ogImageSource - Shortcode to generate Open Graph image source
    eleventyConfig.addShortcode("ogImageSource", function ({url}) {
        url = url ? slugify(url.replace(/\//g, " "), slugifyOptions).trim() : 'default-og-image';
        if (url.includes("404.html")) {
            url = "default-og-image";
        }
        return `/img/og/${url || "default-og-image"}.png`;
    });

    // ogImagesJSON - Shortcode to generate JSON for all pages for Open Graph image generation
    eleventyConfig.addShortcode("ogImagesJSON", function (allCollections) {
        let returnJson = [];
        allCollections.forEach((item) => {
            let title = (item.data || {}).title || "";
            if (title.startsWith("Tagged: ")) {
                title = title.replace("Tagged: ", "Blogs tagged with ");
            }
            const url = (item.page || {}).url || "";
            if (title && url) {
                returnJson.push({
                    title: item.data.title,
                    slug: slugify(item.page.url.replace(/\//g, " "), slugifyOptions)
                });
            }
        });
        return JSON.stringify(returnJson);
    });



    // Add Custom Collections
    // ------------------------------------------------------------
    eleventyConfig.addCollection("projects", (collection) => {
        return collection.getFilteredByTag("projects");
    });

    eleventyConfig.addCollection("tools", (collection) => {
        return collection.getFilteredByTag("tools");
    });


    // Add filters
    // ------------------------------------------------------------

    // getPostYears - Filter to get all the years of the posts
    eleventyConfig.addFilter("getPostYears", (collection) => {
        let years = new Set();
        for (let item of collection) {
            years.add(item.date.getFullYear());
        }
        return Array.from(years);
    });

    // postsByYear - Filter to get all the posts by year
    eleventyConfig.addFilter("postsByYear", (collection, year) => {
        return collection.filter((item) => item.date.getFullYear() === year);
    });

    // filterTagList - Filter to filter out tags
    eleventyConfig.addFilter("filterTagList", (tags) => {
        tags = tags.map((tag) => tag.toLowerCase());
        tags = [...new Set(tags)];
        return (tags || []).filter(tag => ["all", "nav", "tools", "post", "posts", "projects", "featured"].indexOf(tag) === -1,);
    });

    // getAllTags - Filter to get all the tags used in a collection
    eleventyConfig.addFilter("getAllTags", (collection) => {
        let tagSet = new Set();
        for (let item of collection) {
            (item.data.tags || []).forEach((tag) => tagSet.add(tag));
        }
        tagSet = new Set([...tagSet].map((tag) => tag.toLowerCase()));
        tagSet = new Set([...tagSet]);
        return Array.from(tagSet);
    });

    // includes - Filter to check if a string includes another string
    eleventyConfig.addFilter("includes", (haystack, needle) => {
        if (typeof haystack !== "string") return false;
        return haystack.includes(needle);
    });

    // head - Filter to get the first `n` elements of a collection
    eleventyConfig.addFilter("head", (array, n) => {
        if (!Array.isArray(array) || array.length === 0) return [];
        return n < 0 ? array.slice(n) : array.slice(0, n);
    });

    // htmlDateString - Filter to format a date as a string
    eleventyConfig.addFilter("htmlDateString", (dateObj) => {
        return DateTime.fromJSDate(dateObj, {zone: "utc"}).toFormat("yyyy-LL-dd");
    });

    // readableDate - Filter to format a date as a string
    eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
        return DateTime.fromJSDate(dateObj, {zone: zone || "utc"}).toFormat(format || "dd LLLL yyyy");
    });



    // Copy the contents of the `public` folder to the output folder
    // ------------------------------------------------------------
    eleventyConfig.addPassthroughCopy({
        "./src/public/": "/",
        "./src/content/**/*.mp4": "/videos/",
    });



    // Watch content images for the image pipeline.
    // ------------------------------------------------------------
    eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg,mp4}");



    // Customize Markdown library settings:
    // ------------------------------------------------------------
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
    // ------------------------------------------------------------
    eleventyConfig.addTransform("htmlmin", function (content) {
        // Prior to Eleventy 2.0: use this.outputPath instead
        if (
            process.env.ELEVENTY_ENV === "production" &&
            this.page.outputPath &&
            this.page.outputPath.endsWith(".html")
        ) {
            return minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true,
            });
        }
        return content;
    });



    // Add Layouts
    // ------------------------------------------------------------
    eleventyConfig.addLayoutAlias("base", "base.njk");
    eleventyConfig.addLayoutAlias("nada", "nada.njk");
    eleventyConfig.addLayoutAlias("post", "post.njk");
    eleventyConfig.addLayoutAlias("prose", "prose.njk");
    eleventyConfig.addLayoutAlias("tool", "tool.njk");



    // Eleventy configuration
    // ------------------------------------------------------------
    return {
        templateFormats: ["md", "njk"],
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dir: {
            input: "./src/content", // default: "."
            output: "./_site", // default: "_site"
            includes: "../_includes", // default: "_includes"
            layouts: "../_includes/layouts", // default: "_layouts"
            data: "../_data", // default: "_data"
        },
        pathPrefix: "/",
    };
}
