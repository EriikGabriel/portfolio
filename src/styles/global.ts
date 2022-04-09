import { transparentize } from "polished";
import { globalCss, keyframes } from "@packages/web";

const blink = keyframes({
  "50%": {
    opacity: 0,
  },
});

export const globalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
    scrollBehavior: "smooth",
  },

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

  ".end-cursor:after": {
    content: "|",
  },

  ".end-cursor.blinking:after": {
    animation: `${blink} 1s step-start infinite`,
  },

  "::-webkit-scrollbar": {
    width: 8,
    height: 8,
  },

  "::-webkit-scrollbar-track": {
    background: "transparent",
  },

  "::-webkit-scrollbar-thumb": {
    background: transparentize(0.6, "#FF5A00"),
    borderRadius: "$sm",
  },
});
