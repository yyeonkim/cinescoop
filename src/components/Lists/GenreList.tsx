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
import NextLink from "next/link";
// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import SwiperCore, { Navigation } from "swiper";
import { useRecoilState } from "recoil";
import { useQuery } from "react-query";

import { IMovie, IGenre } from "../../interfaces";
import { genreState } from "../../atom";
import { fetchGenre, IMAGE_URL } from "../../../pages/api/useFetchGenre";
SwiperCore.use([Navigation]);

export interface IGenreProps {
  genres: IGenre[];
}

function GenreList({ genres }: IGenreProps) {
  const [genre, setGenre] = useRecoilState(genreState);
  const { data, isLoading } = useQuery<IMovie[]>(["withGenre", genre], () =>
    fetchGenre(genre.id)
  );

  const selectGenre = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { selectedIndex } = event.currentTarget.options;
    const currentOption = event.currentTarget.options[selectedIndex];
    const selectedGenre = {
      id: currentOption.value,
      name: currentOption.text,
    };
    setGenre(selectedGenre);
  };

  return (
    <Box px={10}>
      <Flex alignItems="center" mb={10}>
        <Heading size="lg" mr={10}>
          장르별 영화
        </Heading>
        <Select size="sm" w="7rem" value={genre.id} onChange={selectGenre}>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </Select>
        <Spacer />
        <NextLink href={`/genre/${genre.id}`} passHref>
          <Link align="right">
            더보기
            <ChevronRightIcon />
          </Link>
        </NextLink>
      </Flex>
      {isLoading ? (
        <Text>Loading...</Text>
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
              <NextLink href={`movieinfo/${movie.id}`} passHref>
                <Link>
                  <Image
                    src={`${IMAGE_URL}/w300/${movie.backdrop_path}`}
                    alt={movie.title}
                  />
                  <Text fontSize="md" align="center" mt={1}>
                    {movie.title}
                  </Text>
                </Link>
              </NextLink>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Box>
  );
}
export default GenreList;
