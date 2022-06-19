import { useState } from "react";
// Import Chakra
// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import SwipeCard from "../SwipeCard";
import SwiperCore, { Navigation } from "swiper";

import { IMovie, IMovieDetails } from "../../interfaces";
SwiperCore.use([Navigation]);

interface ISwipeProps {
  data: IMovie[] | IMovieDetails[];
  poster: boolean;
  slidesNumber: number;
  white: boolean;
}

function SwipeList({ data, poster, slidesNumber, white }: ISwipeProps) {
  const [isPoster, setIsPoster] = useState(poster);

  return (
    <>
      <Swiper
        slidesPerView={slidesNumber}
        spaceBetween={10}
        slidesPerGroup={slidesNumber}
        navigation={true}
        breakpoints={{
          // when window width is >= 480px
          480: {
            slidesPerView: slidesNumber - 3,
            slidesPerGroup: slidesNumber - 3,
          },
          // when window width is >= 770px
          770: {
            slidesPerView: slidesNumber - 2,
            slidesPerGroup: slidesNumber - 2,
          },
          // when window width is >= 1025px
          1025: {
            slidesPerView: slidesNumber,
            slidesPerGroup: slidesNumber,
          },
        }}
        className="swiper__navigation"
      >
        {data.map(
          (movie) =>
            movie.poster_path && (
              <SwiperSlide key={movie.id} className="wrapper__navigation">
                <SwipeCard
                  isPoster={isPoster}
                  movie={movie}
                  hover={false}
                  isWhite={white}
                />
              </SwiperSlide>
            )
        )}
      </Swiper>
    </>
  );
}

export default SwipeList;
