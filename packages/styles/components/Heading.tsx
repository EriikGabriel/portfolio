import { css } from "@packages/web";

export const Heading = css({
  margin: 0,
  fontFamily: "$default",
  color: "$text-title",
  lineHeight: "$shorter",

  variants: {
    size: {
      sm: {
        fontSize: "$xl",
      },
      md: {
        fontSize: "$2xl",
      },
      lg: {
        fontSize: "$4xl",
      },
      xl: {
        fontSize: "$6xl",
      },
      "2xl": {
        fontSize: "$7xl",
      },
    },
  },

  defaultVariants: {
    size: "md",
  },
});
