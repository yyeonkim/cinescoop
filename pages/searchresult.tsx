import type { NextPage } from "next";
import { Center, Flex } from "@chakra-ui/react";

import useSearchMovie from "../src/hooks/useFetchMovie";
import SearchBar from "../src/components/SearchBar";
import GridList from "../src/components/Lists/GridList";

const SearchResultPage: NextPage = () => {
  const { movieData, handleChange } = useSearchMovie();
  return (
    <Center px="2rem">
      <Flex
        alignItems="center"
        w="100%"
        maxW="1280px"
        justifyContent="center"
        direction="column"
      >
        <Flex mb="4rem" mt="3rem">
          <SearchBar handleChange={handleChange} />
        </Flex>
        <GridList data={movieData} />
      </Flex>
    </Center>
  );
};

export default SearchResultPage;
