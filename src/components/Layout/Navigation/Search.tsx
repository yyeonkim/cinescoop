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
  const [isLargerThan770] = useMediaQuery("(min-width: 770px)");

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
      <SlideFade
        in={visible}
        offsetX="1rem"
        unmountOnExit={true}
        reverse={true}
      >
        <Input
          onKeyPress={onKeyPress}
          onChange={handleChange}
          variant="flushed"
          fontSize={["sm", "sm", "md"]}
          placeholder={
            isLargerThan770
              ? "영화 제목, 감독 등을 입력해주세요"
              : "영화 제목, 감독 등"
          }
          focusBorderColor="pink"
          w={["8rem", "8rem", "18rem"]}
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
