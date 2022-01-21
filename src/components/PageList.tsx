import React from "react";
import { Image } from "@chakra-ui/react";
// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SwiperCore, { Autoplay, Pagination } from "swiper";
SwiperCore.use([Autoplay, Pagination]);

import { IMAGE_URL, ITrending } from "../atom";

interface IPageProps {
  data: ITrending[];
}

function PageList({ data }: IPageProps) {
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
        {data.map((movie) => (
          <SwiperSlide>
            <Image src={`${IMAGE_URL}/w300/${movie.poster_path}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default PageList;
