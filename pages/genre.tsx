import type { NextPage } from "next";
import useSearchMovie from "./API/useSearchMovie";
import SearchBar from "../src/components/SearchBar";
import GridList from "../src/components/GridList";
import { Flex, Text, Button } from "@chakra-ui/react";
import GenreList from "../src/components/GenreList";

const Genre: NextPage = () => {
  const { movieData, handleChange } = useSearchMovie();
  return (
    <Flex justifyContent="center" direction="column">
      <GenreList />
    </Flex>
  );
};

export default Genre;
