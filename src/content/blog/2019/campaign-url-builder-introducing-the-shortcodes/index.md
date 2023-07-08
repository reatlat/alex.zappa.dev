---
title: Campaign URL Builder Introducing the Shortcodes
desc: Introducing the first release of shortcodes for Campaign URL Builder plugin. Shortcodes can be customized with various attributes and can generate forms on the front-end. Bitly API key is required. Shortcodes can be styled and have optional parameters. Examples provided for simple, advanced, and PHP usage.
date: 2019-01-19
tags: [wordpress, plugin, 'campaign-url-builder', shortcodes]
---

Today, I’m excited to introduce the first release of shortcodes
for [Campaign URL Builder](/blog/wp-plugin-campaign-url-builder/) plugin.

Shortcode settings moved to new tab **Shortcode** on top tabs menu.

{% image "./campaign-url-builder-shortcode-settings.png", "", [900] %}

By default, shortcodes disabled, also if you use bulletin API key shortcodes also will be disabled.

Please use your API key for Bitly. How to find your Bitly API key, [read here](/blog/how-do-i-find-my-bitly-oauth-access-token/).

{% image "./campaign-url-builder-introducing-the-shortcodes.png", "", [900] %}
*This is how default shortcode generate a form on front-end*

## How to use shortcode

1. Setup your [Bitly API Key](/blog/how-do-i-find-my-bitly-oauth-access-token/).
2. Enable Shotcode toggle in plugin settings.
3. (optional) Enable shortcode for Anonymous visitor.
4. Place shortcode (Campaign-URL-Builder) on target page.

### Styling

By default, shortcode styles have very basic styles, you can disable it and create your styles.

### Shortcode attributes

Attributes is optional and for your choice.

- wrapper=”anyCssClass additionalClass”
- wrapper-inline-style=”background: #ff0000; padding: 10px”
- form=”anyCssClass additionalClass”
- form-inline-style=”background: #ffff00; padding: 15px”
- input-class=”anyCssClass additionalClass”
- type=”preset”
- campaign_page=”https://alex.zappa.dev/wp-plugin-campaign-url-builder/”
- utm_source=”reatlat_homepage”
- utm_medium=”blogpost”
- utm_campaign=”Introducing shortcodes”
- utm_term=”serach key words”
- utm_content=”some content”
- custom_parameters=”key=value|key2=value|key3=value3″
- hidden=”utm_source,utm_medium,utm_campaign”

This is stock example, you can replace it like you want.

### Important to know.

If you use `type=”preset”` all fields which already have presented attributes will have read only attribute, and front end users can’t replace it.

The `custom_parameters`, you can pass only 3 couples. For example `my_param=someValue`. please separate couples by Vertical Bar.

The attribute `hidden` can contain the name of fields which you want to hide from front-end. For example, `hidden=”utm_source,utm_medium,utm_campaign”` in this case 3 input fields will be hidden for users.

Very soon, I will prepare the visual shortcode generator.

### Examples

Simple example

```php
[Campaign-URL-Builder]
```

Advanced example

```php
[Campaign-URL-Builder wrapper="MegaWrapperClass" wrapper-inline-style="background:#ccc;padding:15px;" form="MegaFormClass" form-inline-style="padding:10px; background:#c19393" campaign_page="https://alex.zappa.dev" utm_source="" utm_medium="" utm_campaign="" utm_term="" utm_content=""]
```

PHP example

```php
<?php echo do_shortcode('[Campaign-URL-Builder]'); ?>
```

{% signature %}
