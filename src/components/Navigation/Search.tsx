import { Flex, Input, IconButton, SlideFade } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { inputState } from "../../atom";
import { RecoilState, useRecoilState } from "recoil";

import { SearchProps } from "./Navigation";

function Search({ version }: SearchProps) {
  const [visible, setVisible] = useState(false);
  const [inputText, setInputText] = useRecoilState(inputState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const onKeyPress = (e: any) => {
    if (e.key === "Enter") {
      Router.push({ pathname: "/searchresult" });
    }
  };

  const handleToggle = () => {
    if (inputText) {
      Router.push({ pathname: "/searchresult" });
    } else {
      setVisible(!visible);
    }
  };

  return (
    <Flex w="40%" justifyContent="right" mr={10}>
      <SlideFade in={visible} offsetX={5} unmountOnExit={true} reverse={true}>
        <Input
          onKeyPress={onKeyPress}
          onChange={handleChange}
          variant="flushed"
          placeholder="영화 제목, 감독 등을 입력해주세요"
          focusBorderColor="pink"
          w="30vw"
        />
      </SlideFade>
      <IconButton
        aria-label="Search database"
        icon={<SearchIcon />}
        onClick={handleToggle}
        background="none"
        _focus={{ outline: "none" }}
        _hover={{ backgroundColor: "pink" }}
        borderRadius="10rem"
      />
    </Flex>
  );
}

export default Search;
