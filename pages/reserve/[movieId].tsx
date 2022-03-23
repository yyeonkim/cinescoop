import { useEffect } from "react";
import { NextPage } from "next";
import { useQuery } from "react-query";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";

import {
  BASE_QUERY,
  BASE_URL,
  fetchCredit,
  fetchDetail,
} from "../../src/hooks/fetching";
import { ICast, IMovieDetails } from "../../src/interfaces";
import Navigation from "../../src/components/Navigation/Navigation";
import MovieDetail from "../../src/components/MovieDetail";
import ShowTime from "../../src/components/ShowTime";
import LoadingAnimation from "../../src/components/LoadingAnimation";
import { movieIDState } from "../../src/atom";
import useFillButton from "../../src/hooks/useFillButton";

interface IReserveProps {
  isPlaying: boolean;
}

const Reserve: NextPage<IReserveProps> = ({ isPlaying }) => {
  const {
    query: { movieId },
  } = useRouter(); // string

  const setMovieID = useSetRecoilState(movieIDState);

  useEffect(() => {
    const id = parseInt(movieId as any, 10);
    setMovieID(id);
  }, [movieId]);

  useFillButton(movieId);

  const { data: detailData, isLoading: detailLoading } =
    useQuery<IMovieDetails>(["detail", movieId], () => fetchDetail(movieId));
  const { data: creditData, isLoading: creditLoading } = useQuery<ICast[]>(
    ["credit", movieId],
    () => fetchCredit(movieId)
  );

  const isLoading = detailLoading || creditLoading;

  return (
    <>
      <Navigation search={true} />
      {isLoading ? (
        <Flex justifyContent="center" h="20rem" alignItems="center">
          <LoadingAnimation />
        </Flex>
      ) : (
        <Flex direction="column" alignItems="center" px={20}>
          <MovieDetail detailData={detailData} creditData={creditData} />
          {isPlaying && <ShowTime />}
        </Flex>
      )}
    </>
  );
};

export async function getServerSideProps({ query: { movieId } }: any) {
  //Now playing movies
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
// export async function getServerSideProps({ query }: any) {
//   const { movieId } = query;
//   const { title } = await fetchDetail(movieId); // 예매 페이지의 영화 제목
//   const puppeteer = require("puppeteer");
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage(); // 새로운 페이지 열기

//   await page.setDefaultNavigationTimeout(0);
//   // 네이버 영화: 현재 상영 영화 페이지로 이동s
//   await page.goto("https://movie.naver.com/movie/running/current.naver");

//   // 네이버 영화: 현재 상영작 제목 가져오기
//   const titles = await page.$$eval(
//     "#content > div.article > div > div.lst_wrap > ul > li > dl > dt > a",
//     (lists: any) => lists.map((list: any) => list.textContent)
//   );
//   const index = titles.findIndex((element: any) => element === title);

//   // 상영 중인 영화가 아니면
//   if (index == -1) {
//     await browser.close();
//     return {props: {}}
//   }

//   // 네이버 영화: 예매하기 버튼 클릭
//   await page.click(
//     `#content > div.article > div:nth-child(1) > div.lst_wrap > ul > li:nth-child(${
//       index + 1
//     }) > dl > dd.info_t1 > div`
//   );

//   const areas = await page.$$eval("#rootDropBox > li > a", (lists: any) =>
//     lists.map((list: any) => list.textContent)
//   );
//   console.log(areas);

//   await browser.close();

//   return {
//     props: {},
//   };
// }
