---
title: How do I find my Bitly OAuth access token?
desc: Learn how to sign up for a Bitly account and generate an access token for the Bitly API. Follow these steps to get started.
date: 2019-01-19
tags: [bitly, oauth, access token]
---

Do you have Bitly account? If not [signup](https://bitly.com/a/sign_up) right now.

If you are looking for start using the Bitly API, you will need your Oauth Access Token. To find your OAuth access token
navigate to the hamburger menu button in the top right-hand corner. From the drop down select ‘Settings’ and then
continue to the ‘Advanced Settings’ tab. Look to the bottom under ‘For Developers’ and click on the OAuth hyperlink.

<img src="./api-key-with-arrow.png" alt="Bitly OAuth Access Token" eleventy:widths="900">

If you need to generate an access token so you can use our API, you can go to <https://bitly.com/a/oauth_apps>, click
“Generic Access Token”,

<img src="./bitly-edit-profile-generic-access-token.png" alt="Bitly Edit Profile Generic Access Token" eleventy:widths="900">

Then enter your password to create the token, and then copy that token into your code or configuration.

Access tokens don’t expire (though you can expire them manually if yours leaks into the wild), so you can use the single
access token as long as you need.

{% signature %}
