import React from "react";
import { useState } from "react";
import {
  Flex,
  Text,
  Button,
  Icon,
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
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useRecoilValue } from "recoil";
import { userState } from "../../atom";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
} from "firebase/auth";
import { IForm } from "../../../src/interfaces";
import { useForm } from "react-hook-form";

function Account({ isOpen, onClose }: any) {
  const [show, setShow] = useState(false);
  const user = useRecoilValue(userState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const handleClick = () => setShow(!show);
  const changePassword = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    // reauthenticateWithCredential(user, )
    // updatePassword();
  };
  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>비밀번호 변경하기</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex justify="center" flexDir="column">
            {user.thirdParty ? (
              <Text mb="3rem">
                외부 소셜 계정으로 로그인하셨습니다. 비밀번호 변경을 원하시면
                특정 소셜 계정 사이트에서 변경해주시길 바랍니다.
              </Text>
            ) : (
              <>
                <Text m="1rem">이메일</Text>
                <Input size="lg" placeholder="현재 비밀번호" mb="1rem" />
                <InputGroup>
                  <Input
                    size="lg"
                    type={show ? "text" : "password"}
                    placeholder="새 비밀번호"
                  />
                  <InputRightElement w="3rem" mt="0.25rem">
                    {show ? (
                      <Icon
                        boxSize="1.5rem"
                        as={AiFillEye}
                        onClick={handleClick}
                      />
                    ) : (
                      <Icon
                        boxSize="1.5rem"
                        as={AiFillEyeInvisible}
                        onClick={handleClick}
                      />
                    )}
                  </InputRightElement>
                </InputGroup>
                <Input size="lg" placeholder="새 비밀번호 확인" mb="3rem" />
                <Button mb="2rem" color="black" bgColor="pink">
                  변경하기
                </Button>
              </>
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default Account;
