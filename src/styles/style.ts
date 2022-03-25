import { styled } from "@packages/web";

export const Main = styled("main", {
  minHeight: "100vh",

  "> section": {
    minHeight: "100vh",

    "& + section": { padding: "80px 0" },
  },

  "@xxxl": { padding: "0 220px" },
  "@xxl": { padding: "0 180px" },
  "@xl": { padding: "0 150px" },
  "@lg": { padding: "0 100px" },
  "@md": { padding: "0 50px" },
  "@sm": { padding: "0 25px" },
});
