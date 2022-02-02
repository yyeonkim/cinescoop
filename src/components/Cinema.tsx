import {
  Center,
  Flex,
  Heading,
  Divider,
  Img,
  Text,
  Link,
} from "@chakra-ui/react";

function Cinema() {
  return (
    <Center my={20}>
      <Flex direction="column" bg="white" color="black" p={10}>
        <Heading size="lg" textAlign="center">
          영화상영관
        </Heading>
        <Divider borderColor="gray.600" mt={10} />
        <Flex>
          <Link href="https://www.cgv.co.kr/" isExternal>
            <Img src="cgv.png" alt="CGV" boxSize="10rem" objectFit="contain" />
          </Link>

          <Link href="https://www.megabox.co.kr/" isExternal>
            <Img
              src="megabox.png"
              alt="Megabox"
              boxSize="10rem"
              objectFit="contain"
            />
          </Link>

          <Link href="https://www.lottecinema.co.kr/NLCHS" isExternal>
            <Img
              src="lotte.png"
              alt="Lotte Cinema"
              boxSize="10rem"
              objectFit="contain"
            />
          </Link>
        </Flex>
        <Divider borderColor="gray.600" mb={10} />
        <Text align="center" as="b">
          CGV, 메가박스, 롯데시네마 상영 정보를 알려줍니다
        </Text>
      </Flex>
    </Center>
  );
}

export default Cinema;
