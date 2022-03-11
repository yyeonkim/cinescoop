import { Flex, Img, Text, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import HoverCard from "./HoverCard";
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
  const [isHover, setIsHover] = useState(0);
  const [movieID, setMovieID] = useRecoilState(movieIDState);

  const seeMovieInfo = (id: number) => {
    setMovieID(id);
    router.push(`/movieinfo/${id}`);
  };

  const hoverMovie = (event: any) => {
    console.log("hi");
    event.target.style.transform = "scale(1.2)";
    return <HoverCard info={info} />;
  };
  const smallMovie = (event: any) => {
    console.log("hi");
    event.target.style.transform = "scale(1)";
    return (
      <Box w="20rem" bgColor="pink">
        hi{" "}
      </Box>
    );
  };

  return (
    <Flex
      flexDir="column"
      onClick={() => seeMovieInfo(info.id)}
      onMouseOver={() => setIsHover(1)}
      onMouseLeave={() => setIsHover(0)}
    >
      {isHover ? (
        <Flex justify="center">
          <Box zIndex={-1} position="absolute">
            <HoverCard info={info} />
          </Box>
        </Flex>
      ) : (
        <Box position="relative">
          <Img
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
        </Box>
      )}
    </Flex>
  );
}

export default VerCard;
export type { Movie };
const Wrapper = styled.div``;
