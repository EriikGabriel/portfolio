// ´re
const baseColors = {
  primary_base: "#F55A00",
  primary_100: "#FFA16A",
  primary_200: "#ED8040",
  primary_300: "#F77225",
  primary_400: "#EB681C",
  primary_500: "#CB4A00",
  primary_600: "#BF4600",

  secondary_base: "#202024",
  secondary_100: "#48484F",
  secondary_200: "#3C3C3D",
  secondary_300: "#2E2E2F",
  secondary_400: "#121214",
  secondary_500: "#0A0A0F ",
  secondary_600: "#07070D",

  warning_light: "#FFBC1F",
  warning_base: "#F6A609",
  warning_dark: "#E89806",

  positive_light: "#40DD7F",
  positive_base: "#2AC769",
  positive_dark: "#1AB759",

  negative_light: "#FF6262",
  negative_base: "#FB4E4E",
  negative_dark: "#E93C3C",

  white: "#FFFFFF",
  black: "#000000",

  gray_100: "#E8E8E8",
  gray_200: "#DBDDE0",
  gray_300: "#CACCCF",
  gray_400: "#A0A4A8",
  gray_500: "#52575C",
  gray_600: "#333333",
};

const aliases = {
  "text-title": baseColors.gray_200,
  "text-base": baseColors.gray_100,
  "color-background": baseColors.secondary_base,
};

export const colors = { ...baseColors, ...aliases };
