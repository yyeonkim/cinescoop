import type { NextPage } from "next";
import Navigation from "../src/components/Navigation/Navigation";
import NowPlayingList from "../src/components/Lists/NowPlayingList";

const NowPlaying: NextPage = () => {
  return (
    <>
      <Navigation search={true} />
      <NowPlayingList />
    </>
  );
};

export default NowPlaying;
