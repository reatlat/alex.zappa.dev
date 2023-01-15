/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
	content: [
		"./src/**/*.{html,js,njk,md,vue}",
	],
	theme: {
		extend: {
			keyframes: {
				blink: {
					'50%': { opacity: 0 },
				}
			},
			animation: {
				'blink': 'blink 1.5s steps(1) infinite',
			},
			colors: {
				transparent: "transparent",
				current: "currentColor",
				inherit: "inherit",
				white: "#fff",
				black: "#111",
				terminal: "#000",
				cursor: "#5EFA68",
			},
			aspectRatio: {
				auto: "auto",
				box: "1",
				landscape: "4/3",
				portrait: "3/4",
				video: "16/9"
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
	plugins: [
		require("daisyui"),
		require("@tailwindcss/typography"),
		require("@tailwindcss/aspect-ratio"),
		require("tailwindcss-safe-area"),
		require("@tailwindcss/line-clamp"),
		({addComponents, theme}) => {
			addComponents({
				"#breadcrumbs": {
					backdropFilter: "saturate(180%)blur(.2rem)",
				},
				"[data-theme=light] .prose": {
					"--tw-prose-links": "#06c",
				},
				"[data-theme=dark] .prose": {
					"--tw-prose-links": "#fbbf24",
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
				".container": {
					"@apply px-4 mx-auto": {},
					maxWidth: "1132px",
				},
			});
		},
	],
	daisyui: {
		// themes: false, // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
		themes: [
			{
				light: {
					...require('daisyui/src/theming/themes')['[data-theme=light]'],
					primary: colors.blue[500],
					secondary: colors.blue[700],
				}
			},
			{
				dark: {
					...require('daisyui/src/theming/themes')['[data-theme=dark]'],
					primary: colors.amber[500],
					"primary-content": "#ffffff",
					secondary: colors.amber[700],
					"secondary-content": "#ffffff",
					accent: "#1FB2A5",
					"accent-content": "#ffffff",
					neutral: "#2a323c",
					"neutral-focus": "#242b33",
					"neutral-content": "#A6ADBB",
					"base-100": "#222222",
					"base-200": "#1a1a1a",
					"base-300": "#1e1e1e",
					"base-content": "#f2f2f2"
				}
			},
		],
		darkTheme: "dark", // name of one of the included themes for dark mode
		base: true, // applies background color and foreground color for root element by default
		styled: true, // include daisyUI colors and design decisions for all components
		utils: true, // adds responsive and modifier utility classes
		rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
		prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
		logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
	},
}
