import { NextPage } from "next";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { Flex } from "@chakra-ui/react";

import Navigation from "../../src/components/Navigation/Navigation";
import { fetchCredit, fetchDetail } from "../api/useFetchGenre";
import { ICast, IMovieDetails } from "../../src/interfaces";
import MovieDetail from "../../src/components/MovieDetail";
import ShowTime from "../../src/components/ShowTime";
import { movieIDState } from "../../src/atom";

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
