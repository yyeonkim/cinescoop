import React from "react";
import { Heading, Image } from "@chakra-ui/react";
// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SwiperCore, { Parallax, Pagination, Autoplay } from "swiper";

import { IMAGE_URL, ITrending } from "../atom";

SwiperCore.use([Parallax, Pagination, Autoplay]);

interface IPageProps {
  data: ITrending[];
}

function PageList({ data }: IPageProps) {
  return (
    <>
      <Swiper
        speed={600}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        className="swiper__pagination"
      >
        {data.map((movie) => (
          <SwiperSlide className="slide__pagination" key={movie.id}>
            <Image src={`${IMAGE_URL}/w500/${movie.backdrop_path}`} />
            <Heading
              color="white"
              size="md"
              pos="absolute"
              top={5}
              className="title"
              data-swiper-parallax="-300"
            >
              {movie.title}
            </Heading>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default PageList;
