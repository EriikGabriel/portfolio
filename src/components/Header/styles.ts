import { transparentize } from "polished";
import { styled } from "@packages/web";
import { m } from "framer-motion";

export const Container = styled(m.header, {
  position: "fixed",
  top: 0,
  left: 0,
  height: "100%",
  width: "100%",
  backgroundColor: "$secondary_base",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  fontSize: "$sm",
  transition: "1s",

  "&.transparentHeader": {
    boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(10px)",
  },

  "> div:first-child": {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 100,
    height: 100,
    transition: "1s",
    zIndex: 1001,

    ".logo": {
      width: "100%",
      height: "100%",

      path: {
        stroke: "$primary_base",
        strokeWidth: 3,
        strokeLinejoin: "round",
        strokeLinecap: "round",
      },
    },
  },

  "> nav": {
    position: "relative",
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: "5rem",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
    height: "100%",
    transition: "1s",

    "div:nth-child(1)": {
      display: "flex",
      position: "relative",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "$code",
      gap: 30,

      ul: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        width: "100%",
        height: "100%",
        padding: 5,
        gap: 20,

        li: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          height: 40,

          "&:hover a": {
            transition: "all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)",
            color: "$primary_base",
          },
        },
      },

      button: {
        span: {
          fontFamily: "$code",
          fontWeight: "$regular",
          color: "$primary_base",
        },

        "&:hover": {
          backgroundColor: transparentize(0.9, "#F55A00"),
        },
      },
    },

    "div:nth-child(2)": {
      display: "none",
    },

    //* Breakpoints *//
    "@sm": {
      paddingRight: "2rem",

      "div:nth-child(1)": {
        display: "none",
      },

      "div:nth-child(2)": {
        display: "block",
      },
    },
  },

  "&.header": {
    backgroundColor: "transparent",
    height: "$20",

    "> div:first-child": {
      left: "5rem",
      width: 50,
      height: 50,
      transition: "1s",

      //* Breakpoints *//
      "@sm": {
        left: "3rem",
      },
    },
  },
});

export const Menu = styled(m.aside, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "$secondary_400",
  fontFamily: "$code",
  fontSize: "$md",
  position: "fixed",
  zIndex: 1001,
  bottom: 0,
  right: 0,
  height: "100vh",
  width: "70%",
  boxShadow: "-10px 0px 30px -15px rgba(19, 18, 18, 0.7)",

  nav: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    gap: 30,

    ul: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      padding: 5,
      gap: 20,

      li: {
        width: "100%",
        height: 50,

        a: {
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        },

        "&:hover a": {
          transition: "all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)",
          color: "$primary_base",
        },
      },
    },

    button: {
      width: "60%",

      span: {
        fontFamily: "$code",
        fontWeight: "$regular",
        fontSize: "$md",
        color: "$primary_base",
      },

      "&:hover span": {
        color: "$white",
      },
    },
  },
});

export const Overlay = styled("div", {
  position: "fixed",
  zIndex: 1000,
  top: 0,
  bottom: 0,
  left: 0,
  height: "100vh",
  width: "100vw",
  backdropFilter: "blur(3px)",
  backgroundColor: "rgba(0, 0, 0, 0.3)",
});
