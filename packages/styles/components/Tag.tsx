import { css } from "@packages/web";

export const Tag = css({
  cursor: "pointer",
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid transparent",
  borderRadius: "$full",
  transition: "background 0.2s ease 0s",

  span: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "$white",
    fontFamily: "$default",
    fontWeight: "bold",
  },

  variants: {
    variant: {
      primary: {
        backgroundColor: "$primary_base",

        "&:hover": {
          backgroundColor: "$primary_300",
        },
      },
      secondary: {
        backgroundColor: "$secondary_base",

        "&:hover": {
          backgroundColor: "$secondary_300",
        },
      },
      tertiary: {
        backgroundColor: "transparent",

        "&:hover": {
          backgroundColor: "$secondary_100",
        },
      },
    },

    active: {
      false: {
        backgroundColor: "transparent",
      },
    },

    size: {
      sm: {
        height: "$6",
        padding: "0 $3",

        span: {
          fontSize: "$xxs",
        },
      },
      md: {
        height: "$7",
        padding: "0 $3",

        span: {
          fontSize: "$xs",
        },
      },
      lg: {
        height: "$8",
        padding: "0 $4",

        span: {
          fontSize: "$sm",
        },
      },
    },
  },

  compoundVariants: [
    {
      variant: "primary",
      active: false,
      css: {
        borderColor: "$primary_base",

        "&:hover": {
          backgroundColor: "$primary_base",
        },
      },
    },
    {
      variant: "secondary",
      active: false,
      css: {
        borderColor: "$secondary_base",

        "&:hover": {
          backgroundColor: "$secondary_base",
        },
      },
    },
  ],

  defaultVariants: {
    variant: "primary",
    size: "md",
    active: true,
  },
});
