import { Flex, Heading } from "@chakra-ui/react";

import { IMovie } from "../../interfaces";
import SwipeList from "../Lists/SwipeList";

interface similarMoviesProps {
  data: IMovie[];
}

function SimilarMovies({ data }: similarMoviesProps) {
  return (
    <Flex
      bgColor="brightBlue"
      maxW="1280px"
      w="90%"
      minH="10rem"
      position="relative"
      zIndex={1}
      top="-8rem"
      p={["10rem 2rem", "10rem 2rem", "13rem 5rem"]}
      pr={[0, 0, "5rem"]}
      flexDir="column"
    >
      <Heading fontSize={["2xl", "2xl", "4xl"]} marginBottom="1.5rem">
        Similar Movies
      </Heading>
      <SwipeList data={data} poster={true} slidesNumber={4} isInfoPage={true} />
    </Flex>
  );
}

export default SimilarMovies;
