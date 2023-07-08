---
title: Mobile friendly Responsive images with CSS
desc: Learn how to make responsive images in HTML and CSS. Discover how to prevent images from going outside the container. Find solutions for WordPress and HubSpot.
date: 2021-10-27
tags: [css, responsive-images]
---

The term *“responsive images”* has come to mean *“responsive images in HTML”*, in other words, the ```srcset``` and `sizes`
attribute for `<img>` and the `<picture>` element. But today I want to talk about a common issue, when image go outside
container.

## srcset in CSS

In HTML, srcset is like this:

```html
<img srcset="
  examples/images/image-384.jpg 1x,
  examples/images/image-768.jpg 2x
" alt="[…]">
```

And this is good and correct way we know, but what we can do when image goes outside container even they have `srcset`
attribute?

Here is example:

{% image "./responsive-images-issue.png", "", [900] %}
*On screenshot, you can see classic issue with blogs on WordPress or HubSpot*

## CSS and responsive images

We must ensure the image is fluid, but up to a limit! Solution: the CSS max-width rule. By this rule, we will indicate
the image width in pixels, at the most, 100% of the width of the container. Here is example:

```css
img {
	max-width: 100%;
	height: auto;
}
```

## WordPress and responsive images

For WordPress by adding code below to `style.css` file in theme directory:

```css
.entry-content img,
.entry-summary img,
.comment-content img,
.widget img,
.wp-caption {
	max-with: 100%;
	height: auto;
}
```

## HubSpot and responsive images

For HubSpot: Open Settings > Website(sidebar) > Pages(sidebar) > Templates(tab) > Site head HTML(section) and paste the
final code to Site head HTML editor:

```html
<style>
	.body-wrapper img {
		max-with: 100%;
		height: auto;
	}
</style>
```

This is it, it should resolve the issue with oversized images. Here is example on CodePen, how its work:

{% codepen "bGrBJLy", { height: 500 } %}

This is it! Hope my post have been helpful, stay safe!

{% signature %}

