import { styled } from "@packages/web";

export const Container = styled("div", {
  backgroundColor: "$secondary_300",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  width: "100%",
  boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
  borderRadius: "$md",
  padding: 20,
  gap: 10,

  "> div:first-of-type": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,

    "> div": {
      display: "flex",
      gap: 20,

      "div:first-child": {
        position: "relative",
        height: 45,
        width: 45,

        "img, svg": { borderRadius: "$rounded" },
      },
    },
  },

  "> div:last-of-type": {
    display: "flex",
    alignItems: "center",
    gap: 20,
  },

  "> button": {
    marginTop: 10,
  },
});
