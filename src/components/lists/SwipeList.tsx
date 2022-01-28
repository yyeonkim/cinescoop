import { useState } from "react";
// Import Chakra
import { Image, Text } from "@chakra-ui/react";
// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import SwiperCore, { Navigation } from "swiper";

import { IMovie } from "../../interfaces";
import { IMAGE_URL } from "../../../pages/api/useFetchGenre";
SwiperCore.use([Navigation]);

interface ISwipeProps {
  data: IMovie[];
  poster: boolean;
  slidesNumber: number;
}

function SwipeList({ data, poster, slidesNumber }: ISwipeProps) {
  const [isPoster, setIsPoster] = useState(poster);

  return (
    <>
      <Swiper
        slidesPerView={slidesNumber}
        spaceBetween={10}
        slidesPerGroup={slidesNumber}
        loop={true}
        navigation={true}
        className="swiper__navigation"
      >
        {data.map((movie) => (
          <SwiperSlide key={movie.id} className="wrapper__navigation">
            <Image
              src={`${IMAGE_URL}/w300/${
                isPoster ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.title}
            />
            <Text fontSize="md" align="center" mt={1}>
              {movie.title}
            </Text>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default SwipeList;
