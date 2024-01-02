import isbot from "isbot";
import Plausible from "plausible-tracker";
import colorScheme from "./_detectColorScheme";

const { trackEvent, trackPageview, enableAutoOutboundTracking } = Plausible({
    domain: "alex.zappa.dev",
    apiHost: "https://plausible.zappa.dev",
});

document.addEventListener("DOMContentLoaded", () => {
    // don't track bots
    if (isbot(navigator.userAgent)) return;

    // track page view
    trackPageview(
        {},
        {
            props: {
                title: document.title,
                url: location.href,
                path: location.pathname,
                referrer: document.referrer,
                prefersColorScheme: colorScheme(),
                userAgent: navigator.userAgent,
                deviceWidth: window.innerWidth,
            },
        }
    );

    enableAutoOutboundTracking();

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
                title: document.title,
                url: location.href,
                path: location.pathname,
                referrer: document.referrer,
                prefersColorScheme: colorScheme(),
                userAgent: navigator.userAgent,
                deviceWidth: window.innerWidth,
            },
        });

        const funnyCats = document.getElementById("funnyCats");
        let howManyTimesClicked = 0;
        funnyCats.addEventListener("click", () => {
            howManyTimesClicked++;
            trackEvent("reloadFunnyCats", {
                props: {
                    count: howManyTimesClicked,
                },
            });
        });
    }
});
