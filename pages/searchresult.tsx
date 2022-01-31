import type { NextPage } from "next";
import useSearchMovie from "./api/useFetchMovie";
import SearchBar from "../src/components/SearchBar";
import GridList from "../src/components/GridList";
import { Flex, Text, Button } from "@chakra-ui/react";

const SearchResultPage: NextPage = () => {
  const { movieData, handleChange } = useSearchMovie();
  return (
    <div>
      <Flex align="center" justifyContent="center" direction="column">
        <Flex mb="3rem">
          <SearchBar handleChange={handleChange} />
        </Flex>
        <GridList data={movieData} columnNum={4} rowNum={4} width={30} />
      </Flex>
    </div>
  );
};

export default SearchResultPage;
