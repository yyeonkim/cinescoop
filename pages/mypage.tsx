import type { NextPage } from "next";
import AccountBox from "../src/components/Account/AccountBox";
import Footer from "../src/components/Footer";
import Navigation from "../src/components/Navigation/Navigation";
import { Flex, Text, Box } from "@chakra-ui/react";

const MyPage: NextPage = () => {
  return (
    <div>
      <Navigation />
      <Flex justifyContent="center">
        <Box>
          <Text ml="2rem">마이페이지</Text>
          <AccountBox />
        </Box>
      </Flex>
      찜한 목록
      <Flex position="absolute" w="100%">
        <Footer />
      </Flex>
    </div>
  );
};

export default MyPage;
