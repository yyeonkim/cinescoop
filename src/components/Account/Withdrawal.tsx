import React from "react";
import {
  Flex,
  Text,
  Button,
  Box,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

function Account({ isOpen, onClose }: any) {
  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>회원탈퇴</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex justify="center" flexDir="column">
            <Flex m="1rem">
              <Text mr="3rem" mb="1rem">
                아이디
              </Text>
              <Text>id</Text>
            </Flex>
            <Input size="lg" placeholder="비밀번호" mb="3rem" />
            <Button
              mb="2rem"
              color="black"
              bgColor="pink"
              background="none"
              _focus={{ outline: "none" }}
              _hover={{ backgroundColor: "white" }}
            >
              회원탈퇴
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default Account;
