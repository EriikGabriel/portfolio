import { styled } from "@packages/web";

export const Container = styled("section", {
  display: "flex",
  flexDirection: "column",
  gap: 100,

  "> div:first-child": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",

    h1: {
      letterSpacing: 3,
      fontSize: "$5xl",

      "@sm": { fontSize: "$4xl" },

      span: {
        color: "$primary_base",
      },
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,

    "> div": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      width: 100,
      padding: 10,
      gap: 10,
      transition: "all 0.5s 0s ease",

      "&:hover": {
        transform: "scale(1.2) !important",

        path: { fill: "$primary_300", transition: "0.5s ease" },
        p: { color: "$primary_300", transition: "0.5s ease" },
      },

      svg: {
        width: 50,
        height: 50,

        "@md": { width: 40, height: 40 },
        "@sm": { width: 30, height: 30 },
      },

      p: {
        fontFamily: "$code",
        textAlign: "center",
        fontWeight: "$bold",
        textTransform: "uppercase",

        "@md": { fontSize: "$sm" },
      },
    },
  },
});
