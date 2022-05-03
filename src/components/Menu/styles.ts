import { styled } from "@packages/web";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

export const Container = styled("aside", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "20%",
  height: "100%",
  gap: "$10",
  paddingTop: "$10",
  backgroundColor: "$secondary_400",
  borderRadius: "0 $lg $lg 0",
  zIndex: 1000,

  "@md": { width: "25%" },
  "@sm": {
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: "$lg $lg 0 0",
    boxShadow: "rgba(100, 100, 111, 0.2) 5px 10px 29px 5px",
    width: "100%",
    height: "12vh",
    paddingTop: 0,
  },

  "> div:first-child": {
    width: "35%",

    "@sm": { display: "none" },

    "svg path": { fill: "$primary_base" },
  },

  ul: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    gap: "$5",

    "@sm": {
      flexDirection: "row",
      width: "auto",
    },

    "li:last-of-type": {
      button: {
        "&:hover": {
          backgroundColor: "transparent",

          div: {
            borderColor: "$primary_200",
          },
        },

        div: {
          border: "2px solid $white",
          borderRadius: "$rounded",
          padding: 3,
        },
      },
    },

    button: {
      width: "100%",

      "&:hover": {
        span: {
          color: "$primary_200",

          svg: { stroke: "$primary_200" },
        },
      },

      "&:first-child": {
        "@sm": { display: "none" },
      },

      "&:last-child": {
        display: "none",

        "@sm": { display: "block", width: 50 },
      },
    },
  },
});

const StyledContent = styled(DropdownMenuPrimitive.Content, {
  minWidth: 220,
  backgroundColor: "$secondary_200",
  color: "white",
  borderRadius: 6,
  padding: 5,
  boxShadow:
    "0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
});

const itemStyles = {
  all: "unset",
  fontSize: 13,
  lineHeight: 1,
  color: "$primary_base",
  display: "flex",
  alignItems: "center",
  height: 25,
  padding: "0 5px",
  position: "relative",

  "> button": {
    height: "100%",
    width: "100%",

    "> span": {
      color: "$negative_light",

      svg: {
        stroke: "$negative_light",
        width: 15,
      },
    },
  },
};

const StyledItem = styled(DropdownMenuPrimitive.Item, { ...itemStyles });

const StyledLabel = styled(DropdownMenuPrimitive.Label, {
  paddingLeft: 25,
  fontSize: 12,
  lineHeight: "25px",
  color: "$white",
});

const StyledSeparator = styled(DropdownMenuPrimitive.Separator, {
  height: 1,
  backgroundColor: "$gray_500",
  margin: 5,
});

const StyledArrow = styled(DropdownMenuPrimitive.Arrow, {
  fill: "$secondary_200",
});

const StyledRadioItem = styled(DropdownMenuPrimitive.RadioItem, {
  ...itemStyles,
});

export const DropdownMenuContainer = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuContent = StyledContent;
export const DropdownMenuItem = StyledItem;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
export const DropdownMenuRadioItem = StyledRadioItem;
export const DropdownMenuLabel = StyledLabel;
export const DropdownMenuSeparator = StyledSeparator;
export const DropdownMenuArrow = StyledArrow;
