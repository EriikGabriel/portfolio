import { keyframes, styled } from "@packages/web";

const fill = keyframes({
  "0%": {
    left: "-110%",
    top: "90%",
  },
  "50%": {
    left: "10%",
    top: "-30%",
  },
  "100%": {
    top: "-10%",
    left: "-10%",
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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    gap: 150,

    h1: {
      color: "$primary_base",
      fontFamily: "$code",
      fontWeight: "$regular",
      textAlign: "center",
    },

    div: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(0, 1fr))",
      gridTemplateRows: "columns",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      flexWrap: "wrap",
      width: "100%",
      gap: 30,

      "@sm": {
        gridTemplateColumns: "repeat(auto-fit, minmax(30%, 1fr))",
      },

      button: {
        display: "inline-block",
        width: "6vw",
        height: "6vw",
        backgroundColor: "$secondary_400",
        boxShadow: "0 5px 15px -5px #00000070",
        border: "none",
        borderRadius: "30%",
        position: "relative",
        overflow: "hidden",

        "@md": { width: "8vw", height: "8vw" },
        "@sm": { width: "14vw", height: "14vw" },
        "@xs": { width: "18vw", height: "18vw" },

        "&::before": {
          content: "",
          position: "absolute",
          width: "120%",
          height: "120%",
          backgroundColor: "$primary_400",
          transform: "rotate(45deg)",
          left: "-110%",
          top: "90%",
        },

        "span svg": {
          width: "35%",
          height: "35%",
          stroke: "$primary_400",
          transition: "0.2s linear",
        },

        "&:hover": {
          "&::before": {
            animation: `${fill} 0.7s 1`,
            top: "-10%",
            left: "-10%",
          },

          "span svg": {
            transform: "scale(1.3)",
            stroke: "$secondary_400",
          },
        },
      },
    },
  },
});
