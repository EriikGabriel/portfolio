import { styled } from "@packages/web";

export const Container = styled("div", {
  backgroundColor: "$secondary_400",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "25%",
  height: "$20",
  gap: 20,
  borderRadius: "$md",

  "@md": { width: "45%" },

  svg: {
    stroke: "$primary_300",

    "@sm": { display: "none" },
  },

  "div:last-child": {
    "p:first-of-type": { fontWeight: "$regular" },
    "p:last-of-type": {
      fontWeight: "$bold",
      fontSize: "$2xl",
      textAlign: "center",
      color: "$primary_200",
    },
  },
});
