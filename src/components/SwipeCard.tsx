import { Flex, Img, Text, Box, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import "animate.css";
import HoverCard from "./HoverCard";
import { Image, Link } from "@chakra-ui/react";
import { IMovie, IMovieDetails } from "../interfaces";
// Import Swiper
import useNowDetail from "../hooks/useNowDetail";
import { IMAGE_URL } from "../hooks/fetching";
import { movieIDState } from "../atom";

interface CardProps {
  movie: IMovie | IMovieDetails;
  isPoster: boolean;
  hover: boolean;
  isWhite: boolean;
}

function SwipeCard({ movie, isPoster, hover, isWhite }: CardProps) {
  const router = useRouter();
  const color = useColorModeValue("white", "white");
  const [isHover, setIsHover] = useState(0);
  const [movieID, setMovieID] = useRecoilState(movieIDState);

  const seeMovieInfo = (id: number) => {
    setMovieID(id);
    router.push(`/movieinfo/${id}`);
  };

  return (
    <>
      {hover == true && isHover ? (
        <Flex justify="center" onMouseLeave={() => setIsHover(0)}>
          <Box
            className="animate__animated animate__zoomIn"
            zIndex={1}
            position="absolute"
          >
            <HoverCard info={movie} />
          </Box>
        </Flex>
      ) : (
        <Link color={color}>
          <Box
            onMouseOver={() => setIsHover(1)}
            onClick={() => seeMovieInfo(movie.id)}
            display="Flex"
            flexDirection="column"
            alignItems="center"
          >
            {isPoster ? (
              <Image
                src={`${IMAGE_URL}/w300/${movie.poster_path}`}
                alt={movie.title}
                objectFit="cover"
                h="450px"
                maxH="450px"
              />
            ) : (
              <Image
                src={`${IMAGE_URL}/w300/${movie.backdrop_path}`}
                alt={movie.title}
                objectFit="cover"
              />
            )}
            {isWhite ? (
              <Text fontSize="md" align="center" mt={1} color={color}>
                {movie.title}
              </Text>
            ) : (
              <Text fontSize="md" align="center" mt={1}>
                {movie.title}
              </Text>
            )}
          </Box>
        </Link>
      )}
    </>
  );
}

export default SwipeCard;
