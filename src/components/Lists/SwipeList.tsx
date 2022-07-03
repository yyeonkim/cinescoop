import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import SwipeCard from "../SwipeCard";
import SwiperCore, { Navigation } from "swiper";

import { IMovie, IMovieDetails } from "../../interfaces";
import { useSetRecoilState } from "recoil";
import { movieIDState } from "../../atom";
import { useRouter } from "next/router";
SwiperCore.use([Navigation]);

interface ISwipeProps {
  data: IMovie[] | IMovieDetails[];
  poster: boolean;
  slidesNumber: number;
}

function SwipeList({ data, poster, slidesNumber }: ISwipeProps) {
  const [isPoster, setIsPoster] = useState(poster);
  const setMovieID = useSetRecoilState(movieIDState);
  const router = useRouter();

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
                <SwipeCard isPoster={isPoster} movie={movie} />
              </SwiperSlide>
            )
        )}
      </Swiper>
    </>
  );
}

export default SwipeList;
