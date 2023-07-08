---
title: Keep Track UTM parameters for HubSpot forms like Cookie Monster
desc: Track UTMs and store them using cookies instead of sessionStorage. Use JavaScript Cookie library and add the code to the website footer.
date: 2021-10-22
tags: [hubspot, utm, tracking, forms]
---

About a week ago, I outlined
step-by-step [how to track UTMs across session](/blog/track-utm-parameters-for-hubspot-forms-like-a-boss/) and
populate HubSpot forms even the visitor
already left the target page and after checking other website pages decided to finish a form and submit application.

This time I will explain how we can do the same with cookies and store UTM parameters for a day, or week, or even more.

The downside of [sessionStorage](/blog/track-utm-parameters-for-hubspot-forms-like-a-boss/) solution is when
visitor close the browser tab, stored cookies will be gone.

## Cookies

> An HTTP cookie (web cookie, browser cookie) is a small piece of data that a server sends to a user’s web browser. The
> browser may store the cookie and send it back to the same server with later requests. Typically, an HTTP cookie is
> used
> to tell if two requests come from the same browser—keeping a user logged in, for example. It remembers stateful
> information for the stateless HTTP protocol.
>
> From *[Web docs | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)*

I don’t want to *“reinvent the wheel”*, so we will use [JavaScript Cookie](https://github.com/js-cookie/js-cookie)
library, and the easiest way to start work with this library get it from [CDNJS.com](https://cdnjs.com/). The snippet we
can get and install
to the footer of the website looks like this:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/js-cookie/2.2.1/js.cookie.min.js" referrerpolicy="no-referrer"></script>
```

Or use the latest version with [UnPKG.com](https://unpkg.com/)

```html
<script src="https://unpkg.com/js-cookie"></script>
```

Next step let’s get the code from [previous post](/blog/track-utm-parameters-for-hubspot-forms-like-a-boss/) and
set them to use cookies instead of sessionStorage

```js
(function ($, w, d, Cookies, GET) {
	// Create object and store UTMs
	var utm = {
		source: GET('utm_source'),
		campaign: GET('utm_campaign'),
		content: GET('utm_content'),
		medium: GET('utm_medium'),
		term: GET('utm_term')
	};
	// Check if one or more UTMs present in URL
	if (utm.source || utm.campaign || utm.content || utm.medium || utm.term) {
		// Set Cookie __utm_params with livetime period 7 days
		Cookies.set('__utm_params', utm, {expires: 7, path: '/'});
	}
	// Check if UTM parameters stored in SessionStorage
	if (Cookies.get('__utm-params')) {
		// Parse UTMs from SessionStorage to JSON
		var storedUTM = JSON.parse(Cookies.get('__utm-params'));
		// Add Event Listener for `onFormReady` event
		w.addEventListener('message', function (e) {
			if (e.data.type === 'hsFormCallback' && e.data.eventName === 'onFormReady') {
				// Find all HubSpot forms on the page
				var scope = $(d).find('form[data-form-id]');
				// Check if UTM parameter exists and populate form hidden input fields
				if (storedUTM.source) {
					scope.find('[name="utm_source"]').val(storedUTM.source).change();
				}
				if (storedUTM.campaign) {
					scope.find('[name="utm_campaign"]').val(storedUTM.campaign).change();
				}
				if (storedUTM.content) {
					scope.find('[name="utm_content"]').val(storedUTM.content).change();
				}
				if (storedUTM.medium) {
					scope.find('[name="utm_medium"]').val(storedUTM.medium).change();
				}
				if (storedUTM.term) {
					scope.find('[name="utm_term"]').val(storedUTM.term).change();
				}
			}
		});
	}
})(jQuery, window, document, Cookies, function (param, url) {
	url = url ? url : window.location.href;
	var vars = {};
	url.replace(location.hash, '').replace(/[?&]+([^=&]+)=?([^&]*)?/gi, function (m, key, value) {
		vars[key] = value !== void 0 ? value : '';
	});
	return typeof vars[param] !== 'undefined' ? vars[param] : '';
})
```

## Installation to HubSpot website

Open Settings > Website(sidebar) > Pages(sidebar) > Templates(tab) > Site footer HTML(section) and paste the final code
to Site footer HTML editor between script tags

```html
<script src="https://unpkg.com/js-cookie"></script>
<script>
	(function(){
	  // do something
	})();
</script>
```

{% image "./hubspot-site-footer-html-editor.png", "", [900] %}
*Final result should look like screenshot*

The same method could be used for any websites(Webflow, WordPress, Wix, Static, etc…) who use HubSpot forms.

{% signature %}
