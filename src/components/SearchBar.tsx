import React from "react";
import {
  Input,
  Icon,
  FormControl,
  InputGroup,
  InputRightElement,
  useMediaQuery,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import { SearchingProps } from "../hooks/useFetchMovie";

function SearchBar({ handleChange }: SearchingProps) {
  const [isLargerThan480] = useMediaQuery("(min-width: 480px)");

  return (
    <FormControl>
      <InputGroup width={["15rem", "20rem", "30rem"]}>
        <Input
          onChange={handleChange}
          variant="flushed"
          placeholder={
            isLargerThan480
              ? "영화 제목, 감독 등을 입력해주세요"
              : "영화 제목, 감독 등"
          }
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
