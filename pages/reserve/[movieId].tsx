import { NextPage } from "next";
import { useState } from "react";
import { useQuery } from "react-query";

import Navigation from "../../src/components/Navigation/Navigation";
import { fetchCredit, fetchDetail } from "../api/useFetchGenre";
import { ICast, IMovieDetails } from "../../src/interfaces";
import MovieDetail from "../../src/components/MovieDetail";

const Reserve: NextPage = () => {
  //   const {
  //     query: { movieId },
  //   } = useRouter();
  const [movieId, setMovieId] = useState("438695");

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
        <MovieDetail
          movieId={movieId}
          detailData={detailData}
          creditData={creditData}
        />
      )}
    </>
  );
};

export default Reserve;
