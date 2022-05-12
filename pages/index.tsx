import type { NextPage } from "next";
import { Box, Divider, Flex, Heading } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

import { BASE_QUERY, BASE_URL } from "../src/hooks/fetching";
import { IMovie, ITrending, IGenre } from "../src/interfaces";
import PageList from "../src/components/Lists/PageList";
import SwipeList from "../src/components/Lists/SwipeList";
import GenreList from "../src/components/Lists/GenreList";
import HomeText from "../src/components/HomeText";
import Cinema from "../src/components/Cinema";
import useWindowDimensions from "../src/hooks/useWindowDimensions";
import ReserveButton from "../src/components/Buttons/ReserveButton";
import { auth, db } from "../firebase";

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
  const currentUser = auth.currentUser; // 현재 사용자
  const [watchMovies, setWatchMovies] = useState([]); // 사용자가 찜한 영화

  useEffect(() => {
    // 로그인 사용자가 있으면 찜한 영화 가져오기
    (async () => {
      if (currentUser) {
        const docRef = doc(db, "users", `${currentUser?.uid}`);
        const docSnap = await getDoc(docRef);
        const movies = docSnap?.data()?.movies.watch;
        setWatchMovies(movies);
      }
    })();
  }, []);

  const { width: windowWidth } = useWindowDimensions();

  return (
    <>
      <PageList data={trending} />
      <HomeText />

      {/* 사용자가 찜한 영화 */}
      {currentUser && watchMovies.length !== 0 && (
        <Box my={20} px={10}>
          <Heading size="lg" mb={10} mr={8}>
            찜한 영화
          </Heading>
          <SwipeList data={watchMovies} poster={false} slidesNumber={6} />
        </Box>
      )}

      {/* 상영 중인 영화 */}
      <Box bgColor="brightBlue" p={10} py={20}>
        <Flex>
          <Heading size="lg" mb={10} mr={8}>
            상영 중인 영화
          </Heading>
          <ReserveButton />
        </Flex>
        <Divider borderColor="gray.50" mb={10} />
        <SwipeList
          data={nowPlaying}
          poster={true}
          slidesNumber={5}
          hover={true}
        />
      </Box>

      {/* 영화 순위 */}
      <Box my={20} px={10}>
        <Heading size="lg" mb={10}>
          영화 순위
        </Heading>
        <SwipeList
          data={topRated}
          poster={false}
          slidesNumber={6}
          hover={true}
        />
      </Box>

      {/* 장르별 영화 */}
      <GenreList genres={genres} windowWidth={windowWidth} />
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
  let nowPlaying = [];
  for (let i = 1; i <= 3; i++) {
    const { results } = await (
      await fetch(`${BASE_URL}/movie/now_playing?${BASE_QUERY}&page=${i}`)
    ).json();
    nowPlaying.push(...results);
  }

  // Top rated movies
  const { results: topRated } = await (
    await fetch(`${BASE_URL}/movie/top_rated?${BASE_QUERY}`)
  ).json();

  // Genre ids
  const { genres } = await (
    await fetch(`${BASE_URL}/genre/movie/list?${BASE_QUERY}`)
  ).json();

  return { props: { trending, nowPlaying, topRated, genres } };
}

export default Home;
