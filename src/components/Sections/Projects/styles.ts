import { styled } from "@packages/web";
import { m } from "framer-motion";

export const Container = styled("section", {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: 70,

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

      span: { color: "$primary_base" },
    },

    p: {
      fontFamily: "$code",

      "@sm": { fontSize: "$sm" },
    },
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
    p: {
      textAlign: "center",

      a: {
        textDecoration: "underline",
        color: "$white",
        fontWeight: "bold",
        padding: 0,
      },
    },
  },
});

export const BigCircle = styled(m.span, {
  position: "absolute",
  left: "0%",
  bottom: "5%",
  width: 150,
  height: 150,
  background: "linear-gradient(130.78deg, #F55A00 6.99%, #FB4E4E 61.46%)",
  mixBlendMode: "normal",
  borderRadius: "$rounded",
  zIndex: -100,
});

export const SmallCircle = styled(m.span, {
  position: "absolute",
  right: "0%",
  top: "20%",
  width: 80,
  height: 80,
  background: "linear-gradient(130.78deg, #F55A00 6.99%, #F6A609 61.46%)",
  mixBlendMode: "normal",
  borderRadius: "$rounded",
  zIndex: -101,
});
