import { useState } from "react";
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
}

function SwipeList({ data, poster, slidesNumber }: ISwipeProps) {
  const [isPoster, setIsPoster] = useState(poster);

  return (
    <>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        slidesPerGroup={2}
        navigation={true}
        breakpoints={{
          // when window width is >= 641px
          641: {
            slidesPerView: slidesNumber - 2,
            slidesPerGroup: slidesNumber - 2,
          },
          // when window width is >= 1008px
          1008: {
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
                <SwipeCard isPoster={isPoster} movie={movie} />
              </SwiperSlide>
            )
        )}
      </Swiper>
    </>
  );
}

export default SwipeList;
