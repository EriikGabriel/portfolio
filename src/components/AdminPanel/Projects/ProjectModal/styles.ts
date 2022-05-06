import { keyframes, styled } from "@packages/web";

import * as DialogPrimitive from "@radix-ui/react-dialog";

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  background: "rgba(0 0 0 / 0.8)",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  inset: 0,
  zIndex: 1000,
  display: "grid",
  placeItems: "center",
  overflowY: "scroll",

  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
});

const StyledContent = styled(DialogPrimitive.Content, {
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
  backgroundColor: "$secondary_400",
  gap: 20,
  zIndex: 1001,
  borderRadius: 6,
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: 500,
  maxHeight: "100%",
  padding: 25,

  "@xl": { maxHeight: "80%" },

  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },

  "&:focus": { outline: "none" },
});

export const DialogForm = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: 20,

  fieldset: {
    border: "none",
    display: "flex",
    flexDirection: "column",
    gap: 10,

    label: { width: "fit-content" },

    input: {
      border: "none",
      outlineColor: "$primary_base",
      width: "100%",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "$sm",
      padding: "0 10px",
      fontSize: "$md",
      height: 35,
      lineHeight: 1,
      color: "$white",
      backgroundColor: "$secondary_300",
      boxShadow: `0 0 0 1px $black`,
    },
  },

  "> fieldset:first-of-type": {
    position: "relative",

    button: {
      position: "absolute",
      top: 15,
      right: -15,
      zIndex: 1,

      "&:hover": { backgroundColor: "transparent" },

      svg: {
        stroke: "#9b0404",
        fill: "$negative_light",
      },
    },

    "> div": {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      gap: 10,
      height: 200,
      border: "2px dashed $primary_300",
      borderRadius: "$md",
      cursor: "pointer",
      userSelect: "none",
      textAlign: "center",

      img: {
        borderRadius: "$md",

        "&:hover": {
          filter: "opacity(0.4) drop-shadow(0 0 0 #FF5A00)",
        },
      },
    },
  },

  "> fieldset:nth-of-type(3)": {
    div: {
      display: "flex",
      alignItems: "center",
      gap: 10,
    },
  },

  "> fieldset:nth-of-type(4)": {
    flexDirection: "row",
    justifyContent: "space-between",

    "@sm": {
      flexDirection: "column",
      gap: 20,
    },

    div: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      gap: 10,
    },
  },

  "> div:last-of-type": {
    display: "flex",
    gap: 20,
  },
});

export const Container = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogOverlay = StyledOverlay;
export const DialogContent = StyledContent;
export const DialogClose = DialogPrimitive.Close;
