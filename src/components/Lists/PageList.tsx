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
import { IMAGE_URL } from "../../hooks/fetching";
import { useSetRecoilState } from "recoil";
import { movieIDState } from "../../atom";
import { useRouter } from "next/router";

SwiperCore.use([Parallax, Pagination, Autoplay]);

export interface IPageProps {
  data: ITrending[];
}

function PageList({ data }: IPageProps) {
  const setMovieID = useSetRecoilState(movieIDState);
  const router = useRouter();

  const seeMovieInfo = (id: number) => {
    setMovieID(id);
    router.push(`/movieinfo/${id}`);
  };

  return (
    <Box mb={10}>
      <Swiper
        centeredSlides={true}
        speed={600}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          // when window width is >= 480px
          480: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          // when window width is >= 770px
          770: {
            slidesPerView: 1.5,
            spaceBetween: 30,
          },
          // when window width is >= 1025px
          1025: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
        }}
        className="swiper__pagination"
      >
        {data.map(
          (movie) =>
            movie.backdrop_path && (
              <SwiperSlide
                className="slide__pagination"
                key={movie.id}
                onClick={() => seeMovieInfo(movie.id)}
              >
                <Link display="flex" flexDirection="column" alignItems="center">
                  <Image src={`${IMAGE_URL}/w780/${movie.backdrop_path}`} />
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
              </SwiperSlide>
            )
        )}
      </Swiper>
    </Box>
  );
}

export default PageList;
