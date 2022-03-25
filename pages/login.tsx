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
  Box,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import "animate.css";

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

import { IForm } from "../src/interfaces";
import ErrorMessage from "../src/components/Account/ErrorMessage";
import icecreamScoops from "../public/icecreamScoops.png";
import ThirdPartyLogin from "../src/components/LoginSignup/ThirdPartyLogin";
import LocalLogin from "../src/components/LoginSignup/LocalLogin";

const Login: NextPage = () => {
  return (
    <Flex
      w="55vw"
      backgroundColor="brightBlue"
      mx="auto"
      position="relative"
      borderRadius="0.3rem"
    >
      <Flex
        className="animate__animated animate__slide"
        flexDir="column"
        backgroundColor="pink"
        p="5rem 3rem"
        align="center"
        justify="center"
        w="40%"
        borderRadius="0.3rem"
      >
        <Heading size="xl" mb="2rem">
          환영합니다!
        </Heading>
        <Text textAlign="center" mb="3rem">
          간단한 계정 정보를 입력하시고 Cinescoop의 여러 서비스들을 즐겨보세요
        </Text>
        <Button
          outlineColor="white"
          outline="1px solid"
          bgColor="pink"
          p="1.5rem 4rem"
          borderRadius="1.5rem"
          fontWeight="normal"
        >
          회원가입
        </Button>
      </Flex>
      <Flex
        flexDir="column"
        justify="center"
        align="center"
        flexGrow="1"
        p="7rem 7rem 5rem"
      >
        <LocalLogin />
        <Divider w="100%" my="2rem" opacity="0.2" borderColor="white" />
        <ThirdPartyLogin />
      </Flex>
    </Flex>
  );
};

export default Login;
