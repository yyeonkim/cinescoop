import type { NextPage } from "next";
import AccountBox from "../src/components/Account/AccountBox";
import Footer from "../src/components/Footer";
import Navigation from "../src/components/Navigation/Navigation";
import { Flex, Text, Box } from "@chakra-ui/react";

const MyPage: NextPage = () => {
  return (
    <div>
      <Navigation num={1} />
      <Flex justifyContent="center">
        <Box>
          <Text ml="3rem" color="pink">
            마이페이지
          </Text>
          <AccountBox />
        </Box>
      </Flex>
    </div>
  );
};

export default MyPage;
