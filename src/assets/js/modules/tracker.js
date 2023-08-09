import Plausible from "plausible-tracker";
import colorScheme from "./_detectColorScheme";

const { trackEvent, trackPageview, enableAutoOutboundTracking } = Plausible({
	domain: "alex.zappa.dev",
	apiHost: "https://alex.zappa.dev",
});

document.addEventListener("DOMContentLoaded", () => {
	trackPageview();
	enableAutoOutboundTracking();

	// track color scheme
	trackEvent("color_scheme", {
		props: {
			system_color_scheme: colorScheme(),
		},
	});

	// track File Download
	document.body.addEventListener("click", (event) => {
		if (
			event.target.tagName === "A" &&
			event.target.href.startsWith("http")
		) {
			const fileExtensions = [
				"pdf",
				"xlsx",
				"docx",
				"txt",
				"rtf",
				"csv",
				"exe",
				"key",
				"pps",
				"ppt",
				"pptx",
				"7z",
				"pkg",
				"rar",
				"gz",
				"zip",
				"avi",
				"mov",
				"mp4",
				"mpeg",
				"wmv",
				"midi",
				"mp3",
				"wav",
				"wma",
			];
			const fileExtension = event.target.href.split(".").pop();
			if (fileExtensions.includes(fileExtension)) {
				trackEvent("File Download", {
					props: {
						url: event.target.href,
					},
				});

				setTimeout(() => {
					location.href = this.href;
				}, 150);

				event.preventDefault();
			}
		}
	});

	// track 404 page
	if (document.body.classList.contains("page-404")) {
		trackEvent("404", {
			props: {
				path: document.location.pathname,
			},
		});

		const funnyCats = document.getElementById("funnyCats");
		let howManyTimesClicked = 0;
		funnyCats.addEventListener("click", () => {
			howManyTimesClicked++;
			trackEvent("reload_funny_cats", {
				props: {
					count: howManyTimesClicked,
				},
			});
		});
	}
});
