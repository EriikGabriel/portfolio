import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "50": "#fff7ec",
          "100": "#ffeed3",
          "200": "#ffd9a5",
          "300": "#ffbe6d",
          "400": "#ff9632",
          "500": "#ff770a",
          "600": "#f55a00",
          "700": "#cc4202",
          "800": "#a1340b",
          "900": "#822d0c",
          "950": "#461404",
        },
      },
    },
  },
  plugins: [],
}
export default config
