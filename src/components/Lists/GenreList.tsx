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
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import SwiperCore, { Navigation } from "swiper";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useQuery } from "react-query";

import { IMovie, IGenre } from "../../interfaces";
import { genreState, movieIDState } from "../../atom";
import { fetchGenre, IMAGE_URL } from "../../hooks/fetching";
import LoadingAnimation from "../LoadingAnimation";
import { useRouter } from "next/router";

SwiperCore.use([Navigation]);

export interface IGenreProps {
  genres: IGenre[];
  windowWidth: number | null;
}

function GenreList({ genres, windowWidth }: IGenreProps) {
  const [genre, setGenre] = useRecoilState(genreState);
  const setMovieID = useSetRecoilState(movieIDState);
  const router = useRouter();

  const seeMovieInfo = (id: number) => {
    setMovieID(id);
    router.push(`/movieinfo/${id}`);
  };
  const { data, isLoading } = useQuery<IMovie[]>(["withGenre", genre], () =>
    fetchGenre(genre.id)
  );

  const selectGenre = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value, selectedOptions },
    } = event;
    const selectedGenre = {
      id: value,
      name: selectedOptions[0].text,
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
        <NextLink href={`/genre`} passHref>
          <Link align="right">
            더보기
            <ChevronRightIcon />
          </Link>
        </NextLink>
      </Flex>
      {isLoading ? (
        <Flex justifyContent="center" h="10rem" alignItems="center">
          <LoadingAnimation />
        </Flex>
      ) : (
        <Swiper
          slidesPerView={6}
          spaceBetween={10}
          slidesPerGroup={6}
          loop={false}
          navigation={true}
          breakpoints={{
            // when window width is >= 480px
            480: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            // when window width is >= 770px
            770: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            // when window width is >= 1025px
            1025: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
          }}
          className="swiper__navigation"
        >
          {data?.map(
            (movie: IMovie) =>
              movie.backdrop_path && (
                <SwiperSlide
                  key={movie.id}
                  className="wrapper__navigation"
                  onClick={() => seeMovieInfo(movie.id)}
                >
                  <NextLink href={`movieinfo/${movie.id}`} passHref>
                    <Link>
                      <Image
                        src={`${IMAGE_URL}/w300/${
                          windowWidth && windowWidth > 480
                            ? movie.backdrop_path
                            : movie.poster_path
                        }`}
                        alt={movie.title}
                      />
                      <Text fontSize="md" align="center" mt={1}>
                        {movie.title}
                      </Text>
                    </Link>
                  </NextLink>
                </SwiperSlide>
              )
          )}
        </Swiper>
      )}
    </Box>
  );
}
export default GenreList;
