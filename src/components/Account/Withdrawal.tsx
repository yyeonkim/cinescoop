import React, { useState } from "react";
import {
  Flex,
  Text,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  FormControl,
  useToast,
  ModalHeader,
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
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { deleteUser, getAuth } from "firebase/auth";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";

import { loginState, userState } from "../../atom";
import { IPasswordForm } from "../../interfaces";
import useReauthenticateUser from "../../hooks/login-signup/useReauthenticateUser";

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

  const deleteCurrentUser = (authUser: any) => {
    deleteUser(authUser)
      .then(() => {
        console.log("user delete success");
      })
      .catch((error) => console.log({ error }));
    setLogin(false);
    setUser({
      thirdParty: false,
      loginMethod: "",
      emailVerified: false,
      email: "",
      displayName: "",
      photoURL: "",
    });
    console.log("User logged out");
    router.push("/");
  };

  const onSubmit: SubmitHandler<IPasswordForm> = (data) => {
    const auth = getAuth();
    const authUser = auth.currentUser;
    if (verified) {
      authUser && deleteCurrentUser(authUser);
    } else {
      const { reauthenticate } = useReauthenticateUser(
        authUser,
        user,
        getValues("password"),
        setVerified,
        errorToast
      );
      reauthenticate();
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
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
              {user.thirdParty ? (
                <Flex>
                  {/* <Text flexGrow="1">탈퇴하기 전 마지막으로 인증해주세요.</Text> */}
                  {verified ? (
                    <Button
                      leftIcon={<AiFillCheckCircle />}
                      isDisabled={true}
                      size="lg"
                      backgroundColor="brightBlue"
                      _disabled={{ backgroundColor: "brightBlue" }}
                      _hover={{ backgroundColor: "brightBlue" }}
                    >
                      인증완료
                    </Button>
                  ) : (
                    <Button type="submit" size="lg">
                      탈퇴하기 전 인증하기
                    </Button>
                  )}
                </Flex>
              ) : (
                <>
                  <Text mr="3rem" mb="1rem">
                    비밀번호 인증
                  </Text>
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
                </>
              )}
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

export default Withdrawal;

const StyledForm = styled.form`
  width: 100%;
`;
