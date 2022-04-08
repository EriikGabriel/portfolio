import { styled } from "@packages/web";

export const Container = styled("footer", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "$secondary_400",
  height: 380,
  marginTop: 80,
  gap: 50,

  "div:first-child": {
    position: "relative",
    width: 100,
    height: 100,

    "@sm": { width: 70, height: 70 },
  },
});
