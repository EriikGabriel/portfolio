import { styled } from "@packages/web";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$10",
  padding: "$5 $5",

  "> h1": {
    paddingLeft: "$5",

    "@md": { paddingLeft: 0 },
  },

  "> div": {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 45%)",
    justifyContent: "space-evenly",
    gap: "$5",

    "@md": {
      gridTemplateColumns: "repeat(auto-fill, 100%)",

      "> div > button span": { fontSize: "$lg" },
    },
  },
});
