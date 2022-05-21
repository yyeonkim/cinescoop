import React from "react";
import { Flex, Text, Link } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";
import logo from "../../../public/logo.png";

function Footer() {
  const color = useColorModeValue("white", "white");
  return (
    <Flex
      backgroundColor="brightBlue"
      h="15rem"
      p="1rem"
      mt="10rem"
      justify="center"
      color={color}
    >
      <Flex flexDir="column" boxSize="12rem">
        <Image src={logo} objectFit="contain" />
      </Flex>
      <Flex flexDir="column" ml="10rem" mr="10rem">
        <Text fontSize="1.5rem" mb="0.5rem">
          Quick Menu
        </Text>
        <Link href="./">Home</Link>
        <Link href="./about">About</Link>
        <Link href="./moviebuddy">Movie Buddy</Link>
        <Link href="./nowplaying">In Theaters</Link>
      </Flex>
      <Flex flexDir="column" mr="10rem">
        <Text fontSize="1.5rem" mb="0.5rem">
          Contact
        </Text>
        <Text>YEONHEE JUNG : spig0126@gmail.com</Text>
        <Text>YOUMIN KIM : march02198@gmail.com</Text>
        <Text>YONGYEON KIM : seyeon.dev@gmail.com</Text>
      </Flex>
    </Flex>
  );
}

export default Footer;
