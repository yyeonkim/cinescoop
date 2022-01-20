import React from "react";
import { Flex, Text, Button, Box, useDisclosure } from "@chakra-ui/react";
import Withdrawal from "./Withdrawal";
import ChangePassword from "./ChangePassword";

function AccountBox() {
  const disclosure1 = useDisclosure();
  const disclosure2 = useDisclosure();
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
        <Text onClick={disclosure1.onOpen}>
          비밀번호 변경하기 {">"}
          <ChangePassword
            isOpen={disclosure1.isOpen}
            onClose={disclosure1.onClose}
          />
        </Text>
        <Text onClick={disclosure2.onOpen}>
          탈퇴하기 {">"}
          <Withdrawal
            isOpen={disclosure2.isOpen}
            onClose={disclosure2.onClose}
          />
        </Text>
      </Flex>
    </Flex>
  );
}

export default AccountBox;
