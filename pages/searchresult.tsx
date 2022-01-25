import type { NextPage } from "next";
import SearchBar from "../src/components/SearchBar";
import AccountBox from "../src/components/Account/AccountBox";
import { Flex, Text, Button } from "@chakra-ui/react";

const SearchResultPage: NextPage = () => {
  return (
    <Flex justifyContent="center">
      <SearchBar />
    </Flex>
  );
};

export default SearchResultPage;
