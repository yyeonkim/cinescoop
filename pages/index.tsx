import type { NextPage } from "next";
import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  useColorModeValue,
  Button,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect } from "react";
import { sendEmailVerification } from "firebase/auth";
import { BASE_QUERY, BASE_URL } from "../src/hooks/fetching";
import { IMovie, ITrending, IGenre } from "../src/interfaces";
import PageList from "../src/components/Lists/PageList";
import SwipeList from "../src/components/Lists/SwipeList";
import GenreList from "../src/components/Lists/GenreList";
import HomeText from "../src/components/HomeText";
import Cinema from "../src/components/Cinema";
import useWindowDimensions from "../src/hooks/useWindowDimensions";
import { auth } from "../firebase";
import useFetchWatchData from "../src/hooks/useFetchWatchData";
import LoadingAnimation from "../src/components/LoadingAnimation";

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
  const user = auth.currentUser; // 현재 사용자
  const color = useColorModeValue("white", "white");
  const toast = useToast();

  const { isLoading, watchData } = useFetchWatchData(); // 찜한 영화 목록
  const { width: windowWidth } = useWindowDimensions();

  // 인증된 메일인지 확인
  useEffect(() => {
    if (user && !user?.emailVerified) {
      sendEmailVerification(user)
        .then(() => {
          toast({
            title: "메일을 보냈습니다 ✉",
            description:
              "메일을 인증해주세요. 일부 기능이 작동하지 않을 수 있습니다.",
            status: "warning",
            duration: 5000,
            isClosable: true,
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, []);

  return (
    <>
      <PageList data={trending} />
      <HomeText />

      {/* 사용자가 찜한 영화 */}
      {user && (
        <Box my={20} px={10}>
          <Heading size="lg" mb={10} mr={8}>
            찜한 영화
          </Heading>
          {isLoading ? (
            <Center>
              <LoadingAnimation />
            </Center>
          ) : watchData.length === 0 ? (
            <Center>아직 찜한 영화가 없습니다</Center>
          ) : (
            <SwipeList data={watchData} poster={false} slidesNumber={6} />
          )}
        </Box>
      )}

      {/* 상영 중인 영화 */}
      <Box bgColor="brightBlue" p={10} py={20}>
        <Flex>
          <Heading color={color} size="lg" mb={10} mr={8}>
            상영 중인 영화
          </Heading>
          <Link href="./nowplaying">
            <Button bg="pink" color="darkBlue" px={5}>
              예매하기
            </Button>
          </Link>
        </Flex>
        <Divider borderColor="gray.50" mb={10} />
        <SwipeList
          data={nowPlaying}
          poster={true}
          slidesNumber={5}
          hover={true}
          white={true}
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
          white={false}
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
