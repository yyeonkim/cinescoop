import { useEffect } from "react";
import { NextPage } from "next";
import { useQuery } from "react-query";
import { Flex } from "@chakra-ui/react";

import { fetchCredit, fetchDetail } from "../api/useFetchGenre";
import { ICast, IMovieDetails } from "../../src/interfaces";
import Navigation from "../../src/components/Navigation/Navigation";
import MovieDetail from "../../src/components/MovieDetail";
import ShowTime from "../../src/components/ShowTime";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { movieIDState } from "../../src/atom";

const Reserve: NextPage = () => {
  const {
    query: { movieId },
  } = useRouter();

  const setMovieId = useSetRecoilState(movieIDState);

  useEffect(() => {
    const id = parseInt(movieId, 10);
    setMovieId(id);
  }, []);

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
        <span>Loading...</span>
      ) : (
        <Flex direction="column" alignItems="center" px={20}>
          <MovieDetail detailData={detailData} creditData={creditData} />
          <ShowTime />
        </Flex>
      )}
    </>
  );
};

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

//   // 네이버 영화: 예매하기 버튼 클릭
//   await page.click(
//     `#content > div.article > div:nth-child(1) > div.lst_wrap > ul > li:nth-child(${
//       index + 1
//     }) > dl > dd.info_t1 > div`
//   );
//   // const link = await page.$eval(
//   //   `#content > div.article > div:nth-child(1) > div.lst_wrap > ul > li:nth-child(${
//   //     index + 1
//   //   }) > dl > dd.info_t1 > div > a`,
//   //   (a: any) => a.href
//   // );
//   // // 네이버 영화의 예매 페이지로 이동
//   // await page.goto(link, { waitUntil: "networkidle0", timeout: 0 });

//   const areas = await page.$$eval("#rootDropBox > li > a", (lists: any) =>
//     lists.map((list: any) => list.textContent)
//   );
//   console.log(areas);

//   await browser.close();

//   return {
//     props: {},
//   };
// }
