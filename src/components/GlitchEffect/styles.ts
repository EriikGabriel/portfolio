import { keyframes, styled } from "@packages/web";

const stack = keyframes({
  "0%": {
    opacity: 0,
    transform: "translateX(-20%)",
    textShadow: "-2px 3px 0 red, 2px -3px 0 blue",
  },
  "60%": {
    opacity: 0.5,
    transform: "translateX(20%)",
  },
  "80%": {
    transform: "none",
    opacity: 1,
    textShadow: "2px -3px 0 red, -2px 3px 0 blue",
  },
  "100%": {
    textShadow: "none",
  },
});

const glitch = keyframes({
  "0%": {
    textShadow: "-2px 3px 0 red, 2px -3px 0 blue",
    transform: "translate(var(--glitch-translate))",
  },
  "2%": {
    textShadow: "2px -3px 0 red, -2px 3px 0 blue",
  },
  "4%, 100%": { texShadow: "none", transform: "none" },
});

export const Container = styled("div", {
  display: "grid",
  gridTemplateColumns: 1,

  "> span": {
    gridRowStart: 1,
    gridColumnStart: 1,

    "--stack-height": "calc(100% / var(--stacks) - 1px)",
    "--inverse-index": "calc(calc(var(--stacks) - 1) - var(--index))",
    "--clip-top": "calc(var(--stack-height) * var(--index))",
    "--clip-bottom": "calc(var(--stack-height) * var(--inverse-index))",
    clipPath: "inset(var(--clip-top) 0 var(--clip-bottom) 0)",
    animation: `${stack} 340ms cubic-bezier(.46,.29,0,1.24) 1 backwards calc(var(--index) * 120ms), ${glitch} 2s ease infinite 2s alternate-reverse`,

    "&:nth-child(odd)": {
      "--glitch-translate": "8px",
    },

    "&:nth-child(even)": {
      "--glitch-translate": "-8px",
    },
  },
});
