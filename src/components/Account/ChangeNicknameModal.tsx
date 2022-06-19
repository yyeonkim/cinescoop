import React from "react";
import { useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import NewIdForm from "./NewNickNameForm";
import { auth } from "../../../firebase";

function ChangeNickNameModal({ isOpen, onClose }: any) {
  const user = auth.currentUser;

  return (
    <Modal
      size="xl"
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>닉네임 변경하기</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex justify="center" flexDir="column">
            <NewIdForm onClose={onClose} />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
export default ChangeNickNameModal;
