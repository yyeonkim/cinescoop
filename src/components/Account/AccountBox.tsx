import React from "react";
import { Flex, Text, Box, useDisclosure } from "@chakra-ui/react";
import Withdrawal from "./Withdrawal";
import ChangePasswordModal from "./ChangePasswordModal";

import { useRecoilValue } from "recoil";
import { userState } from "../../atom";
import { getAuth } from "firebase/auth";

function AccountBox() {
  const disclosure1 = useDisclosure();
  const disclosure2 = useDisclosure();
  const user = useRecoilValue(userState);
  const auth = getAuth();
  const authUser = auth.currentUser;

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
        <Text fontSize="1.5rem">{user.displayName}</Text>
        {user.emailVerified && (
          <>
            <Text opacity="0.5">{user.email}</Text>
          </>
        )}

        <Text color="pink" mt="2rem" onClick={disclosure1.onOpen}>
          비밀번호 변경하기 {">"}
          <ChangePasswordModal
            isOpen={disclosure1.isOpen}
            onClose={disclosure1.onClose}
          />
        </Text>
        <Text color="pink" onClick={disclosure2.onOpen}>
          탈퇴하기 {">"}
          <Withdrawal
            isOpen={disclosure2.isOpen}
            onClose={disclosure2.onClose}
            authUser={authUser}
          />
        </Text>
      </Flex>
    </Flex>
  );
}

export default AccountBox;
