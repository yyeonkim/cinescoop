import { Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import PageTitle from "../src/components/PageTitle";

const About: NextPage = () => {
  return (
    <Flex flexDir="column" w="100%">
      <PageTitle title="About" subtitle="" />
    </Flex>
  );
};

export default About;
