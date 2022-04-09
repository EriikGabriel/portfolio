import { transparentize } from "polished";
import { keyframes, styled } from "@packages/web";

const rotateAnticlockwise = keyframes({
  "0%": {
    transform: "translate(-50%, -50%) rotate(0deg)",
  },
  "100%": {
    transform: "translate(-50%, -50%) rotate(360deg)",
  },
});

const rotateClockwise = keyframes({
  "0%": {
    transform: "translate(-50%, -50%) rotate(360deg)",
  },
  "100%": {
    transform: "translate(-50%, -50%) rotate(0deg)",
  },
});

export const Container = styled("section", {
  display: "flex",
  flexDirection: "column",
  gap: 100,

  "> div:first-child": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",

    div: {
      minWidth: "50%",
    },

    h1: {
      letterSpacing: 3,
      fontSize: "$5xl",

      "@sm": { fontSize: "$4xl" },

      span: {
        color: "$primary_base",
      },
    },

    p: { fontFamily: "$code" },
  },

  "> div:first-child::before, > div:first-child::after": {
    content: "",
    margin: "0 20px",
    display: "inline",
    width: "10vw",
    height: 1,
    backgroundColor: "$gray_400",

    "@xs": { display: "none" },
  },

  "> div:last-child": {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",

    "@sm": { gap: 80 },

    "> div:first-child": {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",

      "> span:nth-child(1)": {
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "120%",
        height: "120%",
        border: "2px solid $white",
        borderRadius: "38% 62% 63% 37% / 41% 44% 56% 59%",
        transition: "0.5s",
        animation: `${rotateAnticlockwise} 10s infinite`,
      },

      "&:hover > span:nth-child(1)": {
        border: "none",
        backgroundColor: transparentize(0.2, "#F55A00"),
      },

      "> span:nth-child(2)": {
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "120%",
        height: "120%",
        border: "2px solid $white",
        borderRadius: "38% 62% 63% 37% / 41% 44% 56% 59%",
        transition: "0.5s",
        animation: `${rotateAnticlockwise} 4s linear infinite`,
      },

      "&:hover > span:nth-child(2)": {
        border: "none",
        backgroundColor: transparentize(0.2, "#F55A00"),
      },

      "> span:nth-child(3)": {
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "120%",
        height: "120%",
        border: "2px solid $white",
        borderRadius: "38% 62% 63% 37% / 41% 44% 56% 59%",
        transition: "0.5s",
        animation: `${rotateClockwise} 10s linear infinite`,
      },

      "&:hover > span:nth-child(3)": {
        border: "none",
        backgroundColor: transparentize(0.2, "#F55A00"),
      },

      div: {
        position: "relative",
        height: 250,
        width: 250,

        "@xl": { height: 200, width: 200 },
        "@md": { height: 180, width: 180 },
        "@sm": { height: 180, width: 180 },
        "@xs": { height: 160, width: 160 },
        "@xxs": { height: 150, width: 150 },
      },

      img: {
        borderRadius: "38% 62% 70% 37% / 52% 44% 56% 59%",
      },
    },

    "> div:last-child": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: "50%",
      gap: 10,

      "@sm": { width: "100%" },

      h1: {
        color: "$primary_base",
        fontWeight: "$regular",
      },

      "p span": {
        color: "$primary_base",
      },
    },
  },
});
