import type { NextPage } from "next";
import { Flex } from "@chakra-ui/react";

import useSearchMovie from "../src/hooks/useFetchMovie";
import SearchBar from "../src/components/SearchBar";
import GridList from "../src/components/Lists/GridList";
import Navigation from "../src/components/Navigation/Navigation";

const SearchResultPage: NextPage = () => {
  const { movieData, handleChange } = useSearchMovie();
  return (
    <div>
      <Navigation num={0} />
      <Flex align="center" justifyContent="center" direction="column">
        <Flex mb="4rem" mt="3rem">
          <SearchBar handleChange={handleChange} />
        </Flex>
        <GridList data={movieData} columnNum={4} rowNum={4} width={"50rem"} />
      </Flex>
    </div>
  );
};

export default SearchResultPage;
