import React from "react";
import { Flex, Text, Button, Box, useDisclosure } from "@chakra-ui/react";

import ChangePassword from "./ChangePassword";

function Account() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      bgColor="#3843CD"
      h="15rem"
      w="50rem"
      p="3rem"
      m="2rem"
      color="white"
      borderRadius="0.5rem"
    >
      <Box borderRadius="50%" w="10rem" h="10rem" bgColor="#C4C4C4"></Box>
      <Flex flexDir="column" ml="2rem">
        <Text>아이디</Text>
        <Text>이메일</Text>
        <Text onClick={onOpen}>
          비밀번호 변경하기 {">"}
          <ChangePassword isOpen={isOpen} onClose={onClose} />
        </Text>
        <Text>탈퇴하기 {">"}</Text>
      </Flex>
    </Flex>
  );
}

export default Account;
