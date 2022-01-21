import React from "react";
import { Image } from "@chakra-ui/react";
// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SwiperCore, { Autoplay, Pagination } from "swiper";

SwiperCore.use([Autoplay, Pagination]);

function PageList() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="swiper__pagination"
      >
        <SwiperSlide>Movie 1</SwiperSlide>
        <SwiperSlide>Movie 2</SwiperSlide>
        <SwiperSlide>Movie 3</SwiperSlide>
        <SwiperSlide>Movie 4</SwiperSlide>
        <SwiperSlide>Movie 5</SwiperSlide>
      </Swiper>
    </>
  );
}

export default PageList;
