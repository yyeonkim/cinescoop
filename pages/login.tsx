import type { NextPage } from "next";
import {
  Text,
  Heading,
  Flex,
  Button,
  Divider,
  keyframes,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";

import ThirdPartyLogin from "../src/components/LoginSignup/ThirdPartyLogin";
import LocalLogin from "../src/components/LoginSignup/LocalLogin";

const slideRightKeyframes = keyframes`
  0% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  100% {
    -webkit-transform: translateX(30vw);
            transform: translateX(30vw);
  }
`;

const slideLeftKeyframes = keyframes`
  0% {
    -webkit-transform: translateX(30vw);
            transform: translateX(30vw);
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
`;

const slideOutRightKeyframes = keyframes`
  0% {
    -webkit-transform: translateX(30vw);
            transform: translateX(30vw);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(25vw);
            transform: translateX(25vw);
    opacity: 0;
  }
`;

const slideOutLeftKeyframes = keyframes`
  0% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(-0.5vw);
            transform: translateX(-0.5vw);
    opacity: 0;
  }
`;

const slideInRightKeyframes = keyframes`
  0% {
    -webkit-transform: translateX(55vw);
            transform: translateX(55vw);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(30vw);
            transform: translateX(30vw);
    opacity: 0;
  }
`;

const slideInLeftKeyframes = keyframes`
  0% {
    -webkit-transform: translateX(55vw);
            transform: translateX(55vw);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(30vw);
            transform: translateX(30vw);
    opacity: 0;
  }
`;

const slideRight = `${slideRightKeyframes} 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`;
const slideLeft = `${slideLeftKeyframes} 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`;
const slideOutRight = `${slideOutRightKeyframes} 0.1s ease-out both`;
const slideOutLeft = `${slideOutLeftKeyframes} 0.1s ease-out both`;
const slideInRight = `${slideInRightKeyframes} 0.1s  both`;
const slideInLeft = `${slideInLeftKeyframes} 0.1s both`;

const Login: NextPage = () => {
  const router = useRouter();
  const [mode, setMode] = useState("");

  const turnToLoginMode = () => {
    setMode("login");
  };

  const turnToSignupMode = () => {
    setMode("signup");
  };

  const pinkBoxAnimation = () => {
    if (mode == "") return "";
    else return mode == "signup" ? slideRight : slideLeft;
  };

  const signupTextAnimation = () => {
    if (mode == "") return "";
    else return mode == "signup" ? slideOutLeft : slideInRight;
  };

  const loginTextAnimation = () => {
    if (mode == "") return "";
    else return mode == "login" ? slideInLeft : slideOutRight;
  };

  return (
    <Flex
      w="55vw"
      backgroundColor="brightBlue"
      mx="auto"
      position="relative"
      borderRadius="0.3rem"
      zIndex={0}
    >
      <Flex
        flexDir="column"
        width="25vw"
        h="100%"
        p="5rem 3rem"
        m="0 auto"
        position="absolute"
        zIndex={3}
        as={motion.div}
        animation={signupTextAnimation()}
        align="center"
        justify="center"
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
          onClick={() => {
            mode == "signup" ? turnToLoginMode() : turnToSignupMode();
            // router.push("/join");
          }}
        >
          회원가입
        </Button>
      </Flex>

      <Flex
        as={motion.div}
        initial={false}
        animation={pinkBoxAnimation()}
        width="25vw"
        borderRadius="0.3rem"
        p="5rem 3rem"
        m="0 auto"
        backgroundColor="pink"
        zIndex={2}
      ></Flex>

      <Flex
        flexDir="column"
        width="25vw"
        h="100%"
        p="5rem 3rem"
        m="0 auto"
        position="absolute"
        zIndex={5}
        as={motion.div}
        hidden={mode == "" ? true : false}
        animation={loginTextAnimation()}
        align="center"
        justify="center"
      >
        <Heading size="xl" mb="2rem">
          다시 오신 걸 환영합니다!
        </Heading>
        <Text textAlign="center" mb="3rem">
          Cinescoop의 서비스를 사용하기 위해 로그인해주세요
        </Text>
        <Button
          outlineColor="white"
          outline="1px solid"
          bgColor="pink"
          p="1.5rem 4rem"
          borderRadius="1.5rem"
          fontWeight="normal"
          onClick={() => {
            mode == "signup" ? turnToLoginMode() : turnToSignupMode();
            // router.push("/join");
          }}
        >
          로그인
        </Button>
      </Flex>
      <Flex
        flexDir="column"
        justify="center"
        align="center"
        flexGrow="1"
        p="7rem 7rem 5rem"
        position="relative"
        zIndex={1}
      >
        <LocalLogin />
        <Divider w="100%" my="2rem" opacity="0.2" borderColor="white" />
        <ThirdPartyLogin />
      </Flex>
    </Flex>
  );
};

export default Login;
