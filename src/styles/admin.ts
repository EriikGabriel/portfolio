import { styled } from "@packages/web";

import * as LabelPrimitive from "@radix-ui/react-label";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

export const LoginBox = styled("div", {
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background:
    "linear-gradient(125deg, rgba(0,0,0,1) 0%, #1f1e1dff 50%, rgba(34,31,31,1) 100%)",

  "> div": {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(10px)",
    boxShadow: `0 0 15px 1px black`,
    width: "30vw",
    padding: 40,
    borderRadius: 25,

    "@md": { width: "50vw" },
    "@sm": { width: "90vw" },

    "> div": {
      marginBottom: 20,

      "h1, p": {
        color: "$primary_200",
      },
    },

    form: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 30,

      input: {
        all: "unset",
        width: "100%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 10px",
        borderRadius: 4,
        border: "2px solid $primary_base",
        height: 35,
        fontSize: 15,
        lineHeight: 1,
        color: "$primary_100",
        backgroundColor: "translate",
        boxShadow: `0 0 0 1px black`,

        "&:focus": { boxShadow: `0 0 0 2px black` },
        "&::placeholder": { color: "$primary_100" },
      },

      "button[type=submit]": {
        width: "100%",
      },

      div: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "start",
      },

      "div:last-child": {
        gap: 20,

        div: { gap: 10 },

        "div:last-of-type": {
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "center",
          gap: 10,
        },
      },
    },
  },
});

export const Label = styled(LabelPrimitive.Root, {
  fontSize: 15,
  fontWeight: "$regular",
  color: "$primary_100",
  userSelect: "none",
});

export const Checkbox = styled(CheckboxPrimitive.Root, {
  all: "unset",
  backgroundColor: "transparent",
  border: "2px solid $primary_base",
  width: 12,
  height: 12,
  borderRadius: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: `0 2px 10px $black`,
  cursor: "pointer",

  span: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    svg: {
      color: "$primary_base",
      strokeWidth: 3,
    },
  },

  "&[data-state=checked]": {
    backgroundColor: "$primary_base",

    "span svg": { color: "$white" },
  },

  "&:focus": { boxShadow: `0 0 0 2px black` },
});

export const ToastContent = styled("div", {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  borderRadius: "$sm",
  padding: 5,
  gap: 10,

  "p, h1, svg": {
    color: "$white",
  },

  "div:first-child": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "20%",
  },

  "div:last-child": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    gap: 5,
  },
});

export const CheckIndicator = styled(CheckboxPrimitive.Indicator, {});

export const Container = styled("div", {
  height: "100vh",
  maxWidth: "100vw",
  background: "$secondary_base",
});

export const Content = styled("div", {
  marginLeft: "20%",
  minHeight: "100vh",

  "@md": { marginLeft: "25%" },
  "@sm": { marginLeft: 0, paddingBottom: "12vh" },
});
