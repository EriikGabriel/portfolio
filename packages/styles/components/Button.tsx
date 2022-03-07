import { css } from "@packages/web";

export const Button = css({
  cursor: "pointer",
  border: "2px solid transparent",
  borderRadius: "$sm",
  transition: "background 0.2s ease 0s",

  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
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

    outlined: {
      true: {
        backgroundColor: "transparent",
      },
    },

    size: {
      sm: {
        height: "$8",
        padding: "0 $4",

        span: {
          fontSize: "$xs",
        },
      },
      md: {
        height: "$10",
        padding: "0 $6",

        span: {
          fontSize: "$sm",
        },
      },
      lg: {
        height: "$12",
        padding: "0 $8",

        span: {
          fontSize: "$sm",
        },
      },
    },
  },

  compoundVariants: [
    {
      variant: "primary",
      outlined: true,
      css: {
        borderColor: "$primary_base",

        "&:hover": {
          backgroundColor: "$primary_base",
        },
      },
    },
    {
      variant: "secondary",
      outlined: true,
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
    outlined: false,
  },
});
