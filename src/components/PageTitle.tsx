import { Box, Flex, Heading } from "@chakra-ui/react";
import { FC } from "react";

import { IPageTitle } from "../interfaces";

const PageTitle: FC<IPageTitle> = ({ title, subtitle }) => {
  return (
    <>
      <Box
        bgColor="blue"
        w="100%"
        position="absolute"
        h="10rem"
        zIndex="-5"
        top="0"
      />
      <Flex
        flexDirection="column"
        bgColor="blue"
        pb="3rem"
        pt={["2rem", "5rem", "5rem"]}
        align="center"
        w="100%"
        mb="1rem"
      >
        <Heading as="h1" fontSize={["3xl", "5xl", "5xl"]} color="white">
          {title}
        </Heading>
        <Heading
          as="h2"
          fontSize={["sm", "md", "md"]}
          mt="1.5rem"
          color="white"
        >
          {subtitle}
        </Heading>
      </Flex>
    </>
  );
};

export default PageTitle;
