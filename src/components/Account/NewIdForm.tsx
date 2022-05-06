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
  useToast,
} from "@chakra-ui/react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { getAuth, updatePassword, updateProfile } from "firebase/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";

import { IPasswordCheckForm } from "../../../src/interfaces";
import { passwordCheckSchema } from "../../schema";
import ErrorMessage from "./ErrorMessage";
import { auth } from "../../../firebase";
import ShowIcon from "../ShowIcon";

interface NewPasswordFormProps {
  onClose: any;
}

function NewIdForm({ onClose }: NewPasswordFormProps) {
  const toast = useToast();
  const user = auth.currentUser;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IPasswordCheckForm>({});

  const onPasswordUpdateSubmit: SubmitHandler<IPasswordCheckForm> = () => {
    console.log("passwordsubmitted");
    if (user != null) {
      updateProfile(user, { displayName: getValues("newId") })
        .then(() => {
          toast({
            title: "닉네임 변경 완료",
            description: "닉네임 변경이 성공적으로 이루어졌습니다.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          onClose();
        })
        .catch((error) => {
          console.log(error);
          toast({
            title: "닉네임 변경 에러",
            description:
              "닉네임 변경 도중 에러가 발생했습니다. 재로그인해서 다시 시도하시거나 조금 있다가 시도해보십시오.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(onPasswordUpdateSubmit)}>
      <Text mb="0.5rem">현재 닉네임</Text>
      <Text mb="1rem" fontSize="1.2rem">
        {user && user.providerData[0].providerId != "password"
          ? user.providerData[0].displayName
          : user.email?.slice(0, user.email.indexOf("@"))}
      </Text>
      <Text mb="0.5rem">새 닉네임</Text>
      <InputGroup mb="0.5rem">
        <Flex flexDir="column" w="100%">
          <Input
            {...register("newId")}
            size="lg"
            placeholder="새 닉네임을 입력해주세요"
          />
          <ErrorMessage message={errors?.newPassword?.message} />
        </Flex>
      </InputGroup>
      <ErrorMessage message={errors?.newPasswordCheck?.message} />
      <Button color="black" bgColor="pink" type="submit" mt="3rem">
        변경하기
      </Button>
    </StyledForm>
  );
}

export default NewIdForm;

const StyledForm = styled.form`
  width: 100%;
`;
