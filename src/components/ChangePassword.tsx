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
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>비밀번호 변경하기</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex justify="center" flexDir="column">
            <Text m="1rem">아이디</Text>
            <Text></Text>
            <Input size="lg" placeholder="현재 비밀번호" mb="1rem" />
            <InputGroup>
              <Input
                size="lg"
                type={show ? "text" : "password"}
                placeholder="새 비밀번호"
              />
              <InputRightElement w="4.5rem">
                <Button mt="0.5rem" h="2rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Input size="lg" placeholder="새 비밀번호 확인" mb="3rem" />
            <Button mb="2rem">변경하기</Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default Account;
