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
} from "@chakra-ui/react";

interface IForm {
  id: string;
  password: string;
}

const Login: NextPage = () => {
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
        로그인
      </Heading>

      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Text mt="1.2rem">아이디</Text>
          <Input
            {...register("id", { required: "아이디를 입력하세요" })}
            type="text"
          />
          <Text fontSize="xs" color="tomato">
            {errors?.id?.message}
          </Text>

          <Text mt="1.2rem">비밀번호</Text>
          <InputGroup size="md">
            <Input
              {...register("password", {
                required: "비밀번호를 입력하세요",
              })}
              type={show ? "text" : "password"}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={clickShow}>
                {show ? "숨기기" : "보기"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Text fontSize="xs" color="tomato">
            {errors?.password?.message}
          </Text>
        </FormControl>

        <Button type="submit" mt="1.5rem">
          로그인
        </Button>
      </StyledForm>
    </Flex>
  );
};

const StyledForm = styled.form`
  max-width: 32rem;
  width: 80%;
`;

export default Login;
