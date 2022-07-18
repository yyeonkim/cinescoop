import {
  VStack,
  Heading,
  Box,
  Center,
  Link,
  useMediaQuery,
} from "@chakra-ui/react";

function HomeText() {
  const [isLargerThan641] = useMediaQuery("(min-width: 641px)");

  return (
    <VStack my="3rem">
      <Heading
        whiteSpace="pre-line"
        fontSize={["xl", "xl", "3xl"]}
        color="pink"
        textAlign="center"
      >
        {isLargerThan641
          ? "친구와 영화 취향을 비교해보세요"
          : "친구와 영화 취향을\n비교해보세요"}
      </Heading>
      <Box>
        <Center
          whiteSpace="pre-line"
          fontSize={["sm", "sm", "xl"]}
          mt="2%"
          textAlign="center"
        >
          {
            "친구가 좋아하는 영화를 확인하고\n서로의 취향을 장르별로 분석해보세요"
          }
        </Center>
        <Center fontSize={["sm", "sm", "md"]} mt="4%" opacity={0.8}>
          <Link href="/moviebuddy">MovieBuddy에서 확인하기 &#x3e;</Link>
        </Center>
      </Box>
    </VStack>
  );
}

export default HomeText;
