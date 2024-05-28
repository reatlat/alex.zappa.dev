import { isbot } from "isbot";
import Plausible from "plausible-tracker";
import colorScheme from "./_detectColorScheme";

const { trackEvent, trackPageview, enableAutoOutboundTracking } = Plausible({
    domain: "alex.zappa.dev",
    apiHost: "https://firebird.beastful.org/api/event",
});

const eventProps = {
    title: document.title,
    url: location.href,
    path: location.pathname,
    referrer: document.referrer,
    prefersColorScheme: colorScheme(),
    userAgent: navigator.userAgent,
    deviceWidth: window.innerWidth,
};

document.addEventListener("DOMContentLoaded", () => {
    // don't track bots
    if (isbot(navigator.userAgent)) return;

    // track page view
    trackPageview(
        {},
        {
            props: eventProps,
        },
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

    const youTubeVideos = document.querySelectorAll("lite-youtube");

    // track YouTube video views
    youTubeVideos.forEach((video) => {
        video.addEventListener("click", () => {
            trackEvent("YouTube Video", {
                props: {
                    videoId: video.getAttribute("videoid"),
                },
            });
        });
    });

    // track engagement with scroll depth
    let scrollDepth = 0;

    window.addEventListener("scroll", () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const scrollTop = window.scrollY;
        const scrollPercentage =
            (scrollTop / (scrollHeight - clientHeight)) * 100;
        scrollDepth = Math.max(scrollDepth, scrollPercentage);

        const depthMarkers = [25, 50, 75, 90];
        for (let marker of depthMarkers) {
            if (scrollDepth > marker) {
                trackEvent("Scroll Depth", {
                    props: {
                        depth: `${marker === 90 ? 100 : marker}%`,
                    },
                });
            }
        }
    });

    // track time on page
    let timeOnPage = 0;
    let timeOnPageInterval = setInterval(() => {
        timeOnPage += 1;
    }, 1000);

    const timeMarkers = [20, 40, 60, 90, 120];
    for (let marker of timeMarkers) {
        setTimeout(() => {
            trackEvent("Time on Page", {
                props: {
                    time: `${marker} seconds`,
                },
            });
        }, marker * 1000);
    }

    window.addEventListener("beforeunload", () => {
        clearInterval(timeOnPageInterval);
        trackEvent("Time on Page", {
            props: {
                time: timeOnPage,
            },
        });
    });

    // track 404 page
    if (document.body.classList.contains("page-404")) {
        trackEvent("404", {
            props: eventProps,
        });
    }
});
