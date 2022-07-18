import { Flex, Box } from "@chakra-ui/react";

import useFetchNow from "../../hooks/useFetchNow";
import LoadingAnimation from "../LoadingAnimation";
import NowPlayingCard from "../NowPlayingCard";
import type { Movie } from "../VerCard";

function NowPlayingList() {
  const { items, isLoading } = useFetchNow();

  return (
    <Flex justifyContent="center" mt="3rem">
      <Box px="4rem" borderWidth={1} borderColor="pink" maxW="1280px" w="90%">
        {items?.map((item: Movie) => {
          if (item.poster_path)
            return <NowPlayingCard key={item.id} info={item} />;
        })}
        <Flex justifyContent="center" mb={10}>
          {isLoading && <LoadingAnimation />}
        </Flex>
      </Box>
    </Flex>
  );
}

export default NowPlayingList;
