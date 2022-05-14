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
import { getAuth, updatePassword, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";

import { IPasswordCheckForm } from "../../interfaces";
import { passwordCheckSchema } from "../../schema";
import ErrorMessage from "./ErrorMessage";
import ShowIcon from "../ShowIcon";
import { auth, db } from "../../../firebase";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

interface NewNickNameProps {
  onClose: any;
}

function NewNickNameForm({ onClose }: NewNickNameProps) {
  const toast = useToast();
  const user = auth.currentUser;

  /*const changeNickName = async () => {
    const a = doc(db, "users", userId);
    await updateDoc(a, { username: "byebye" });
  };

  const onChangeNickName: SubmitHandler<IPasswordCheckForm> = () => {
    console.log("passwordsubmitted");
    if (user != null) {
      updateDoc(doc(db, "users", userId), { username: "byebye" })
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
  };*/

  return (
    <StyledForm>
      <Text mb="0.5rem">현재 닉네임</Text>
      <Text mb="1rem" fontSize="1.2rem">
        {user && user.providerData[0].providerId != "password"
          ? user.providerData[0].displayName
          : user.email?.slice(0, user.email.indexOf("@"))}
      </Text>
      <Text mb="0.5rem">새 닉네임</Text>
      <InputGroup mb="0.5rem">
        <Flex flexDir="column" w="100%">
          <Input size="lg" placeholder="새 닉네임을 입력해주세요" />
        </Flex>
      </InputGroup>

      <Button color="black" bgColor="pink" type="submit" mt="3rem">
        변경하기
      </Button>
    </StyledForm>
  );
}

export default NewNickNameForm;

const StyledForm = styled.form`
  width: 100%;
`;
