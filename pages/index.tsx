import type { NextPage } from "next";
import { Box, Button, Divider, Flex, Heading } from "@chakra-ui/react";

import { BASE_QUERY, BASE_URL } from "./api/useFetchGenre";
import { IMovie, ITrending, IGenre } from "../src/interfaces";
import PageList from "../src/components/Lists/PageList";
import SwipeList from "../src/components/Lists/SwipeList";
import GenreList from "../src/components/Lists/GenreList";
import Navigation from "../src/components/Navigation/Navigation";
import HomeText from "../src/components/HomeText";
import Cinema from "../src/components/Cinema";
import Footer from "../src/components/Layout/Footer";

interface IHomeProps {
  trending: ITrending[];
  nowPlaying: IMovie[];
  topRated: IMovie[];
  genres: IGenre[];
}

const Home: NextPage<IHomeProps> = ({
  trending,
  nowPlaying,
  topRated,
  genres,
}) => {
  return (
    <>
      <Navigation search={true} />
      <PageList data={trending} />
      <HomeText />
      <Box bgColor="brightBlue" p={10} py={20}>
        <Flex>
          <Heading size="lg" mb={10} mr={8}>
            상영 중인 영화
          </Heading>
          <Button bg="pink" color="darkBlue" px={5}>
            예매하기
          </Button>
        </Flex>
        <Divider borderColor="gray.50" mb={10} />
        <SwipeList data={nowPlaying} poster={true} slidesNumber={5} />
      </Box>

      <Box my={20} px={10}>
        <Heading size="lg" mb={10}>
          영화 순위
        </Heading>
        <SwipeList data={topRated} poster={false} slidesNumber={6} />
      </Box>

      <GenreList genres={genres} />
      <Cinema />
    </>
  );
};

export async function getStaticProps() {
  //Trending movies
  const { results: trending } = await (
    await fetch(`${BASE_URL}/trending/movie/day?${BASE_QUERY}`)
  ).json();

  //Now playing movies
  const { results: nowPlaying } = await (
    await fetch(`${BASE_URL}/movie/now_playing?${BASE_QUERY}&page=1`)
  ).json();

  // Top rated movies
  const { results: topRated } = await (
    await fetch(`${BASE_URL}/movie/top_rated?${BASE_QUERY}&page=1`)
  ).json();

  // Genre ids
  const { genres } = await (
    await fetch(`${BASE_URL}/genre/movie/list?${BASE_QUERY}`)
  ).json();

  return { props: { trending, nowPlaying, topRated, genres } };
}

export default Home;
