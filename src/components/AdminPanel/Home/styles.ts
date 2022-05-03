import { styled } from "@packages/web";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  paddingTop: "$5",
  gap: "$10",
  paddingBottom: "$5",

  "@xl": { gap: "$5" },

  "section:first-of-type": {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },

  "section:last-of-type": {
    display: "flex",
    justifyContent: "space-around",
    height: "100%",

    "@md": {
      flexDirection: "column-reverse",
      alignItems: "center",
      gap: "$5",
    },

    "> article": {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      width: "45%",
      gap: "$10",

      "@xl": { width: "50%", gap: "$5" },
      "@md": { width: "90%" },
    },
  },
});
