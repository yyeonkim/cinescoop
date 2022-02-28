
import React, { useState } from "react";
import {
  Flex,
  Text,
  Button,
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  FormControl,
  useToast,
  toast,
} from "@chakra-ui/react";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiFillCheckCircle,
} from "react-icons/ai";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IPasswordForm } from "../../interfaces";
import styled from "styled-components";
import {
  deleteUser,
  getAuth,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { useRecoilState } from "recoil";
import { loginState, userState } from "../../atom";
import { useRouter } from "next/router";

function Withdrawal({ isOpen, onClose }: any) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IPasswordForm>();
  const [show, setShow] = useState(false);
  const [verified, setVerified] = useState(false);
  const [login, setLogin] = useRecoilState(loginState);
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  const errorToast = useToast();
  const clickShow = () => setShow(!show);

  const onSubmit: SubmitHandler<IPasswordForm> = (data) => {
    const auth = getAuth();
    const authUser = auth.currentUser;
    if (verified) {
      authUser &&
        deleteUser(authUser)
          .then(() => {
            console.log("user delete success");
          })
          .catch((error) => console.log({ error }));
      setLogin(false);
      setUser({
        thirdParty: false,
        emailVerified: false,
        email: "",
        displayName: "",
        photoURL: "",
      });
      console.log("User logged out");
      router.push("/");
    } else {
      const credentials = EmailAuthProvider.credential(
        authUser.emailVerified ? authUser.email : user.displayName,
        getValues("password")
      );
      authUser &&
        reauthenticateWithCredential(authUser, credentials)
          .then(() => {
            setVerified(true);
          })
          .catch((error) => {
            console.log({ error });
            errorToast({
              title: "인증 실패",
              description:
                "입력하신 비밀번호가 현재 비밀번호와 일치하지 않습니다.",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          });
    }
  };
  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>회원탈퇴</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex justify="center" flexDir="column">
            <Text mr="3rem" mb="1rem">
              비밀번호 인증
            </Text>

            <StyledForm onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <Flex>
                  <InputGroup>
                    <Input
                      {...register("password", {
                        required: "현재 비밀번호를 입력하세요",
                      })}
                      type={show ? "text" : "password"}
                      size="lg"
                      placeholder="비밀번호"
                    />

                    <InputRightElement width="3rem">
                      {show ? (
                        <Icon
                          boxSize="1.5rem"
                          as={AiFillEye}
                          onClick={clickShow}
                        />
                      ) : (
                        <Icon
                          boxSize="1.5rem"
                          as={AiFillEyeInvisible}
                          onClick={clickShow}
                        />
                      )}
                    </InputRightElement>
                  </InputGroup>
                  {verified ? (
                    <Button
                      leftIcon={<AiFillCheckCircle />}
                      isDisabled={true}
                      size="lg"
                      ml="1rem"
                      backgroundColor="brightBlue"
                      _disabled={{ backgroundColor: "brightBlue" }}
                      _hover={{ backgroundColor: "brightBlue" }}
                    >
                      인증완료
                    </Button>
                  ) : (
                    <Button type="submit" size="lg" ml="1rem">
                      인증하기
                    </Button>
                  )}
                </Flex>

                <Text fontSize="xs" color="tomato">
                  {errors?.password?.message}
                </Text>
              </FormControl>

              <Button
                type="submit"
                display="inline-flex"
                mb="2rem"
                mt="3rem"
                color="black"
                bgColor="pink"
                background="none"
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

export default Withdrawal;

const StyledForm = styled.form`
  width: 100%;
`;
