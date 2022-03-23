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
      xxs: `clamp(0.425rem, ${(0.625 * 16 * 100) / 1366}vw, 0.825rem)`,
      xs: `clamp(0.425rem, ${(0.75 * 16 * 100) / 1366}vw, 1rem)`,
      sm: `clamp(0.625rem, ${(0.825 * 16 * 100) / 1366}vw, 1.125rem)`,
      md: `clamp(0.75rem, ${(1 * 16 * 100) / 1366}vw, 1.25rem)`,
      lg: `clamp(0.825rem, ${(1.125 * 16 * 100) / 1366}vw, 1.5rem)`,
      xl: `clamp(1rem, ${(1.25 * 16 * 100) / 1366}vw, 2rem)`,
      "2xl": `clamp(1.125rem, ${(1.5 * 16 * 100) / 1366}vw, 2.25rem)`,
      "4xl": `clamp(1.25rem, ${(2 * 16 * 100) / 1366}vw, 3rem)`,
      "5xl": `clamp(1.5rem, ${(2.25 * 16 * 100) / 1366}vw, 4rem)`,
      "6xl": `clamp(2rem, ${(3 * 16 * 100) / 1366}vw, 4.5rem)`,
      "7xl": `clamp(2.25rem, ${(4 * 16 * 100) / 1366}vw, 4.5rem)`,
      "8xl": `clamp(3rem, ${(4.5 * 16 * 100) / 1366}vw, 5rem)`,
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
    xxxl: "(max-width: 160em)",
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
