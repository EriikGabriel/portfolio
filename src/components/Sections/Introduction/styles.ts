import { transparentize } from "polished";
import { styled } from "@packages/web";

export const Container = styled("section", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: 25,

  "> p:first-of-type": {
    fontFamily: "$code",
    color: "$primary_base",
  },

  "> p:last-of-type": {
    maxWidth: "540px",

    "@md": { maxWidth: "400px" },
  },

  "p span": {
    color: "$primary_base",
  },

  div: {
    "h1:first-child > div span": {
      fontSize: "$8xl",
      width: "52vw",

      "@sm": { width: "85vw" },
    },

    "h1:last-child": {
      color: "$gray_400",
    },
  },

  button: {
    marginTop: 30,

    span: {
      fontFamily: "$code",
      fontWeight: "$regular",
      color: "$primary_base",
    },

    "&:hover": {
      backgroundColor: transparentize(0.9, "#F55A00"),
    },
  },
});
