import { styled } from "@packages/web";
import { Swiper } from "swiper/react";

export const Container = styled(Swiper, {
  position: "relative",
  backfaceVisibility: "hidden",

  ".swiper-pagination-bullet-active": {
    backgroundColor: "$primary_base",
    border: "1px solid $white",
  },

  ".swiper-button-prev, .swiper-button-next": {
    position: "absolute",
    width: "$10",

    "&:hover": { backgroundColor: "rgba(255, 136, 0, 0.4)" },

    "& svg": {
      fill: "$primary_100",
      stroke: "$primary_500",
    },
  },

  ".swiper-button-prev": {
    left: 15,

    "@xl": { left: 5 },
    "@md": { left: 10 },
  },

  ".swiper-button-next": {
    right: 20,

    "@xl": { right: 10 },
    "@md": { right: 10 },
  },

  ".swiper-button-next::after, .swiper-button-prev::after": { content: "" },

  ".swiper-wrapper": {
    padding: "45px 0px",
    paddingLeft: "2.4vw",

    "@md": { left: "10%", paddingLeft: 0 },
    "@sm": { left: 0 },
  },
});
