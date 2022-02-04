import React from "react";
import {
  Input,
  Icon,
  FormControl,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { HiOutlineSearch } from "react-icons/hi";
import { SearchingProps } from "../../pages/api/useFetchMovie";

function SearchBar({ handleChange }: SearchingProps) {
  return (
    <FormControl>
      <InputGroup width="30rem">
        <Input
          onChange={handleChange}
          variant="flushed"
          placeholder="영화 제목, 감독 등을 입력해주세요"
          focusBorderColor="pink"
        />
        <InputRightElement>
          <Icon as={SearchIcon} w={5} h={5} />
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
}

export default SearchBar;
