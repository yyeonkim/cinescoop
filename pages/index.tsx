import type { NextPage } from "next";

import PageList from "../src/components/PageList";
import SwipeList from "../src/components/SwipeList";
import { BASE_URL, ITrending } from "../src/atom";

interface IHomeProps {
  trending: ITrending[];
}

const Home: NextPage<IHomeProps> = ({ trending }) => {
  return (
    <>
      <SwipeList />
      <PageList data={trending} />
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

  return { props: { trending } };
}

export default Home;
