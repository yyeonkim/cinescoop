// Import Chakra
import { Heading, Image, Text, Select } from "@chakra-ui/react";
// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import SwiperCore, { Navigation } from "swiper";
import { IMovie, IGenre, genreState } from "../atom";
import { useRecoilState } from "recoil";
import { useQuery } from "react-query";

import { fetchGenre, IMAGE_URL } from "../../pages/api/api";
SwiperCore.use([Navigation]);

interface IGenreProps {
  genres: IGenre[];
}

function GenreList({ genres }: IGenreProps) {
  const [genre, setGenre] = useRecoilState(genreState);
  const { data, isLoading } = useQuery<IMovie[]>("withGenre", () =>
    fetchGenre(genre.id)
  );

  const selectGenre = (event: React.FormEvent<HTMLSelectElement>) => {
    const { selectedIndex } = event.currentTarget.options;
    const selectedGenre = {
      id: event.currentTarget.options[selectedIndex].value,
      name: event.currentTarget.options[selectedIndex].text,
    };
    setGenre(selectedGenre);
  };

  return (
    <>
      <Heading size="lg" mb={5}>
        장르별 영화
      </Heading>
      <Select size="sm" w="7rem" placeholder={genre.name} onInput={selectGenre}>
        {genres.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </Select>
      {isLoading ? (
        <Text>...Loading</Text>
      ) : (
        <Swiper
          slidesPerView={8}
          spaceBetween={10}
          slidesPerGroup={8}
          loop={true}
          navigation={true}
          className="swiper__navigation"
        >
          {data?.map((movie: IMovie) => (
            <SwiperSlide key={movie.id} className="wrapper__navigation">
              <Image
                src={`${IMAGE_URL}/w200/${movie.backdrop_path}`}
                alt={movie.title}
              />
              <Text fontSize="md">{movie.title}</Text>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}
export default GenreList;
