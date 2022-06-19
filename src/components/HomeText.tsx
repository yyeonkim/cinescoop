import { VStack, Heading, Box, Center, Text, Link } from "@chakra-ui/react";

function HomeText() {
  return (
    <VStack m={20}>
      <Heading color="pink">친구와 영화 취향을 비교해보세요</Heading>
      <Box>
        <Center fontSize="xl" mt={2}>
          친구가 좋아하는 영화를 확인하고
        </Center>
        <Center fontSize="xl" mt={2}>
          서로의 취향을 장르별로 분석해보세요
        </Center>
        <Center fontSize="md" mt={4} opacity={0.8}>
          <Link href="/moviebuddy">MovieBuddy에서 확인하기 &#x3e;</Link>
        </Center>
      </Box>
    </VStack>
  );
}

export default HomeText;
