import { styled } from "@packages/web";

export const Container = styled("div", {
  backgroundColor: "$secondary_400",
  display: "flex",
  flexDirection: "column",
  padding: "$5",
  borderRadius: "$sm",
  gap: 20,

  h1: {
    color: "$primary_300",
  },

  "> div": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    "div:first-of-type": {
      display: "flex",
      alignItems: "center",
      gap: 10,
    },

    "div:last-of-type": {
      display: "flex",
      alignItems: "center",
      gap: 10,
    },
  },
});
