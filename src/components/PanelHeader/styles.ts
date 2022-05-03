import { styled } from "@packages/web";

export const Container = styled("header", {
  display: "flex",
  justifyContent: "end",
  alignItems: "center",
  paddingRight: "$10",
  height: "12vh",

  "@sm": { display: "none" },

  button: {
    width: "auto",
    height: "auto",
    padding: "$1 $3 $1 $3",

    "&:hover": {
      div: {
        borderColor: "$primary_200",
        color: "$primary_200",

        svg: { stroke: "$primary_200" },
      },
    },

    div: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 10,

      div: {
        border: "2px solid $white",
        borderRadius: "$rounded",
        padding: 3,
      },
    },
  },
});
