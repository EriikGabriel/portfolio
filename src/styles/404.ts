import { styled } from "@packages/web";

export const Container = styled("div", {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "$secondary_400",
  gap: 20,

  "> div:first-of-type": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "$code",
    gap: 20,

    "h1:first-child": {
      height: "fit-content",
      width: "35vw",

      "& > div span": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "$8xl",
        width: "35vw",
        height: 80,
      },

      "@sm": {
        width: "55vw",
        "& > div span": { width: "55vw" },
      },

      "@xs": {
        width: "65vw",
        "& > div span": { width: "65vw" },
      },
    },

    "h1:last-of-type": {
      fontFamily: "$code",
    },

    small: {
      textAlign: "center",
      padding: "0 20px",
    },
  },

  "> div:last-of-type": {
    width: "25%",
    height: "40%",

    "@sm": { width: "55%" },
  },
});
