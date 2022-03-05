import { colors } from "@packages/colors";
import { createStitches, defaultThemeMap } from "@stitches/react";
import type * as Stitches from "@stitches/react";

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  themeMap: {
    ...defaultThemeMap,
    width: "space",
    height: "space",
    opacity: "opacity",
  },
  theme: {
    colors,

    space: {
      px: "1px",
      1: "0.25rem",
      2: "0.5rem",
      3: "0.75rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      7: "1.75rem",
      8: "2rem",
      9: "2.25rem",
      10: "2.5rem",
      12: "3rem",
      16: "4rem",
      20: "5rem",
      40: "10rem",
      64: "16rem",
      80: "20rem",
    },

    fontSizes: {
      xxs: "0.625rem",
      xs: "0.75rem",
      sm: "0.825rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "4xl": "2rem",
      "5xl": "2.25rem",
      "6xl": "3rem",
      "7xl": "4rem",
      "8xl": "4.5rem",
    },

    fonts: {
      default: "Roboto, sans-serif",
      cursive: "Rancho, cursive",
      read: "Spectral, serif",
      code: "Fira Code, monospace",
    },

    fontWeights: {
      light: "light",
      regular: "regular",
      medium: "medium",
      bold: "bold",
    },

    lineHeights: {
      shorter: "125%",
      short: "140%",
      base: "160%",
      tall: "100%",
    },

    radii: {
      xs: "2.5px",
      sm: "5px",
      md: "10px",
      lg: "20px",
      full: "9999px",
      rounded: "100%",
    },
  },

  media: {
    sm: "(max-width: 30em)",
    md: "(max-width: 48em)",
    lg: "(max-width: 62em)",
    xl: "(max-width: 80em)",
    xxl: "(max-width: 96em)",
  },

  utils: {
    mx: (value: Stitches.ScaleValue<"space">) => ({
      marginLeft: value,
      marginRight: value,
    }),

    my: (value: Stitches.ScaleValue<"space">) => ({
      marginTop: value,
      marginBottom: value,
    }),

    px: (value: Stitches.ScaleValue<"space">) => ({
      paddingLeft: value,
      paddingRight: value,
    }),

    py: (value: Stitches.ScaleValue<"space">) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
  },
});
