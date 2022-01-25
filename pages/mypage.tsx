import type { NextPage } from "next";
import AccountBox from "../src/components/Account/AccountBox";
import Footer from "../src/components/Footer";
import { Flex } from "@chakra-ui/react";

const MyPage: NextPage = () => {
  return (
    <div>
      <Flex justifyContent="center">
        <AccountBox />
      </Flex>
      <Footer />
    </div>
  );
};

export default MyPage;
