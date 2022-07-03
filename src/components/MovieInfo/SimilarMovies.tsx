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
      w="70%"
      minH="10rem"
      position="relative"
      zIndex={1}
      top="-8rem"
      padding="13rem 5rem"
      flexDir="column"
    >
      <Heading marginBottom="1.5rem">Similar Movies</Heading>
      <SwipeList data={data} poster={true} slidesNumber={4} />
    </Flex>
  );
}

export default SimilarMovies;
