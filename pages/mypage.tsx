import type { NextPage } from "next";
import { Flex, Box, Heading } from "@chakra-ui/react";

import AccountBox from "../src/components/Account/AccountBox";

const MyPage: NextPage = () => {
  return (
    <div>
      <Flex justifyContent="center">
        <Box mt="3rem">
          <Heading ml="1rem" size="xl" color="pink">
            마이페이지
          </Heading>
          <AccountBox />
        </Box>
      </Flex>
    </div>
  );
};

export default MyPage;
