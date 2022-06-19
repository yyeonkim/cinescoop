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
import ReauthenticateForm from "./ReauthenticateForm";
import NewPasswordForm from "./NewPasswordForm";
import { getAuth } from "firebase/auth";
import { auth } from "../../../firebase";

function ChangePasswordModal({ isOpen, onClose }: any) {
  const [verified, setVerified] = useState(false);
  const user = auth.currentUser;

  return (
    <Modal
      size="xl"
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setVerified(false);
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>비밀번호 변경하기</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex justify="center" flexDir="column">
            {user && user.providerData[0].providerId != "password" ? (
              <Text mb="3rem">
                외부 소셜 계정으로 로그인하셨습니다. 비밀번호 변경을 원하시면
                특정 소셜 계정 사이트에서 변경해주시길 바랍니다.
              </Text>
            ) : (
              <>
                <ReauthenticateForm
                  verified={verified}
                  setVerified={setVerified}
                />
                <NewPasswordForm
                  verified={verified}
                  setVerified={setVerified}
                  onClose={onClose}
                />
              </>
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
export default ChangePasswordModal;
