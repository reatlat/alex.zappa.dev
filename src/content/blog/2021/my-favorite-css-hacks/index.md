---
title: My favorite CSS hacks
desc: Discover CSS hacks and shortcuts, including using box-sizing, selection pseudo-class, caret color for input elements, displaying links when an element has no text value, fitting images to content, detecting dark system mode, hiding images on mobile, using CSS vendor prefixes for different browsers, and utilizing Autoprefixer. Learn these tips and improve your CSS coding skills.
date: 2021-11-29
tags: [featured, css, CSS3, hacks, code]
---

As it is with every coding language, there are several shortcuts or hacks with CSS that allow you to write cleaner code, improve design elements, and save valuable time. Furthermore, you can directly insert these snippets to your site using a code editor. And here is my favorite CSS Hacks.

## Inherit box sizing

The border-box tells the browser to account for any border and padding in the values you specify for an element’s width and height.

```css
html {
	box-sizing: border-box;
}
*, *:before, *:after {
	box-sizing: inherit;
}
```

{% videoImage "./mdn-css-demo-box-sizing.mp4", "dark:invert" %}
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing" rel="noreferrer noopener nofollow">MDN CSS Demo – box-sizing</a>

## Selection pseudo class

Use selection pseudo-class to give a personal touch to text selection on your websites.

{% codepen "ZEXzqgE", { defaultTab: "css,result" } %}

## Input Caret Color

Set the color of the cursor in input elements.

```css
input, textarea {
	caret-color: #ff0000;
}
```

{% codepen "poWzQzX", { defaultTab: "css,result" }  %}

## No value, No problem

Display links when the element has no text value, but the attribute has a link.

```css
a[href^="http"]:empty::before {
    content: attr(href);
}
```

{% codepen "gOxydbR", { defaultTab: "css,result" }  %}

## Fit images to the content

In this simple hack, you can make sure that your images always fit the visitor’s screen, regardless of the device they’re using. More use cases could be found [here](/blog/mobile-friendly-responsive-images-with-css/).

```css
img {
    max-width: 100%;
    height: auto;
}
```

## Detect dark system mode

[When you want a style that applies to users with dark mode turned on](/blog/detect-dark-or-light-system-mode/), add your style inside media query below. If we want the black background and white text for dark mode users, we will type something like this:

```css
@media (prefers-color-scheme: dark) {
    body {
        background-color: #111111;
        color: #FFFFFF;
    }
}
```

## Hide images on mobile

Sometimes we have icons or images that we just don’t want to be seen on the mobile view.

```css
@media only on screen and (max-width: 767px) {
	section .user-img {
		display: none;
	}
}
```

## CSS vendor prefixes by browsers

CSS vendor prefixes, also sometimes known as or CSS browser prefixes, are a way for browser makers to add support for new CSS features before those features are fully supported in all browsers. This may be done during a sort of testing and experimentation period where the browser manufacturer is determining exactly how these new CSS features will be implemented.

The CSS browser prefixes that you can use (each of which is specific to a different browser) are:

- Android: `-webkit-`
- Chrome: `-webkit-`
- Safari: `-webkit-`
- iOS: `-webkit-`
- Firefox: `-moz-`
- Internet Explorer: `-ms-`
- Opera: `-o-`

### Autoprefixer

> The Autoprefixer uses data on the popularity of browsers and support for vendor prefixes by browsers. Based on this information, it arranges and deletes the prefixes. It can help you get prefixes for: animations, transition, transform, grid, flex, flexbox and others.
>
> [https://autoprefixer.github.io/](https://autoprefixer.github.io/)


To make sure your CSS works well on the rest of browsers, always use Autoprefixer, here ho is it looks like:

{% image "./autoprefixer-css-online.png", "", [900], "dark:invert" %}

## Conclusion

There are countless tricks we can use with CSS3. Which is your favorite? [Comment down below.](#comments)

{% signature %}
