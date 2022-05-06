import { styled } from "@packages/web";

export const Container = styled("div", {
  backgroundColor: "$secondary_300",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
  width: "100%",
  boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
  borderRadius: "$md",
  gap: 10,

  "> div:first-child": {
    position: "relative",
    backgroundColor: "$secondary_500",
    height: 200,
    width: "100%",
    borderRadius: "$md $md 0 0",

    "img, svg": { borderRadius: "$md $md 0 0" },
  },

  "div:nth-of-type(2)": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 320,
    gap: 20,
  },

  "div:nth-of-type(3)": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,

    a: {
      svg: {
        "path, circle": {
          opacity: 0.6,
        },
      },
    },

    "a:hover": {
      "svg path, svg circle": { color: "$white" },
    },
  },

  "div:last-of-type": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "$secondary_400",
    borderRadius: "0 0 $md $md",
    padding: 10,
    gap: 20,

    button: {
      span: {
        color: "$primary_base",
        svg: { stroke: "$primary_base" },
      },

      "&:hover": {
        span: {
          color: "$white",
          svg: { stroke: "$white" },
        },
      },
    },
  },
});
