import { styled } from "@packages/web";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  padding: "$5",
  backgroundColor: "$secondary_400",
  borderRadius: "$sm",
  gap: 20,

  h1: {
    color: "$primary_300",
  },

  "> div": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,

    "div:last-child": {
      display: "flex",
      gap: 10,
      padding: 5,
    },
  },

  "> div:last-child a": {
    fontSize: "$xs",
    textDecoration: "underline",

    "@xl": { fontSize: "$sm" },
    "@md": { fontSize: "$md" },
  },
});
