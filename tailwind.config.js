/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        surface: "#0A0A0A",
        card: "#111111",
        border: "#1C1C1C",
        accent: "#C8FF00",        // neon lime — CRED signature
        accentBlue: "#00D4FF",
        accentRose: "#FF3A5E",
        muted: "#3A3A3A",
        textPrimary: "#F5F5F5",
        textSecondary: "#888888",
        textDim: "#444444",
      },
      fontFamily: {
        sans: ["SpaceGrotesk-Regular"],
        medium: ["SpaceGrotesk-Medium"],
        bold: ["SpaceGrotesk-Bold"],
        mono: ["JetBrainsMono-Regular"],
      },
      borderRadius: {
        "2xl": "20px",
        "3xl": "28px",
      },
    },
  },
  plugins: [],
};
