import type { NextPage } from "next";
import styled, { css } from "styled-components";
import { Text, Heading, Flex, Button, Divider } from "@chakra-ui/react";
import ThirdPartyLogin from "../src/components/LoginSignup/ThirdPartyLogin";
import LocalLogin from "../src/components/LoginSignup/LocalLogin";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

interface LoginProps {
  slideDir: string;
}

const Login: NextPage = () => {
  const router = useRouter();

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
        as={motion.div}
        initial={false}
        // animation={
        //   slideDir === "left" ? slideLeftAnimation : slideRightAnimation
        // }
        flexDir="column"
        width="40%"
        borderRadius="0.3rem"
        align="center"
        justify="center"
        p="5rem 3rem"
        m="0 auto"
        backgroundColor="pink"
        position="relative"
        zIndex={2}
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
            router.push("/join");
          }}
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

const AnimatedFlex = styled.button<LoginProps>`
  display: flex;
  flex-direction: column;
  width: 40%;
  border-radius: 0.3rem;
  align-items: center;
  justify-content: center;
  padding: 5rem 3rem;
  background-color: pink;
  margin: 0 auto;

  animation: ${
      (props) => (props.slideDir === "left" ? "slide-left" : "slide-right")
      // if (props.slideDir === "left") {
      //   return "slide-left";
      // } else {
      //   return "slide-right";
      // }
    }
    infinite;

  /* ${(props) =>
    props.slideDir === "left"
      ? css`
          animation: slide-left 5s 1;
        `
      : css`
          animation: slide-right;
        `}; */

  /* &:active {
    animation: slide-right 1s 1;
  } */
`;
