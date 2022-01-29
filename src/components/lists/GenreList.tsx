import { useEffect } from "react";
// Import Chakra
import {
  Heading,
  Image,
  Text,
  Select,
  Flex,
  Box,
  Spacer,
  Link,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import SwiperCore, { Navigation } from "swiper";
import { useRecoilState } from "recoil";
import { useQuery, QueryClient } from "react-query";

import { IMovie, IGenre } from "../../interfaces";
import { genreState } from "../../atom";
import { fetchGenre, IMAGE_URL } from "../../../pages/api/useFetchGenre";
SwiperCore.use([Navigation]);

interface IGenreProps {
  genres: IGenre[];
}

function GenreList({ genres }: IGenreProps) {
  const [genre, setGenre] = useRecoilState(genreState);
  const { data, isLoading, refetch } = useQuery<IMovie[]>(
    ["withGenre", genre],
    () => fetchGenre(genre.id)
  );

  const selectGenre = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { selectedIndex } = event.currentTarget.options;
    const selectedGenre = {
      id: event.currentTarget.options[selectedIndex].value,
      name: event.currentTarget.options[selectedIndex].text,
    };
    setGenre(selectedGenre);
  };

  return (
    <Box px={10}>
      <Flex alignItems="center" mb={10}>
        <Heading size="lg" mr={10}>
          장르별 영화
        </Heading>
        <Select size="sm" w="7rem" onChange={selectGenre}>
          {genres.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </Select>
        <Spacer />
        <Link
          align="right"
          onClick={() => {
            console.log("click");
          }}
        >
          더보기
          <ChevronRightIcon />
        </Link>
      </Flex>
      {isLoading ? (
        <Text>...Loading</Text>
      ) : (
        <Swiper
          slidesPerView={6}
          spaceBetween={10}
          slidesPerGroup={6}
          loop={false}
          navigation={true}
          className="swiper__navigation"
        >
          {data?.map((movie: IMovie) => (
            <SwiperSlide key={movie.id} className="wrapper__navigation">
              <Image
                src={`${IMAGE_URL}/w300/${movie.backdrop_path}`}
                alt={movie.title}
              />
              <Text fontSize="md" align="center" mt={1}>
                {movie.title}
              </Text>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Box>
  );
}
export default GenreList;
