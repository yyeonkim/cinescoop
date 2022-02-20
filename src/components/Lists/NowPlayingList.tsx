import useFetchNow from "../../../pages/api/useFetchNow";
import { Heading, Grid, Flex, Box, Spacer, Spinner } from "@chakra-ui/react";
import NowPlayingCard from "../NowPlayingCard";
import type { Movie } from "../VerCard";

function NowPlayingList() {
  const { items, isLoading, page } = useFetchNow();

  return (
    <Flex justifyContent="center">
      <Box>
        <Flex mb={10} direction="column">
          <Heading size="lg" mb={5}>
            상영중인 영화
          </Heading>
        </Flex>
        <Grid gap={10} marginX={"auto"}>
          {items &&
            items.map((item: Movie, index: number) => (
              <NowPlayingCard key={item.id} info={item} page={page} />
            ))}
        </Grid>
        <Flex justifyContent="center">{isLoading ? <Spinner /> : ""}</Flex>
      </Box>
    </Flex>
  );
}

export default NowPlayingList;
