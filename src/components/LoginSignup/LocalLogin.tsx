import {
  Button,
  Flex,
  FormControl,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useResetRecoilState } from "recoil";
import styled from "styled-components";
import { auth, db } from "../../../firebase";
import { userDBState } from "../../atom";
import { IForm } from "../../interfaces";
import ErrorMessage from "../Account/ErrorMessage";
import ShowIcon from "../ShowIcon";

function LocalLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const router = useRouter();
  const errorToast = useToast();
  const setUserDB = useResetRecoilState(userDBState);
  const [show, setShow] = useState(false);

  const loginSubmit: SubmitHandler<IForm> = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredential) => {
        // uid로 DB에서 사용자 정보 가져오기
        const {
          user: { uid },
        } = userCredential;
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        setUserDB(docSnap.data() as any);
        router.push("/");
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        errorToast({
          title: "로그인 실패",
          description:
            "계정이 존재하지 않거나 비밀번호가 일치하지 않습니다. 다시 시도해보십시오.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Flex flexDir="column" w="100%" align="center">
      <Heading size="xl">로그인</Heading>
      <StyledForm method="post" onSubmit={handleSubmit(loginSubmit)}>
        <FormControl>
          <Text mt="1.2rem">이메일</Text>
          <Input {...register("email")} />
          <ErrorMessage message={errors?.email?.message} />
          <Text mt="0.7rem">비밀번호</Text>
          <InputGroup size="md">
            <Input
              {...register("password")}
              type={show ? "text" : "password"}
            />
            <InputRightElement width="3rem">
              <ShowIcon show={show} setShow={setShow} />
            </InputRightElement>
          </InputGroup>
          <ErrorMessage message={errors?.password?.message} />
        </FormControl>
        <Flex justify="center" mt="4rem">
          <Button
            type="submit"
            bg="pink"
            color="white"
            outlineColor="transparent"
            outline="1px solid"
            bgColor="pink"
            p="1.5rem 4rem"
            borderRadius="1.5rem"
            fontWeight="normal"
          >
            로그인하기
          </Button>
        </Flex>
      </StyledForm>
    </Flex>
  );
}

export default LocalLogin;

const StyledForm = styled.form`
  width: 100%;
`;
