import { NextPage } from "next";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { Flex } from "@chakra-ui/react";

import { fetchCredit, fetchDetail } from "../api/useFetchGenre";
import { ICast, IMovieDetails } from "../../src/interfaces";
import { movieIDState } from "../../src/atom";
import Navigation from "../../src/components/Navigation/Navigation";
import MovieDetail from "../../src/components/MovieDetail";
import ShowTime from "../../src/components/ShowTime";

const Reserve: NextPage = () => {
  const movieID = useRecoilValue(movieIDState);

  const { data: detailData, isLoading: detailLoading } =
    useQuery<IMovieDetails>(["detail", movieID], () => fetchDetail(movieID));

  const { data: creditData, isLoading: creditLoading } = useQuery<ICast[]>(
    ["credit", movieID],
    () => fetchCredit(movieID)
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

export async function getServerSideProps() {
  const puppeteer = require("puppeteer");
  const browser = await puppeteer.launch(); // headless 브라우저 실행
  const page = await browser.newPage(); // 새로운 페이지 열기

  await page.goto(
    "http://ticket.cgv.co.kr/Reservation/Reservation.aspx?MOVIE_CD=&MOVIE_CD_GROUP=&PLAY_YMD=&THEATER_CD=&PLAY_NUM=&PLAY_START_TM=&AREA_CD=&SCREEN_CD=&THIRD_ITEM="
  );
  await page.waitForTimeout(3000);
  const lists = await page.$$eval("#movie_list > ul > li", (lists) =>
    lists.map((list) => list)
  );
  console.log(lists);

  return {
    props: {},
  };
}
