import useFetchNow from "../../hooks/useFetchNow";
import { Heading, Grid, Flex, Box, Spinner } from "@chakra-ui/react";
import LoadingAnimation from "../LoadingAnimation";
import NowPlayingCard from "../NowPlayingCard";
import type { Movie } from "../VerCard";

function NowPlayingList() {
  const { items, isLoading, page } = useFetchNow();

  return (
    <Flex justifyContent="center">
      <Box minW="60%">
        <Flex mb={10} direction="column">
          <Heading size="lg" mb={5}>
            상영중인 영화
          </Heading>
        </Flex>
        <Box borderWidth="0.1rem" borderColor="pink">
          <Grid mt={10} gap={10} mb={10} marginX={"auto"}>
            {items &&
              items.map((item: Movie) => (
                <>
                  <NowPlayingCard key={item.id} info={item} page={page} />
                </>
              ))}
          </Grid>
          <Flex justifyContent="center">
            {isLoading ? (
              <Box mb={10}>
                <LoadingAnimation />
              </Box>
            ) : (
              <></>
            )}
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default NowPlayingList;
