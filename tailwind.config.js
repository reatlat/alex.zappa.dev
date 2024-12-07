/** @type {import('tailwindcss').Config} */

import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";
import aspectRatio from "@tailwindcss/aspect-ratio";
import safeArea from "tailwindcss-safe-area";
import lineClamp from "@tailwindcss/line-clamp";

export default {
    content: ["./src/**/*.{html,js,njk,md,vue}", "./cfg/_11ty/**/*.js"],
    darkMode: "class",
    theme: {
        extend: {
            borderRadius: {
                DEFAULT: "0.375rem",
            },
            keyframes: {
                blink: {
                    "50%": { opacity: 0 },
                },
            },
            animation: {
                blink: "blink 1.5s steps(1) infinite",
            },
            aspectRatio: {
                auto: "auto",
                box: "1",
                landscape: "4/3",
                portrait: "3/4",
                video: "16/9",
            },
            height: {
                unset: "unset",
            },
            maxWidth: {
                "copy-xs": "25ch",
                "copy-sm": "45ch",
                "copy-md": "55ch",
                "copy-lg": "65ch",
                "copy-xl": "75ch",
                "copy-2xl": "85ch",
            },
            colors: {
                transparent: "transparent",
                current: "currentColor",
                inherit: "inherit",
                white: "#fff",
                black: "#111",
                cursor: {
                    5: "#262626",
                    10: "#292929",
                    50: "#888888",
                    500: "#ffffff",
                    DEFAULT: "#ffffff",
                },
                zenith: {
                    10: "#FEFEFE",
                    50: "#F8F8F8",
                    500: "#f2f2f2",
                    DEFAULT: "#f2f2f2",
                    600: "#1e1e1e",
                    700: "#1a1a1a",
                },
                slate: {
                    10: "#EDEDED",
                    50: "#A6A6A6",
                    500: "#4d4d4d",
                    DEFAULT: "#4d4d4d",
                },
                terminal: {
                    10: "#E7E7E7",
                    50: "#888888",
                    200: "#404040",
                    400: "#222222",
                    500: "#111111",
                    600: "#0f0f0f",
                    700: "#0d0d0d",
                    800: "#0b0b0b",
                    900: "#000000",
                    DEFAULT: "#111111",
                },
                amber: {
                    10: "#FFF8E6",
                    50: "#FFDD80",
                    100: "rgba(255,188,0,1.0)",
                    500: "#ffbc00",
                    DEFAULT: "#ffbc00",
                },
                satori: {
                    10: "#E9F0FB",
                    50: "#90B3EC",
                    100: "#E9F0FB",
                    200: "#a7c3f0",
                    300: "#90B3EC",
                    400: "#3c7be1",
                    500: "#2268d9",
                    DEFAULT: "#2268d9",
                    600: "#1b53ae",
                    700: "#143e82",
                    800: "#0e2a57",
                    900: "#07152b",
                },

                gray: {
                    100: "#dbdbdb",
                    200: "#b8b8b8",
                    300: "#949494",
                    400: "#717171",
                    500: "#4d4d4d",
                    DEFAULT: "#4d4d4d",
                    600: "#3e3e3e",
                    700: "#2e2e2e",
                    800: "#1f1f1f",
                    900: "#111111",
                },
                green: {
                    100: "#dcf5e0",
                    200: "#b9ecc2",
                    300: "#97e2a3",
                    400: "#74d985",
                    500: "#7EE175",
                    DEFAULT: "#7EE175",
                    600: "#5EFA68",
                    // 600: "#59AE52",
                    700: "#317c3d",
                    800: "#205329",
                    900: "#102914",
                },
                red: {
                    100: "#ffe1e1",
                    200: "#ffc4c4",
                    300: "#ffa6a6",
                    400: "#ff8989",
                    500: "#FF6868",
                    DEFAULT: "#FF6868",
                    600: "#cc5656",
                    700: "#BD4848",
                    800: "#662b2b",
                    900: "#331515",
                },
                aspectRatio: {
                    auto: "auto",
                    box: "1",
                    landscape: "4/3",
                    portrait: "3/4",
                    video: "16/9",
                },
                height: {
                    unset: "unset",
                },
                maxWidth: {
                    "copy-xs": "25ch",
                    "copy-sm": "45ch",
                    "copy-md": "55ch",
                    "copy-lg": "65ch",
                    "copy-xl": "75ch",
                    "copy-2xl": "85ch",
                },
            },
        },
    },
    plugins: [
        typography,
        forms,
        aspectRatio,
        safeArea,
        lineClamp,
        ({ addComponents, theme }) => {
            addComponents({
                "#breadcrumbs": {
                    backdropFilter: "saturate(180%)blur(.2rem)",
                },
                "[data-theme=light] .prose": {
                    "--tw-prose-links": "#06c",
                    "--tw-prose-quote-borders": "#06c",
                    "--tw-prose-headings": "#222",
                },
                "[data-theme=dark] .prose": {
                    "--tw-prose-links": "#fbbf24",
                    "--tw-prose-quote-borders": "#fbbf24",
                    "--tw-prose-quotes": "#f2f2f2",
                    "--tw-prose-body": "#f2f2f2",
                    "--tw-prose-headings": "#f2f2f2",
                    "--tw-prose-bold": "#f2f2f2",
                },
                ".btn": {
                    "@apply no-underline": {},
                },
                ".prose": {
                    "@apply text-base md:text-lg": {},
                },
                '.prose :where(a):not(:where([class~="not-prose"] *))': {
                    textDecoration: "none",
                    "@apply hover:underline": {},
                },
                '.prose :where(pre):not(:where([class~="not-prose"] *))': {
                    "--tw-prose-pre-bg": "#1a1a1a",
                },
                'code, code[class*="language-"], pre[class*="language-"]': {
                    fontFamily: "monospace",
                    fontWeight: "400",
                    lineHeight: "1.3",
                    "@apply text-base": {},
                },
                "code:where(:not([class]))": {
                    "@apply !rounded !font-normal !text-current !bg-zenith dark:!bg-zenith-700 px-2 py-1":
                        {},
                },
                ' :not(pre) > code[class*="language-"], pre[class*="language-"]':
                    {
                        "@apply -mx-4 w-screen rounded-none sm:mx-0 sm:w-full sm:rounded":
                            {},
                    },
                "code:where(:not([class]))::before, code:where(:not([class]))::after":
                    {
                        "@apply !content-none": {},
                    },
                ".token.property, .token.tag, .token.constant, .token.symbol, .token.deleted":
                    {
                        fontStyle: "italic",
                    },
                //".language-css .token.selector": {
                //	color: "#ffca03",
                //},
                ':not(pre) > code[class*="language-"], pre[class*="language-"]':
                    {
                        "@apply bg-zenith-700 drop-shadow-lg dark:drop-shadow-none":
                            {},
                    },
                'blockquote > pre[class*="language-"]': {
                    "@apply w-[calc(100%+1rem)] sm:w-full mr-0": {},
                },
                ".prose p": {
                    "@apply text-pretty": {},
                },
                '.prose :where(blockquote p:first-of-type):not(:where([class~="not-prose"] *))::before, .prose :where(blockquote p:last-of-type):not(:where([class~="not-prose"] *))::after':
                    {
                        "@apply hidden": {},
                    },
                ".container": {
                    "@apply px-4 mx-auto": {},
                    maxWidth: "1132px",
                },
                "lite-youtube": {
                    "@apply w-full max-w-3xl mx-auto aspect-video align-middle h-unset":
                        {},
                },
            });
        },
    ],
};
