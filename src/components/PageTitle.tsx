import { Flex, Heading } from "@chakra-ui/react";
import { FC } from "react";
import { IPageTitle } from "../interfaces";

const PageTitle: FC<IPageTitle> = ({ title, subtitle }) => {
  return (
    <Flex
      flexDirection="column"
      position="relative"
      top="-200"
      zIndex="-1"
      bgColor="blue"
      p="15rem 6rem 5rem"
      align="center"
      w="100%"
      mb="1rem"
    >
      <Heading as="h1" size="2xl">
        {title}
      </Heading>
      <Heading as="h2" size="sm" mt="0.5rem">
        {subtitle}
      </Heading>
    </Flex>
  );
};

export default PageTitle;
