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
  Link,
  Divider,
  Image,
  useColorModeValue,
  useToast,
  Circle,
  AspectRatio,
} from "@chakra-ui/react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";

import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  signInWithPopup,
  TwitterAuthProvider,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import {
  auth,
  db,
  facebookProvider,
  googleProvider,
  twitterProvider,
} from "../firebase";
import { userDBState } from "../src/atom";
import Navigation from "../src/components/Navigation/Navigation";
import facebookLogo from "../public/facebookLogo.png";
import twitterLogo from "../public/twitterLogo.png";
import { IForm } from "../src/interfaces";
import ErrorMessage from "../src/components/Account/ErrorMessage";
import icecreamScoops from "../public/icecreamScoops.png";

const Login: NextPage = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const errorToast = useToast();
  const bgColor = useColorModeValue("darkBlue", "white");
  const txtColor = useColorModeValue("white", "darkBlue");
  const setUserDB = useSetRecoilState(userDBState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const saveThirdPartyUserToDb = async (
    id: string,
    username: string | null
  ) => {
    const dbUser = await getDoc(doc(db, "users", id));
    if (dbUser.exists()) {
      console.log("user already exists");
    } else {
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
    }
  };

  const logError = (error: any, provider: any) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = provider.credentialFromError(error);
    console.log(errorCode, errorMessage, email, credential);
  };

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

  const loginWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const googleUser = result.user;

        console.log("login success with Google");
        saveThirdPartyUserToDb(googleUser.uid, googleUser.displayName);
        router.push("/");
      })
      .catch((error) => {
        logError(error, GoogleAuthProvider);
      });
  };

  const loginWithFacebook = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const facebookUser = result.user;

        console.log("login success with Facebook");
        saveThirdPartyUserToDb(facebookUser.uid, facebookUser.displayName);
        router.push("/");
      })
      .catch((error) => {
        logError(error, FacebookAuthProvider);
      });
  };

  const loginWithTwitter = () => {
    signInWithPopup(auth, twitterProvider)
      .then((result) => {
        const twitterUser = result.user;

        console.log("login success with Twitter");
        saveThirdPartyUserToDb(twitterUser.uid, twitterUser.displayName);
        router.push("/");
      })
      .catch((error) => {
        logError(error, TwitterAuthProvider);
      });
  };

  const clickShow = () => setShow(!show);
  return (
    <>
      <Flex
        w="55vw"
        backgroundColor="brightBlue"
        minH="60rem"
        mx="auto"
        position="relative"
        paddingRight="5rem"
      >
        <AspectRatio ratio={1} w="25rem">
          <Image src={icecreamScoops.src} />
        </AspectRatio>

        <Flex flexDir="column" justify="center" alignItems="left" flexGrow="1">
          <Heading size="2xl" mb="1.5rem">
            로그인
          </Heading>
          <StyledForm method="post" onSubmit={handleSubmit(loginSubmit)}>
            <FormControl>
              <Text mt="1.2rem">이메일</Text>
              <Input {...register("email")} />
              <ErrorMessage message={errors?.email?.message} />
              <Text mt="1.2rem">비밀번호</Text>
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
            </FormControl>
            <Flex mt="5rem" alignItems="center">
              <Button
                type="submit"
                bg="pink"
                color="darkBlue"
                py="1rem"
                w="8rem"
              >
                로그인
              </Button>
              <Flex justify="right" alignItems="center" gap="1rem" flexGrow="1">
                <Circle backgroundColor="white" h="fit-content" p="0.3rem">
                  <Button onClick={loginWithGoogle} p="0">
                    <Image
                      w="2.5rem"
                      src="https://img.icons8.com/color/48/000000/google-logo.png"
                    />
                  </Button>
                </Circle>

                <Circle backgroundColor="white" h="fit-content" p="0.3rem">
                  <Button onClick={loginWithFacebook} p="0">
                    <Image w="2.5rem" src={facebookLogo.src} />
                  </Button>
                </Circle>

                <Circle backgroundColor="white" h="fit-content" p="0.3rem">
                  <Button onClick={loginWithTwitter} p="0">
                    <Image w="2.5rem" src={twitterLogo.src} />
                  </Button>
                </Circle>
              </Flex>
            </Flex>
            <Divider w="100%" my="2rem" opacity="0.2" borderColor="white" />
          </StyledForm>
          <Flex align="center" flexDir="column" mt="3rem">
            <Text fontSize="1.5rem">아직 계정이 없으신가요?</Text>
            <Button
              bg="brightBlue"
              border="1px solid"
              borderColor="pink"
              mt="1rem"
              px="2rem"
              _focus={{ outline: "none" }}
            >
              회원가입하기
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Login;

const StyledForm = styled.form`
  width: 100%;
`;
