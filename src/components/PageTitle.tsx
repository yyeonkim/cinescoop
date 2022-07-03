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
        p="5rem 6rem 3rem"
        align="center"
        w="100%"
        mb="1rem"
      >
        <Heading as="h1" size="3xl">
          {title}
        </Heading>
        <Heading as="h2" size="sm" mt="0.5rem">
          {subtitle}
        </Heading>
      </Flex>
    </>
  );
};

export default PageTitle;
