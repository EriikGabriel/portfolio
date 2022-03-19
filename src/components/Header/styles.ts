import { styled } from "@packages/web";
import { motion } from "framer-motion";

export const Container = styled(motion.header, {
  position: "fixed",
  top: 0,
  left: 0,

  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  width: "100vw",
  height: "$20",
  fontSize: "$sm",

  "&.transparentHeader": {
    boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(10px)",
  },

  "> nav": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
    px: "$12",

    ".logo": {
      width: 50,
      height: 50,

      path: {
        fill: "$primary_base",
      },
    },

    "div:nth-child(2)": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Fira Code, sans-serif",
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
          fontFamily: "Fira Code, sans-serif",
          fontWeight: "$regular",
          color: "$primary_base",
        },

        "&:hover span": {
          color: "$white",
        },
      },
    },

    "div:last-child": {
      display: "none",
    },

    //* Breakpoints *//
    "@sm": {
      "div:nth-child(2)": {
        display: "none",
      },

      "div:last-child": {
        display: "block",
      },
    },
  },
});

export const Menu = styled(motion.aside, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "$secondary_400",
  fontFamily: "Fira Code, sans-serif",
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
        fontFamily: "Fira Code, sans-serif",
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
