import type { NextPage } from "next";

import PageList from "../src/components/PageList";
import SwipeList from "../src/components/SwipeList";
import { BASE_URL, INowPlaying, ITopRated, ITrending } from "../src/atom";

interface IHomeProps {
  trending: ITrending[];
  nowPlaying: INowPlaying[];
  topRated: ITopRated[];
}

const Home: NextPage<IHomeProps> = ({ trending, nowPlaying, topRated }) => {
  return (
    <>
      <PageList data={trending} />
      <SwipeList title="상영 중인 영화" data={nowPlaying} />
      <SwipeList title="영화 순위" data={topRated} />
    </>
  );
};

export async function getServerSideProps() {
  // Trending movies
  const trendingData = await (
    await fetch(
      `${BASE_URL}/trending/movie/day?api_key=${process.env.API_KEY}&language=ko`
    )
  ).json();
  const trending = trendingData.results;

  const nowPlayingData = await (
    await fetch(
      `${BASE_URL}/movie/now_playing?api_key=${process.env.API_KEY}&language=ko&page=1`
    )
  ).json();
  const nowPlaying = nowPlayingData.results;

  const topRatedData = await (
    await fetch(
      `${BASE_URL}/movie/top_rated?api_key=${process.env.API_KEY}&language=ko&page=1`
    )
  ).json();
  const topRated = topRatedData.results;

  return { props: { trending, nowPlaying, topRated } };
}

export default Home;
