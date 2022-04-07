import { styled } from "@packages/web";

import Tilt from "react-parallax-tilt";

export const Container = styled(Tilt, {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
  // width: 420,
  height: 380,
  paddingBottom: 20,
  boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
  borderRadius: "$md",
  gap: 20,
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderTop: "1px solid rgba(255, 255, 255, 0.5)",
  borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
  backdropFilter: "blur(15px)",
  zIndex: 100,

  "@xxxl": { width: "80%" },
  "@xxl": { width: "85%" },
  "@md": { width: "80%" },
  "@sm": { width: "99%" },

  //? 420 width x 200 height
  "> div:first-child": {
    position: "relative",
    backgroundColor: "$secondary_500",
    mixBlendMode: "screen",
    height: "100%",
    width: "100%",
    borderRadius: "$md $md 0 0",

    "img, svg": { borderRadius: "$md $md 0 0" },
  },

  "> h1": {
    mixBlendMode: "overlay",
    backgroundBlendMode: "overlay",
    pointerEvents: "none",
    color: "$white",
    opacity: 0.7,
  },

  "div:nth-of-type(2)": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 320,
    gap: 20,
  },

  "div:last-of-type": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,

    a: {
      svg: {
        "path, circle": {
          opacity: 0.6,
        },
      },
    },

    "a:hover": {
      "svg path, svg circle": { color: "$white" },
    },
  },
});
