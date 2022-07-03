import type { NextPage } from "next";
import { Flex } from "@chakra-ui/react";

import useSearchMovie from "../src/hooks/useFetchMovie";
import SearchBar from "../src/components/SearchBar";
import GridList from "../src/components/Lists/GridList";

const SearchResultPage: NextPage = () => {
  const { movieData, handleChange } = useSearchMovie();
  return (
    <div>
      <Flex align="center" justifyContent="center" direction="column">
        <Flex mb="4rem" mt="3rem">
          <SearchBar handleChange={handleChange} />
        </Flex>
        <GridList data={movieData} columnNum={4} rowNum={4} width={"70rem"} />
      </Flex>
    </div>
  );
};

export default SearchResultPage;
