import { Flex, Img, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import styled from "styled-components";
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

  const [movieID, setMovieID] = useRecoilState(movieIDState);

  const seeMovieInfo = (id: number) => {
    setMovieID(id);
    router.push(`/movieinfo/${id}`);
  };

  return (
    <Flex flexDir="column" onClick={() => seeMovieInfo(info.id)}>
      <Img
        cursor="pointer"
        _hover={{ backgroundColor: "pink" }}
        objectFit="cover"
        src={`https:www.themoviedb.org/t/p/w1280${info.poster_path}`}
        maxW="100%"
        minH="75%"
        maxH="75%"
        borderRadius={5}
      />

      <Text textAlign="center" mb="0" fontSize="0.9rem">
        {info.title}
      </Text>
    </Flex>
  );
}

export default VerCard;
export type { Movie };
