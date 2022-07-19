import type { NextPage } from "next";
import { Text, Heading, Flex, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

import LocalLogin from "../src/components/LoginSignup/LocalLogin";

const Login: NextPage = () => {
  const router = useRouter();

  return (
    <Flex
      w="90%"
      maxW="1280px"
      mx="auto"
      direction={["column", "column", "column", "row"]}
      alignItems={["center", "center", "center", "stretch"]}
    >
      <Flex
        flexDir="column"
        p="5rem 3rem"
        align="center"
        justify="center"
        backgroundColor="pink"
        w={["100%", "100%", "100%", "50%"]}
      >
        <Heading size="xl" mb="2rem">
          환영합니다!
        </Heading>
        <Text
          textAlign="center"
          mb="3rem"
          whiteSpace="pre-line"
          fontSize={["sm", "sm", "sm", "md"]}
        >
          {
            "간단한 계정 정보를 입력하시고\nCinescoop의 여러 서비스들을 즐겨보세요"
          }
        </Text>
        <Button
          outlineColor="white"
          outline="1px solid"
          bgColor="pink"
          p="1.5rem 4rem"
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
        p={[
          "5rem 5rem 3rem",
          "5rem 5rem 3rem",
          "5rem 5rem 3rem",
          "7rem 7rem 5rem",
        ]}
        backgroundColor="brightBlue"
        w={["100%", "100%", "100%", "50%"]}
      >
        <LocalLogin />
      </Flex>
    </Flex>
  );
};

export default Login;
