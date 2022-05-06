import { styled } from "@packages/web";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$10",
  padding: "$5 $5",

  "> div:first-child": {
    display: "flex",
    alignItems: "center",
    gap: "$20",
    paddingLeft: "$5",

    "@md": { paddingLeft: 0 },
  },

  "> div:last-child": {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 45%)",
    justifyContent: "space-evenly",
    gap: "$8",

    "@md": {
      gridTemplateColumns: "repeat(auto-fill, 100%)",
    },

    "> button": {
      width: "100%",
      height: 400,
      border: "1px solid $primary_base",

      "&:hover": {
        svg: { fill: "$primary_200" },
      },

      svg: {
        width: "100%",
        height: "100%",
        stroke: "$primary_500",
        strokeWidth: 0.8,
      },
    },
  },
});
