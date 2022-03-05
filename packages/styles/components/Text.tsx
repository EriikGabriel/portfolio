import { css } from "@packages/web";

export const Text = css({
  margin: 0,
  fontFamily: "$default",
  color: "$text-base",
  lineHeight: "$base",

  variants: {
    size: {
      xs: {
        fontSize: "$xs",
      },
      sm: {
        fontSize: "$sm",
      },
      md: {
        fontSize: "$md",
      },
      lg: {
        fontSize: "$lg",
      },
    },
  },

  defaultVariants: {
    size: "md",
  },
});
