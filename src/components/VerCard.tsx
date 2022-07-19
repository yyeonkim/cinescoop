import { Flex, Img, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import "animate.css";

import { movieIDState } from "../atom";

interface Movie {
  adult: boolean;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
interface CardProps {
  info: Movie;
}

function VerCard({ info }: CardProps) {
  const router = useRouter();

  const setMovieID = useSetRecoilState(movieIDState);

  const seeMovieInfo = (id: number) => {
    setMovieID(id);
    router.push(`/movieinfo/${id}`);
  };

  return (
    <Flex
      w={["6rem", "8rem", "10rem"]}
      mb="1rem"
      mr="1rem"
      direction="column"
      onClick={() => seeMovieInfo(info.id)}
    >
      <Img
        cursor="pointer"
        _hover={{ backgroundColor: "pink" }}
        src={`https:www.themoviedb.org/t/p/w300${info.poster_path}`}
        w={["6rem", "8rem", "10rem"]}
        h={["9rem", "12rem", "15rem"]}
      />

      <Text textAlign="center" fontSize="sm">
        {info.title}
      </Text>
    </Flex>
  );
}

export default VerCard;
export type { Movie };
