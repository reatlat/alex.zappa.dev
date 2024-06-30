---
title: "Upgrading to Eleventy v3"
desc: "I took some time this week to upgrade my site to the newest version of Eleventy. Here's what I learned."
tags: [code, eleventy]
---

This post inspired by Max's blog about [Upgrading to Eleventy v3](https://mxb.dev/blog/eleventy-v3-update/)

<img src="./11ty-possum.jpg" alt="Eleventy Possum" eleventy:widths="300">

Right after [11tyConf](https://conf.11ty.dev) which was in May of this year, I want to try a new 11ty version and test new image transform plugin.

Although v3.0.0 is still in alpha, and I'm sure it will be released soon enough that we can use the latest version for ~~testing~~ production, at least for personal websites like mine.

## Switching over to ESM

The biggest change in v3 is that Eleventy switches to use [ECMAScript Module Syntax](https://nodejs.org/api/esm.html) (ESM). That aligns it with contemporary standards for JS packages.

In “[Lessons learned moving Eleventy from CommonJS to ESM](https://www.zachleat.com/web/eleventy-v3-esm/)”, Zach explains the motivation for the switch.

Meantime, on projects where I work and worked usually was a mix of ESM and commonJS, and I never really thought too much about switch until now.

### Step 1: A package type changes

I thought it would be all I had to do for the first time, update the `package.json` by adding new property `type` and set value to `module`.

```json
// package.json
{
  "name": "alex.zappa.dev",
  "version": "7.0.0",
  "type": "module",
  // ...
}
```

Well... it was just a start before realizing there are so many other files and scripts I have to update.

### Step 2: update all JS file

Since all JS files are modules now, they need updating as well.

Basically we cant use CommonJS syntax like `module.exports = thing` or `require('thing')` anymore, and we need to replace it with ESM module syntax instead.

In an Eleventy v2 project, you’ll typically have your `eleventy.config.js`, files for filters/shortcodes and global data files that may look something like this:

```js
const plugin = require('plugin-package')
// ...
module.exports = {
    something: plugin({ do: 'something' })
}
```

Using ESM syntax, rewrite these files to look like this:

```js
import plugin from 'plugin-package'
// ...
export default {
    something: plugin({ do: 'something' })
}
```

It was repetitive work, but once done, it's worth every second.

### Step 3: postCSS issues

Since I use postCSS with TailwindCSS in my website, I also have to update postCSS and TailwindCSS config files, this is where I found one small issue with `tailwindcss/nesting` plugin.

Its not ready to be used yet, and cant be imported like most of other plugins.

To solve issue, I found one thread on [github issues](https://github.com/tailwindlabs/tailwindcss/issues/5089), the solution was simple, instead of importing tailwindcss as:

```js
import tailwindNesting from "tailwindcss/nesting";
```

you have to specify which file you looking to import

```js
import tailwindNesting from "tailwindcss/nesting/index.js";
```

### Step 4: Image Transform

[Eleventy image plugin](https://www.11ty.dev/docs/plugins/image/#eleventy-transform) got a new feature to optimize any `<img>` tag on fly using eleventyTransform.

Implementation is simple, and make you code clean, since you no need to use shortcodes for images anymore

```js
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    // which file extensions to process
    extensions: "html",

    // Add any other Image utility options here:

    // optional, output image formats
    formats: ["avif", "webp", "auto"],

    // optional, output dir and url path for images
    outputDir: "./_site/img/",
    urlPath: "/img/",

    // optional, output image widths
    widths: ["auto"],

    // optional, attributes assigned on <img> override these values.
    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
    }
  });
}
```

This code broke my website, because I forgot to update shortcode implementation first.

So to solve this problem I have to add an attribute `eleventy:ignore` to the image shortcode:

```js
import eleventyImage from "@11ty/eleventy-img";

// Only one module.exports per configuration file, please!
export default function (eleventyConfig) {
  eleventyConfig.addShortcode("image", async function (src, alt, sizes) {
    // ...
    let imageAttributes = {
      alt,
      sizes,
      "eleventy:ignore": "",
      loading: "lazy",
      decoding: "async",
    };
    // ...
  });
};
```

And as result it works perfectly fine, but I want to replace most of shortcodes to regular `<img>` tags, and I did it.

## Conclusion

If your project is similar than mine then you can prepare your project to migrate to ESM syntax now, before Eleventy v3 will be released.

Or if you like me, who like to use latest technology in web development, do that a soon as you can.
