import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import type { NextPage } from "next";
import { useRouter } from "next/router";
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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useRecoilState } from "recoil";

import { auth, db } from "../firebase";
import { loginState, userState } from "../src/atom";
import Navigation from "../src/components/Navigation/Navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { joinSchema } from "../src/schema";
import { IJoinForm } from "../src/interfaces";
import ErrorMessage from "../src/components/Account/ErrorMessage";

const Join: NextPage = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [login, setLogin] = useRecoilState(loginState);
  const [user, setUser] = useRecoilState(userState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IJoinForm>({ resolver: yupResolver(joinSchema) });

  const saveUserToDB = async (id: string, username: string) => {
    //user id로 document id 만들기(set())
    //third party user도 계정 추가할 수 있도록 하는 함수 필요(먼저 존재하는 유저인지 확인해야함!)
    try {
      await setDoc(doc(db, "users", id), {
        id: id,
        username: username,
        movies: [],
      });
      console.log("complete to save");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const onSubmit: SubmitHandler<IJoinForm> = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        console.log(userCredential.user);
        const {
          user: { email, uid },
        } = userCredential;
        const username = email?.slice(0, email?.indexOf("@"));

        saveUserToDB(uid, username as any);
        setLogin(true);
        setUser({
          ...user,
          thirdParty: false,
          emailVerified: true,
          email: data.email,
          displayName: data.email.slice(0, data.email.indexOf("@")),
          photoURL: "",
        });
        router.push("/");
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };

  const clickShow = () => setShow(!show);

  return (
    <>
      <Navigation search={true} />
      <Flex direction="column" justify="center" alignItems="center">
        <Heading size="2xl" mb="1.5rem">
          회원가입
        </Heading>

        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <Text mt="1.2rem">이메일 *</Text>
            <Input {...register("email")} />
            <ErrorMessage message={errors?.email?.message} />
            <Text mt="1.2rem">비밀번호 *</Text>
            <InputGroup size="md">
              <Input
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
            <Text mt="1.2rem">비밀번호 확인 *</Text>
            <InputGroup size="md">
              <Input
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
