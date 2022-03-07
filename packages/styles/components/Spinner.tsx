import { css, theme, keyframes } from "@packages/web";
import { transparentize } from "polished";

const spin = keyframes({ to: { transform: "rotate(360deg)" } });

export const Spinner = css({
  border: "3px solid transparent",
  borderRadius: "$rounded",
  transition: "background 0.2s ease 0s",
  animation: `${spin} 1s linear infinite`,

  variants: {
    variant: {
      white: {
        borderColor: transparentize(0.5, theme.colors.white.value),
        borderLeftColor: "$white",
      },
      primary: {
        borderColor: transparentize(0.8, theme.colors.primary_base.value),
        borderLeftColor: "$primary_base",
      },
      secondary: {
        borderColor: transparentize(0.5, theme.colors.secondary_base.value),
        borderLeftColor: "$secondary_base",
      },
    },

    size: {
      sm: {
        height: "$4",
        width: "$4",
      },
      md: {
        height: "$5",
        width: "$5",
      },
      lg: {
        height: "$10",
        width: "$10",
      },
    },
  },

  defaultVariants: {
    variant: "white",
    size: "md",
  },
});
