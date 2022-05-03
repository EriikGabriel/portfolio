import { styled } from "@packages/web";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  padding: "$5",
  backgroundColor: "$secondary_400",
  borderRadius: "$sm",
  width: "45%",
  gap: 20,

  "@md": { width: "90%" },

  h1: {
    color: "$primary_300",
  },

  "> div": {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: 20,

    "> div": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      // alignItems: "center",
      // backgroundColor: "blue",
      width: "50%",
      padding: 10,
      gap: 10,
    },
  },

  "> div:last-child": {
    a: {
      fontSize: "$xs",
      textDecoration: "underline",
    },
  },
});
