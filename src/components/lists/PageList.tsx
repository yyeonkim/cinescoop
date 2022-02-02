import React from "react";
import { Box, Heading, Image, Link } from "@chakra-ui/react";
import NextLink from "next/link";
// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SwiperCore, { Parallax, Pagination, Autoplay } from "swiper";

import { ITrending } from "../../interfaces";
import { IMAGE_URL } from "../../../pages/api/useFetchGenre";

SwiperCore.use([Parallax, Pagination, Autoplay]);

export interface IPageProps {
  data: ITrending[];
}

function PageList({ data }: IPageProps) {
  return (
    <Box mb={10}>
      <Swiper
        speed={600}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        className="swiper__pagination"
      >
        {data &&
          data.map((movie) => (
            <SwiperSlide className="slide__pagination" key={movie.id}>
              <NextLink href={`movieinfo/${movie.id}`}>
                <Link display="flex" flexDirection="column" alignItems="center">
                  <Image src={`${IMAGE_URL}/w500/${movie.backdrop_path}`} />
                  <Heading
                    color="white"
                    size="md"
                    pos="absolute"
                    bottom={5}
                    className="title"
                    data-swiper-parallax="-300"
                    backgroundColor="rgba(0, 0, 0, 0.5)"
                    boxShadow="dark-lg"
                  >
                    {movie.title}
                  </Heading>
                </Link>
              </NextLink>
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
}

export default PageList;
