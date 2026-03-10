/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", "Poppins", "sans-serif"],
			},
			colors: {
				faithBlue: "#003A78",
				faithAccent: "#7A0A2A",
				faithSoft: "#F9FAFB",
			},
			borderRadius: {
				xl: "1rem",
				"2xl": "1.5rem",
			},
			keyframes: {
				fadeIn: {
					from: {opacity: 0, transform: "translateY(6px)"},
					to: {opacity: 1, transform: "translateY(0)"},
				},
			},
			animation: {
				fadeIn: "fadeIn .6s ease-out forwards",
			},
		},
	},
	plugins: [],
};
