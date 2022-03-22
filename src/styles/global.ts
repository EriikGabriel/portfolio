import { transparentize } from "polished";
import { globalCss } from "@packages/web";

export const globalStyles = globalCss({
  "*": { margin: 0, padding: 0, boxSizing: "border-box" },

  body: {
    fontFamily: "$default",
    background: "$secondary_base",
    color: "$text-base",
    "-webkit-font-smoothing": "antialiased",
  },

  a: {
    textDecoration: "none",
    color: "$text-base",
    padding: "10px",
  },

  ul: {
    listStyle: "none",
  },

  "::-webkit-scrollbar": {
    width: 8,
  },

  "::-webkit-scrollbar-track": {
    background: "transparent",
  },

  "::-webkit-scrollbar-thumb": {
    background: transparentize(0.6, "#FF5A00"),
    borderRadius: "$sm",
  },
});
