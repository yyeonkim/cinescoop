import { Text, Box, useColorModeValue, useMediaQuery } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import "animate.css";
import { Image, Link } from "@chakra-ui/react";
import { IMovie, IMovieDetails } from "../interfaces";
import { IMAGE_URL } from "../hooks/fetching";
import { movieIDState } from "../atom";

interface CardProps {
  movie: IMovie | IMovieDetails;
  isPoster: boolean;
}

function SwipeCard({ movie, isPoster }: CardProps) {
  const router = useRouter();
  const color = useColorModeValue("white", "white");
  const [isHover, setIsHover] = useState(0);
  const setMovieID = useSetRecoilState(movieIDState);
  const [isLargerThan641] = useMediaQuery("(min-width: 641px)");

  const seeMovieInfo = (id: number) => {
    setMovieID(id);
    router.push(`/movieinfo/${id}`);
  };

  return (
    <>
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
              w={["200px", "200px", "230px", "200px", "300px"]}
              h={["300px", "300px", "350px", "300px", "450px"]}
            />
          ) : (
            <Image
              src={`${IMAGE_URL}/w300/${movie.backdrop_path}`}
              alt={movie.title}
              objectFit="cover"
            />
          )}
          <Text fontSize={isLargerThan641 ? "md" : "sm"} align="center" mt={1}>
            {movie.title}
          </Text>
        </Box>
      </Link>
    </>
  );
}

export default SwipeCard;
