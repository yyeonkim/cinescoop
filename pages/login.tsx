import type { NextPage } from "next";
import { Text, Heading, Flex, Button, Divider } from "@chakra-ui/react";
import ThirdPartyLogin from "../src/components/LoginSignup/ThirdPartyLogin";
import LocalLogin from "../src/components/LoginSignup/LocalLogin";
import { useRouter } from "next/router";

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
        flexDir="column"
        width="25vw"
        h="100%"
        p="5rem 3rem"
        m="0 auto"
        position="absolute"
        zIndex={3}
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
            router.push("/join");
          }}
        >
          회원가입
        </Button>
      </Flex>
      <Flex
        initial={false}
        width="25vw"
        borderRadius="0.3rem"
        p="5rem 3rem"
        m="0 auto"
        backgroundColor="pink"
        zIndex={2}
      />
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