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
  maxHeight: "50vh",
  padding: 25,

  "@xl": { maxHeight: "100%" },

  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },

  "&:focus": { outline: "none" },

  "> div:last-of-type": {
    display: "flex",
    gap: 20,
  },

  "> p span": {
    color: "$negative_light",
  },
});

export const Container = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogOverlay = StyledOverlay;
export const DialogContent = StyledContent;
export const DialogClose = DialogPrimitive.Close;
