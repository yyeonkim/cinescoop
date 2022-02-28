import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import type { NextPage } from "next";
import styled from "styled-components";
import NextLink from "next/link";
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
} from "@chakra-ui/react";
import {
  AiFillAlipaySquare,
  AiFillEye,
  AiFillEyeInvisible,
} from "react-icons/ai";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";

import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  signInWithPopup,
  TwitterAuthProvider,
} from "firebase/auth";
import {
  auth,
  facebookProvider,
  googleProvider,
  twitterProvider,
} from "../firebase";
import { loginState, userState } from "../src/atom";
import Navigation from "../src/components/Navigation/Navigation";
import facebookLogo from "../public/facebookLogo.png";
import twitterLogo from "../public/twitterLogo.svg";
import { IForm } from "../src/interfaces";

const Login: NextPage = () => {
  const [show, setShow] = useState(false);
  const [login, setLogin] = useRecoilState(loginState);
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  const bgColor = useColorModeValue("darkBlue", "white");
  const txtColor = useColorModeValue("white", "darkBlue");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IForm>();

  const setThirdPartyUser = (user: any) => {
    if (user.emailVerified) {
      user.email &&
        setUser({
          thirdParty: true,
          emailVerified: user.emailVerified,
          email: user.email,
          displayName:
            user.displayName != null
              ? user.displayName
              : user.email.slice(0, user.email.indexOf("@")),
          photoURL: user.photoURL != null ? user.photoURL : "",
        });
    } else {
      setUser({
        thirdParty: true,
        emailVerified: false,
        email: "",
        displayName: user.displayName != null ? user.displayName : "-",
        photoURL: user.photoURL != null ? user.photoURL : "",
      });
    }
  };

  const onSubmit: SubmitHandler<IForm> = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        console.log("login success");
        setLogin(true);
        setUser({
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

  const loginWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const googleUser = result.user;

        console.log("login success with Google");
        setLogin(true);
        setThirdPartyUser(googleUser);
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  const loginWithFacebook = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential?.accessToken;
        const facebookUser = result.user;

        console.log("login success with Facebook");
        setLogin(true);
        setThirdPartyUser(facebookUser);
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  const loginWithTwitter = () => {
    signInWithPopup(auth, twitterProvider)
      .then((result) => {
        const credential = TwitterAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const secret = credential?.secret;
        const twitterUser = result.user;

        console.log(credential);
        console.log("login success with Twitter");
        setLogin(true);
        setThirdPartyUser(twitterUser);
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = TwitterAuthProvider.credentialFromError(error);
        console.log(error, errorMessage, email, credential);
      });
  };

  const clickShow = () => setShow(!show);
  return (
    <>
      <Navigation search={true} />
      <Flex w="100%" h="80vh" justify="center">
        <Flex
          px="5rem"
          width="50rem"
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Heading size="2xl" mb="1.5rem">
            로그인
          </Heading>

          <StyledForm method="post" onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <Text mt="1.2rem">이메일</Text>
              <Input
                {...register("email", { required: "이메일을 입력하세요" })}
                type="text"
              />
              <Text fontSize="xs" color="tomato">
                {errors?.email?.message}
              </Text>

              <Text mt="1.2rem">비밀번호</Text>
              <InputGroup size="md">
                <Input
                  {...register("password", {
                    required: "비밀번호를 입력하세요",
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
            </FormControl>

            <Button
              type="submit"
              mt="3rem"
              bg="pink"
              color="darkBlue"
              py="1rem"
              w="100%"
            >
              로그인
            </Button>
          </StyledForm>
          <Flex mt="1rem">
            <Text mr="0.5rem">아직 계정이 없나요?</Text>
            <NextLink href="/join" passHref>
              <Link textDecoration="underline">회원가입</Link>
            </NextLink>
          </Flex>
        </Flex>
        <Divider orientation="vertical" opacity="0.2" borderColor="white" />
        <Flex px="5rem" direction="column" justify="center">
          <Button
            bgColor={bgColor}
            p="0.5rem 1rem"
            h="fit-content"
            my="0.5rem"
            onClick={loginWithGoogle}
          >
            <Image
              w="2.5rem"
              src="https://img.icons8.com/color/48/000000/google-logo.png"
            />
            <Text color={txtColor} ml="1rem" fontSize="1rem">
              Continue with Google
            </Text>
          </Button>
          <Button
            bgColor={bgColor}
            p="0.5rem 1rem"
            h="fit-content"
            my="0.5rem"
            onClick={loginWithFacebook}
          >
            <Image w="2.5rem" src={facebookLogo.src} />
            <Text color={txtColor} ml="1rem" fontSize="1rem">
              Continue with Facebook
            </Text>
          </Button>
          <Button
            bgColor={bgColor}
            p="0.5rem 1rem"
            h="fit-content"
            my="0.5rem"
            onClick={loginWithTwitter}
          >
            <Image w="2.5rem" src={twitterLogo.src} />
            <Text color={txtColor} ml="1rem" fontSize="1rem">
              Continue with Twitter
            </Text>
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

const StyledForm = styled.form`
  max-width: 32rem;
  width: 100%;
`;

export default Login;
