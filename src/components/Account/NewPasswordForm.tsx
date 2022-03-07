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
import { getAuth, updatePassword } from "firebase/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";

import { IPasswordCheckForm } from "../../../src/interfaces";
import { passwordCheckSchema } from "../../schema";
import ErrorMessage from "./ErrorMessage";

interface NewPasswordFormProps {
  verified: boolean;
  setVerified: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: any;
}

function NewPasswordForm({
  verified,
  setVerified,
  onClose,
}: NewPasswordFormProps) {
  const [show, setShow] = useState(false);
  const toast = useToast();
  const auth = getAuth();
  const authUser = auth.currentUser;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IPasswordCheckForm>({
    resolver: yupResolver(passwordCheckSchema),
  });

  const handleClick = () => setShow(!show);

  const onPasswordUpdateSubmit: SubmitHandler<IPasswordCheckForm> = () => {
    console.log("passwordsubmitted");
    if (verified && authUser != null) {
      updatePassword(authUser, getValues("newPasswordCheck"))
        .then(() => {
          toast({
            title: "비밀번호 변경 완료",
            description: "비밀번호 변경이 성공적으로 이루어졌습니다.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          setVerified(false);
          onClose();
        })
        .catch((error) => {
          console.log(error);
          toast({
            title: "비밀번호 변경 에러",
            description:
              "비밀번호 변경 도중 에러가 발생했습니다. 재로그인해서 다시 시도하시거나 조금 있다가 시도해보십시오.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(onPasswordUpdateSubmit)}>
      <Text mb="0.5rem">새 비밀번호 및 확인</Text>
      <InputGroup mb="0.5rem">
        <Flex flexDir="column" w="100%">
          <Input
            {...register("newPassword")}
            size="lg"
            type={show ? "text" : "password"}
            placeholder="새 비밀번호를 입력해주세요"
          />
          <ErrorMessage message={errors?.newPassword?.message} />
        </Flex>
        <InputRightElement w="3rem" mt="0.25rem">
          {show ? (
            <Icon boxSize="1.5rem" as={AiFillEye} onClick={handleClick} />
          ) : (
            <Icon
              boxSize="1.5rem"
              as={AiFillEyeInvisible}
              onClick={handleClick}
            />
          )}
        </InputRightElement>
      </InputGroup>
      <Input
        {...register("newPasswordCheck")}
        size="lg"
        placeholder="새 비밀번호 확인"
        type="password"
      />
      <ErrorMessage message={errors?.newPasswordCheck?.message} />
      <Button
        isDisabled={!verified}
        color="black"
        bgColor="pink"
        type="submit"
        mt="3rem"
      >
        변경하기
      </Button>
    </StyledForm>
  );
}

export default NewPasswordForm;

const StyledForm = styled.form`
  width: 100%;
`;
