// Import Chakra
import { Heading, Image, Text, Select } from "@chakra-ui/react";
// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import SwiperCore, { Navigation } from "swiper";
import { IMovie } from "../atom";
import { IMAGE_URL } from "../../pages/api/api";
SwiperCore.use([Navigation]);

interface ISwipeProps {
  title: string;
  data: IMovie[];
}

function SwipeList({ title, data }: ISwipeProps) {
  return (
    <>
      <Heading size="lg" mb={5}>
        {title}
      </Heading>
      <Swiper
        slidesPerView={8}
        spaceBetween={10}
        slidesPerGroup={8}
        loop={true}
        navigation={true}
        className="swiper__navigation"
      >
        {data.map((movie) => (
          <SwiperSlide key={movie.id} className="wrapper__navigation">
            <Image
              src={`${IMAGE_URL}/w200/${movie.backdrop_path}`}
              alt={movie.title}
            />
            <Text fontSize="md">{movie.title}</Text>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default SwipeList;
