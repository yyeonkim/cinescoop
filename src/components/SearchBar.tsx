import React from "react";
import {
  Flex,
  Text,
  Input,
  Button,
  IconButton,
  FormControl,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { HiOutlineSearch } from "react-icons/hi";

function SearchBar() {
  return (
    <FormControl>
      <InputGroup width="30rem">
        <Input variant="flushed" placeholder="search" />
        <InputRightElement>
          <IconButton
            icon={<HiOutlineSearch />}
            aria-label="search"
            size="lg"
            background="none"
          />
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
}

export default SearchBar;
