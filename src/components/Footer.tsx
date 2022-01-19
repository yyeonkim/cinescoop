import React from "react";
import { Flex, Text, Button } from "@chakra-ui/react";

function Footer() {
  return (
    <Flex bgColor="#C4C4C4" h="15rem" p="1rem" mt="2rem" justify="center">
      <Flex flexDir="column">
        <Text fontSize="1.5rem" mb="0.5rem">
          Logo
        </Text>
        image
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
