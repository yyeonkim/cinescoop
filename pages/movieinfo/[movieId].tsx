import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Center, Flex } from "@chakra-ui/react";

import useFetchMovieDetails from "../../src/hooks/useFetchMovieInfo";
import MainImageSection from "../../src/components/MovieInfo/MainImageSection";
import SimilarMovies from "../../src/components/MovieInfo/SimilarMovies";
import { movieIDState, movieInfoState } from "../../src/atom";
import Ticket from "../../src/components/MovieInfo/Ticket";
import { NextPage } from "next";
import { useEffect } from "react";
import LoadingAnimation from "../../src/components/LoadingAnimation";

const MovieInfoPage: NextPage = () => {
  const {
    query: { movieId },
  } = useRouter(); // string

  const { isLoading, isError } = useFetchMovieDetails();
  const movieInfo = useRecoilValue(movieInfoState);
  const setMovieID = useSetRecoilState(movieIDState);

  // movieId를 정수로 설정하기
  useEffect(() => {
    const id = parseInt(movieId as any, 10);
    setMovieID(id);
  }, []);

  return (
    <>
      {isLoading ? (
        <Center h="30rem">
          <LoadingAnimation />
        </Center>
      ) : (
        <Flex flexDirection="column" alignItems="center" w="100%">
          <MainImageSection filePath={movieInfo.details.backdrop_path} />
          <Ticket
            details={movieInfo.details}
            cast={movieInfo.cast}
            crew={movieInfo.crew}
            videos={movieInfo.videos}
          />
          <SimilarMovies data={movieInfo.similarMovies} />
        </Flex>
      )}
    </>
  );
};

export default MovieInfoPage;
