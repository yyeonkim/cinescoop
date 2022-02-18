import { useState } from "react";
// Import Chakra
import { Image, Link, Text } from "@chakra-ui/react";
// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import SwiperCore, { Navigation } from "swiper";

import { IMovie } from "../../interfaces";
import { IMAGE_URL } from "../../../pages/api/useFetchGenre";
import { useSetRecoilState } from "recoil";
import { movieIDState } from "../../atom";
import { useRouter } from "next/router";
SwiperCore.use([Navigation]);

interface ISwipeProps {
  data: IMovie[];
  poster: boolean;
  slidesNumber: number;
}

function SwipeList({ data, poster, slidesNumber }: ISwipeProps) {
  const router = useRouter();

  const [isPoster, setIsPoster] = useState(poster);
  const setMovieID = useSetRecoilState(movieIDState);

  const seeMovieInfo = (id: number) => {
    setMovieID(id);
    router.push(`/movieinfo/${id}`);
  };

  return (
    <>
      <Swiper
        slidesPerView={slidesNumber}
        spaceBetween={10}
        slidesPerGroup={slidesNumber}
        navigation={true}
        className="swiper__navigation"
      >
        {data.map(
          (movie) =>
            movie.poster_path && (
              <SwiperSlide
                key={movie.id}
                className="wrapper__navigation"
                onClick={() => seeMovieInfo(movie.id)}
              >
                <Link>
                  <Image
                    src={`${IMAGE_URL}/w300/${
                      isPoster ? movie.poster_path : movie.backdrop_path
                    }`}
                    alt={movie.title}
                  />
                  <Text fontSize="md" align="center" mt={1}>
                    {movie.title}
                  </Text>
                </Link>
              </SwiperSlide>
            )
        )}
      </Swiper>
    </>
  );
}

export default SwipeList;
