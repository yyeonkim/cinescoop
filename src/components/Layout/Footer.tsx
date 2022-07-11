import React from "react";
import { Flex, Text, Link, Center, useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";

import logo from "../../../public/logo.png";

function Footer() {
  const color = useColorModeValue("white", "white");

  return (
    <Center backgroundColor="brightBlue" h="30%" p="2rem" mt="10rem" pb="4rem">
      <Flex w="100%" maxW="1280px" justifyContent="space-between" color={color}>
        <Flex flexDir="column" w="8rem">
          <Image src={logo} objectFit="contain" />
        </Flex>
        <Flex flexDir="column">
          <Text fontSize="1.5rem" mb="0.5rem">
            Quick Menu
          </Text>
          <Link href="./">Home</Link>
          <Link href="./moviebuddy">Movie Buddy</Link>
          <Link href="./nowplaying">In Theaters</Link>
        </Flex>
        <Flex flexDir="column">
          <Text fontSize="1.5rem" mb="0.5rem">
            Contact
          </Text>
          <Text>YEONHEE JUNG : spig0126@gmail.com</Text>
          <Text>YOUMIN KIM : march02198@gmail.com</Text>
          <Text>YONGYEON KIM : seyeon.dev@gmail.com</Text>
        </Flex>
      </Flex>
    </Center>
  );
}

export default Footer;
