import type { NextPage } from "next";
import { Flex, Heading, Center } from "@chakra-ui/react";

import AccountBox from "../src/components/Account/AccountBox";

const MyPage: NextPage = () => {
  return (
    <Center px="2rem">
      <Flex
        direction="column"
        w="100%"
        mt="3rem"
        h={["fit-content", "45vh", "45vh"]}
        maxW="1280px"
      >
        <Heading ml="1rem" size="xl" color="pink">
          마이페이지
        </Heading>
        <AccountBox />
      </Flex>
    </Center>
  );
};

export default MyPage;
