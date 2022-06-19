import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import {
  FormControl,
  InputRightElement,
  InputGroup,
  Heading,
  Flex,
  Button,
  Input,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { yupResolver } from "@hookform/resolvers/yup";

import { auth, db } from "../firebase";
import { joinSchema } from "../src/schema";
import { IJoinForm } from "../src/interfaces";
import ErrorMessage from "../src/components/Account/ErrorMessage";

const Join: NextPage = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const errorToast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IJoinForm>({ resolver: yupResolver(joinSchema) });

  const saveUserToDB = async (id: string, username: string) => {
    const dbInfo = {
      id,
      username: username,
      friends: [],
      movies: { watch: [], good: [], bad: [] },
      genres: {},
    };

    try {
      await setDoc(doc(db, "users", id), dbInfo);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const onSubmit: SubmitHandler<IJoinForm> = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async () => {
        const user = auth.currentUser;
        // DB에 사용자 정보 저장
        await saveUserToDB(user?.uid as string, data.username);
        // 홈으로 이동
        router.push("/");
      })
      .catch((e) => {
        if (e.code === "auth/email-already-in-use") {
          errorToast({
            title: "해당 이메일은 가입되어 있습니다",
            description:
              "해당 이메일은 사용 중입니다. 예전에 가입하신 적이 있을 수 있으니 회원가입이 아닌 로그인을 해주시기 바랍니다. 만약 새로 가입하시는 경우, 이메일을 다시 한번 확인하시거나 다른 이메일을 사용주세요.",
            status: "error",
            duration: 15000,
            isClosable: true,
          });
        }
        console.log(e.message);
      });
  };

  const clickShow = () => setShow(!show);

  return (
    <>
      <Flex direction="column" justify="center" alignItems="center">
        <Heading size="2xl" mb="1.5rem">
          회원가입
        </Heading>

        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <Input
              placeholder="이메일"
              _placeholder={{ color: "white", opacity: 0.7 }}
              {...register("email")}
            />
            <ErrorMessage message={errors?.email?.message} />

            <Input
              mt="1.2rem"
              placeholder="닉네임"
              _placeholder={{ color: "white", opacity: 0.7 }}
              {...register("username")}
            />
            <ErrorMessage message={errors?.username?.message} />

            <InputGroup size="md" mt="1.2rem">
              <Input
                placeholder="비밀번호"
                _placeholder={{ color: "white", opacity: 0.7 }}
                {...register("password")}
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
            <ErrorMessage message={errors?.password?.message} />

            <InputGroup size="md" mt="1.2rem">
              <Input
                placeholder="비밀번호 확인"
                _placeholder={{ color: "white", opacity: 0.7 }}
                {...register("confirmation")}
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
            <ErrorMessage message={errors?.confirmation?.message} />
          </FormControl>

          <Button
            type="submit"
            mt="3rem"
            bg="pink"
            color="darkBlue"
            py="1rem"
            w="100%"
          >
            가입하기
          </Button>
        </StyledForm>
      </Flex>
    </>
  );
};

const StyledForm = styled.form`
  max-width: 32rem;
  width: 80%;
`;

export default Join;
