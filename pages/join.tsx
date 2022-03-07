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
  SimpleGrid,
} from "@chakra-ui/react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useRecoilState } from "recoil";

import { auth, db } from "../firebase";
import { loginState, userState } from "../src/atom";
import Navigation from "../src/components/Navigation/Navigation";

interface IForm {
  id: string;
  password: string;
  confirmation: string;
  email: string;
}

interface IUserMovie {
  id: string;
}

interface INewUser {
  uid: string;
  username: string;
  movies: IUserMovie[] | [];
}

const Join: NextPage = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [login, setLogin] = useRecoilState(loginState);
  const [user, setUser] = useRecoilState(userState);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IForm>();

  const saveUserToDB = async (id: string, username: string) => {
    //user id로 document id 만들기(set())
    //third party user도 계정 추가할 수 있도록 하는 함수 필요(먼저 존재하는 유저인지 확인해야함!)
    try {
      await addDoc(collection(db, "users"), { id, username, movies: [] });
      console.log("complete to save");
      router.push("/");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const onSubmit: SubmitHandler<IForm> = (data) => {
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

  const list = ["a", "b", "c"];

  return (
    <>
      <Navigation search={true} />
      <Flex h="100vh" direction="column" justify="center" alignItems="center">
        <Heading size="2xl" mb="1.5rem">
          회원가입
        </Heading>

        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <Text mt="1.2rem">이메일 *</Text>
            <Input
              {...register("email", { required: "이메일을 입력하세요" })}
              type="email"
            />
            <Text fontSize="xs" color="tomato">
              {errors?.email?.message}
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
