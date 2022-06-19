import { Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import NowPlayingList from "../src/components/Lists/NowPlayingList";
import PageTitle from "../src/components/PageTitle";

const NowPlaying: NextPage = () => {
  return (
    <Flex flexDir="column">
      <PageTitle
        title="Now Playing"
        subtitle="현재 극장에 상영중인 영화들을 탐색해보세요"
      />
      <NowPlayingList />
    </Flex>
  );
};

export default NowPlaying;
