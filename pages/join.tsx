import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import type { NextPage } from "next";
import styled from "styled-components";
import {
  FormControl,
  Text,
  InputRightElement,
  InputGroup,
  Heading,
  Flex,
  Button,
  Input,
  Icon,
} from "@chakra-ui/react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

interface IForm {
  id: string;
  password: string;
  confirmation: string;
  email?: string;
}

const Join: NextPage = () => {
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IForm>();

  const onSubmit: SubmitHandler<IForm> = (data) => {
    console.log(data);
  };

  const clickShow = () => setShow(!show);

  console.log(errors);

  return (
    <Flex h="100vh" direction="column" justify="center" alignItems="center">
      <Heading size="2xl" mb="1.5rem">
        회원가입
      </Heading>

      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Text mt="1.2rem">아이디 *</Text>
          <Input
            {...register("id", { required: "아이디를 입력하세요" })}
            type="text"
          />
          <Text fontSize="xs" color="tomato">
            {errors?.id?.message}
          </Text>

          <Text mt="1.2rem">비밀번호 *</Text>
          <InputGroup size="md">
            <Input
              {...register("password", {
                required: "비밀번호를 입력하세요",
                minLength: {
                  value: 8,
                  message: "8자 이상 입력하세요",
                },
              })}
              type={show ? "text" : "password"}
            />
            <InputRightElement width="3rem">
              {show ? (
                <Icon boxSize="1.5rem" as={AiFillEye} onClick={clickShow} />
              ) : (
                <Icon
                  boxSize="1.5rem"
                  as={AiFillEyeInvisible}
                  onClick={clickShow}
                />
              )}
            </InputRightElement>
          </InputGroup>
          <Text fontSize="xs" color="tomato">
            {errors?.password?.message}
          </Text>
          <Text mt="1.2rem">비밀번호 확인 *</Text>
          <InputGroup size="md">
            <Input
              {...register("confirmation", {
                required: "비밀번호 확인을 입력하세요",
              })}
              type={show ? "text" : "password"}
            />
            <InputRightElement width="3rem">
              {show ? (
                <Icon boxSize="1.5rem" as={AiFillEye} onClick={clickShow} />
              ) : (
                <Icon
                  boxSize="1.5rem"
                  as={AiFillEyeInvisible}
                  onClick={clickShow}
                />
              )}
            </InputRightElement>
          </InputGroup>
          <Text fontSize="xs" color="tomato">
            {errors?.confirmation?.message}
            {watch("password") !== watch("confirmation") &&
              watch("confirmation").length !== 0 &&
              "비밀번호가 다릅니다"}
          </Text>
          <Text mt="1.2rem">이메일</Text>
          <Input {...register("email")} type="email" />
          <Text fontSize="xs" color="tomato">
            {errors?.email?.message}
          </Text>
        </FormControl>

        <Button type="submit" mt="1.5rem">
          가입하기
        </Button>
      </StyledForm>
    </Flex>
  );
};

const StyledForm = styled.form`
  max-width: 32rem;
  width: 80%;
`;

export default Join;
