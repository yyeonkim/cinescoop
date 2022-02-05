import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { Flex } from "@chakra-ui/react";

import useFetchMovieDetails from "../api/useFetchMovieInfo";
import Navigation from "../../src/components/Navigation/Navigation";
import MainImageSection from "../../src/components/MovieInfo/MainImageSection";
import DetailsTicketBox from "../../src/components/MovieInfo/Ticket";
import RelatedVideos from "../../src/components/MovieInfo/Ticket/RelatedVidesBox";
import SimilarMovies from "../../src/components/MovieInfo/SimilarMovies";
import { movieInfoState } from "../../src/atom";
import Footer from "../../src/components/Footer";
import Ticket from "../../src/components/MovieInfo/Ticket";
import { NextPage } from "next";

const MovieInfoPage: NextPage = () => {
  const { isLoading, isError } = useFetchMovieDetails();
  const movieInfo = useRecoilValue(movieInfoState);

  console.log(movieInfo);

  return (
    <div>
      {/* <Navigation /> */}
      {isLoading ? (
        <div>loading</div>
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
      <Footer />
    </div>
  );
}

export default MovieInfoPage;