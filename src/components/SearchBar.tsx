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
import { useRecoilState } from "recoil";
import { inputState } from "../atom";

function SearchBar() {
  const [inputText, setInputText] = useRecoilState(inputState);

  const onChange = (e: any) => {
    const { value } = e.target;
    setInputText(value);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
  };
  return (
    <FormControl>
      <InputGroup width="30rem">
        <Input onChange={onChange} variant="flushed" placeholder="search" />
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
