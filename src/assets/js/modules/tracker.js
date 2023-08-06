import Plausible from "plausible-tracker";
import colorScheme from "./_detectColorScheme";

const { trackEvent, trackPageview } = Plausible({
	domain: "alex.zappa.dev",
	apiHost: "https://alex.zappa.dev",
});

document.addEventListener("DOMContentLoaded", () => {
	trackPageview();

	// track color scheme
	trackEvent("color_scheme", {
		props: {
			system_color_scheme: colorScheme(),
		},
	});

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
