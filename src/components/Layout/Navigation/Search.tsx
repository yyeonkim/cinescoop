import {
  Flex,
  Input,
  IconButton,
  SlideFade,
  useMediaQuery,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";
import Router from "next/router";
import { useRecoilState } from "recoil";

import { inputState } from "../../../atom";

function Search() {
  const [visible, setVisible] = useState(false);
  const [inputText, setInputText] = useRecoilState(inputState);
  const [isLargerThan641] = useMediaQuery("(min-width: 641px)");

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
    <Flex w="40%" justifyContent="right">
      <SlideFade in={visible} offsetX={5} unmountOnExit={true} reverse={true}>
        <Input
          onKeyPress={onKeyPress}
          onChange={handleChange}
          variant="flushed"
          fontSize={isLargerThan641 ? "md" : "sm"}
          placeholder={
            isLargerThan641
              ? "영화 제목, 감독 등을 입력해주세요"
              : "검색어를 입력하세요"
          }
          focusBorderColor="pink"
          w={isLargerThan641 ? "30vw" : "40vw"}
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
