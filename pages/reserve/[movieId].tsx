import { useEffect } from "react";
import { NextPage } from "next";
import { useQuery } from "react-query";
import {
  Center,
  Flex,
  Heading,
  Img,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";

import {
  BASE_QUERY,
  BASE_URL,
  fetchCredit,
  fetchDetail,
} from "../../src/hooks/fetching";
import { ICast, IMovieDetails } from "../../src/interfaces";
import MovieDetail from "../../src/components/MovieDetail";
import LoadingAnimation from "../../src/components/LoadingAnimation";
import { movieIDState } from "../../src/atom";

interface IReserveProps {
  isPlaying: boolean;
}

interface ICinema {
  name: string;
  logo: string;
  href: string;
}

const Reserve: NextPage<IReserveProps> = ({ isPlaying }) => {
  const {
    query: { movieId },
  } = useRouter(); // string
  const color = useColorModeValue("white", "white");
  const setMovieID = useSetRecoilState(movieIDState);

  // movieId를 정수로 설정하기
  useEffect(() => {
    const id = parseInt(movieId as any, 10);
    setMovieID(id);
  }, []);

  const { data: detailData, isLoading: detailLoading } =
    useQuery<IMovieDetails>(["detail", movieId], () => fetchDetail(movieId));
  const { data: creditData, isLoading: creditLoading } = useQuery<ICast[]>(
    ["credit", movieId],
    () => fetchCredit(movieId)
  );

  const isLoading = detailLoading || creditLoading;
  // 상영관 정보
  const cinemas: ICinema[] = [
    {
      name: "CGV",
      logo: "/cgv.png",
      href: `http://www.cgv.co.kr/search/?query=${detailData?.title}`,
    },
    {
      name: "메가박스",
      logo: "/megabox-reservation.jpg",
      href: `https://www.megabox.co.kr/movie?searchText=${detailData?.title}`,
    },
    {
      name: "롯데시네마",
      logo: "/lotte.png",
      href: "https://www.lottecinema.co.kr/NLCHS/Ticketing",
    },
  ];

  return (
    <>
      {isLoading ? (
        <Flex justifyContent="center" h="20rem" alignItems="center">
          <LoadingAnimation />
        </Flex>
      ) : (
        <Flex direction="column" alignItems="center" w="100%" px={10}>
          {/* 상영관 정보 */}
          <Flex w="100%" mt={10} flexDir="column" maxW="1200px">
            <Heading mb={10} mr={10} size="lg" textAlign="center">
              상영관을 선택하세요
            </Heading>
            {isPlaying ? (
              <Flex flexWrap="wrap" justifyContent="space-between" mb={5}>
                {cinemas.map((cinema) => (
                  <Link
                    flexWrap="wrap"
                    href={cinema.href}
                    display="flex"
                    w="30%"
                    alignItems="center"
                    justifyContent="center"
                    bg="brightBlue"
                    borderRadius="1rem"
                    isExternal
                    color={color}
                  >
                    <Img
                      src={cinema.logo}
                      boxSize="5rem"
                      objectFit="contain"
                      mr={5}
                    />
                    <Heading fontSize="lg" color={color}>
                      {cinema.name}
                    </Heading>
                  </Link>
                ))}
              </Flex>
            ) : (
              <Center>상영하는 영화관이 없습니다 😭</Center>
            )}
          </Flex>
          <MovieDetail detailData={detailData} creditData={creditData} />
        </Flex>
      )}
    </>
  );
};

export async function getServerSideProps({ query: { movieId } }: any) {
  // Get now playing movies
  let nowPlaying = [];
  for (let i = 1; i <= 3; i++) {
    const { results } = await (
      await fetch(`${BASE_URL}/movie/now_playing?${BASE_QUERY}&page=${i}`)
    ).json();
    nowPlaying.push(...results);
  }

  // 주소의 movieId와 일치하는 영화 찾기
  const index = nowPlaying.findIndex((movie) => `${movie.id}` === movieId);
  // 상영 중인 영화면 true, 아니면 false
  const isPlaying = index === -1 ? false : true;

  return { props: { isPlaying } };
}

export default Reserve;
