import React, { useState } from "react";
import { Flex, Button, ModalHeader } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { deleteUser, getAuth } from "firebase/auth";
import { useRouter } from "next/router";

import { IPasswordForm } from "../../interfaces";
import ReauthenticateForm from "./ReauthenticateForm";
import { auth } from "../../../firebase";

function WithdrawalModal({ isOpen, onClose }: any) {
  const { handleSubmit } = useForm<IPasswordForm>();
  const [verified, setVerified] = useState(false);
  const router = useRouter();
  const user = auth.currentUser;

  const deleteCurrentUser = (user: any) => {
    deleteUser(user)
      .then(() => {
        console.log("user delete success");
      })
      .catch((error) => console.log({ error }));
    console.log("User logged out");
    router.push("/");
  };

  const onDeleteAccountSubmit: SubmitHandler<IPasswordForm> = () => {
    if (verified) {
      user && deleteCurrentUser(user);
    }
  };

  return (
    <Modal
      size="xl"
      isOpen={isOpen}
      onClose={() => {
        setVerified(false);
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>회원탈퇴</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex justify="center" flexDir="column">
            <StyledForm onSubmit={handleSubmit(onDeleteAccountSubmit)}>
              <ReauthenticateForm
                verified={verified}
                setVerified={setVerified}
              />
              <Button
                type="submit"
                alignSelf="right"
                justifySelf="right"
                mb="2rem"
                mt="3rem"
                color="black"
                bgColor="pink"
                background="none"
                isDisabled={!verified}
                _focus={{ outline: "none" }}
                _hover={{ backgroundColor: "white" }}
              >
                회원탈퇴
              </Button>
            </StyledForm>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default WithdrawalModal;

const StyledForm = styled.form`
  width: 100%;
`;
