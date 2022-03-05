import { css } from "@packages/web";
import { relative } from "node:path/win32";

export const IconButton = css({
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  border: "2px solid transparent",
  borderRadius: "$sm",
  transition: "background 0.2s ease 0s",
  padding: 0,

  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },

  svg: {
    color: "$white",
    height: "$6",
    width: "$6",
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
        width: "$8",
        height: "$8",
      },
      md: {
        height: "$10",
        width: "$10",
      },
      lg: {
        height: "$12",
        width: "$12",
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
