import React, { ReactNode } from "react";

import { Container } from "./styles";
import { SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-flip";
import IconButton from "@packages/react/Button/IconButton";
import { ArrowLeftCircle, ArrowRightCircle } from "react-feather";

type CarouselProps = {
  children: ReactNode;
};

export const Carousel: React.FC<CarouselProps> = ({ children }) => {
  return (
    <Container
      breakpoints={{
        2560: { slidesPerView: 2 },
        1024: { slidesPerView: 2 },
        425: { slidesPerView: 1, spaceBetween: 30 },
        375: { slidesPerView: 1, spaceBetween: 50 },
        320: { slidesPerView: 1, spaceBetween: 50 },
      }}
      keyboard={{ enabled: true }}
      modules={[Keyboard, Pagination, Navigation]}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      setWrapperSize
      roundLengths
    >
      {React.Children.map(children, (child, i) => {
        return <SwiperSlide>{child}</SwiperSlide>;
      })}
      <IconButton variant="tertiary" className="swiper-button-prev">
        <ArrowLeftCircle />
      </IconButton>
      <IconButton variant="tertiary" className="swiper-button-next">
        <ArrowRightCircle />
      </IconButton>
    </Container>
  );
};
