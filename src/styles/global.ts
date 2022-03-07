import { globalCss } from "@packages/web";

export const globalStyles = globalCss({
  "*": { margin: 0, padding: 0, boxSizing: "border-box" },
  body: {
    fontFamily: "$default",
    background: "$secondary_base",
    color: "$text-base",
    "-webkit-font-smoothing": "antialiased",
  },
});
