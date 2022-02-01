import { useRecoilValue } from "recoil";
import { Flex } from "@chakra-ui/react";

import useFetchMovieDetails from "./api/useFetchMovieInfo";
import Navigation from "../src/components/Navigation/Navigation";
import MainImageSection from "../src/components/MovieInfo/MainImageSection";
import DetailsTicketBox from "../src/components/MovieInfo/DetailsTicketBox";
import RelatedVideos from "../src/components/MovieInfo/RelatedVides";
import SimilarMovies from "../src/components/MovieInfo/SimilarMovies";
import { movieInfoState } from "../src/atom";

function MovieInfoPage() {
  const { isLoading, isError } = useFetchMovieDetails();
  const movieInfo = useRecoilValue(movieInfoState);

  return (
    <>
      <Navigation />
      {isLoading ? (
        <div>loading</div>
      ) : (
        <Flex flexDirection="column" alignItems="center" w="100%">
          <MainImageSection filePath={movieInfo.details.backdrop_path} />
          <DetailsTicketBox
            details={movieInfo.details}
            cast={movieInfo.cast}
            crew={movieInfo.crew}
          />
          <RelatedVideos videos={movieInfo.videos} />
          <SimilarMovies data={movieInfo.similarMovies} />
        </Flex>
      )}
    </>
  );
}

export default MovieInfoPage;
