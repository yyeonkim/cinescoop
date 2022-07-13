import { Flex, Heading, useMediaQuery } from "@chakra-ui/react";

import { IMovie } from "../../interfaces";
import SwipeList from "../Lists/SwipeList";

interface similarMoviesProps {
  data: IMovie[];
}

function SimilarMovies({ data }: similarMoviesProps) {
  const [isLargerThan641] = useMediaQuery("(min-width: 641px)");

  return (
    <Flex
      bgColor="brightBlue"
      maxW="1280px"
      w="90%"
      minH="10rem"
      position="relative"
      zIndex={1}
      top="-8rem"
      padding={isLargerThan641 ? "13rem 5rem" : "10rem 1rem 0"}
      flexDir="column"
    >
      <Heading fontSize={isLargerThan641 ? "4xl" : "2xl"} marginBottom="1.5rem">
        Similar Movies
      </Heading>
      <SwipeList data={data} poster={true} slidesNumber={4} />
    </Flex>
  );
}

export default SimilarMovies;
