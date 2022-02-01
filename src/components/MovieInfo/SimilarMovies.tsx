import { Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import { IMovie } from "../../interfaces";
import SwipeList from "../lists/SwipeList";

interface similarMoviesProps {
  data: IMovie[];
}

function SimilarMovies({ data }: similarMoviesProps) {
  return (
    <Flex
      bgColor="brightBlue"
      w="80%"
      minH="10rem"
      position="relative"
      zIndex={1}
      top="-5rem"
      padding="8rem 5rem"
      flexDir="column"
    >
      <Heading>Similar Movies</Heading>
      <SwipeList data={data} poster={true} slidesNumber={4} />
    </Flex>
  );
}

export default SimilarMovies;
