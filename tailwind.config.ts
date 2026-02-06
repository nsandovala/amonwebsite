import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#F7F7F7", // Snow white matte
                foreground: "#0A0A0A", // Soft black
                primary: "#0A0A0A",
                accent: {
                    DEFAULT: "#00FFC6", // Neon Green
                    glow: "rgba(0, 255, 198, 0.5)",
                },
                muted: "#999999",
                card: "#FFFFFF",
            },
            fontFamily: {
                sans: ["var(--font-geist-sans)", "Inter", "sans-serif"],
            },
            boxShadow: {
                'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
                'medium': '0 8px 30px rgba(0, 0, 0, 0.08)',
                'glow': '0 0 20px rgba(0, 255, 198, 0.3)',
            },
            backgroundImage: {
                'gradient-subtle': 'linear-gradient(to right, #ffffff, #F7F7F7)',
            },
        },
    },
    plugins: [],
};
export default config;
