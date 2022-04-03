import React from "react";
import { Flex, Text, Button } from "@chakra-ui/react";
import Image from "next/image";
import logo from "../../../public/logo.png";

function Footer() {
  return (
    <Flex
      backgroundColor="brightBlue"
      h="15rem"
      p="1rem"
      mt="10rem"
      justify="center"
    >
      <Flex flexDir="column" boxSize="12rem">
        <Image src={logo} objectFit="contain" />
      </Flex>
      <Flex flexDir="column" ml="10rem" mr="10rem">
        <Text fontSize="1.5rem" mb="0.5rem">
          Quick Menu
        </Text>
        <Text>Home</Text>
        <Text>About</Text>
      </Flex>
      <Flex flexDir="column" mr="10rem">
        <Text fontSize="1.5rem" mb="0.5rem">
          Contact
        </Text>
        <Text>YEONHEE JUNG :@gmail.com </Text>
        <Text>YOUMIN KIM : dskfjelek@gmail.com</Text>
        <Text>YONGYEON KIM : @gmail.com</Text>
      </Flex>
      <Button variant="ghost" border="1px" borderColor="black">
        예매하기
      </Button>
    </Flex>
  );
}

export default Footer;