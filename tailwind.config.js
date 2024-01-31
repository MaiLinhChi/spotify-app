/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {},
        colors: {
            primary: "#1db954",
            white: "#f8fafc",
            dark: "#020617",
            text: "#9ca3af",
        },
    },
    plugins: [],
};
