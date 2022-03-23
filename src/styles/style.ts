import { styled } from "@packages/web";

export const Main = styled("main", {
  marginTop: "calc($20 + 3rem)",
  minHeight: "100vh",

  "> section": {
    height: "100%",
  },

  "@xxxl": {
    padding: "0 220px",
  },

  "@xxl": {
    padding: "0 180px",
  },

  "@xl": {
    padding: "0 150px",
  },

  "@lg": {
    padding: "0 100px",
  },

  "@md": {
    padding: "0 50px",
  },

  "@sm": {
    padding: "0 25px",
  },
});
