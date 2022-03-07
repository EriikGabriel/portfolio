import { css } from "@packages/web";

export const ButtonLabel = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "$white",
  fontFamily: "$default",
  fontWeight: "bold",
  gap: "$3",

  svg: {
    color: "$white",
    height: "$5",
    width: "$5",
  },
});
