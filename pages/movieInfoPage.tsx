import { Flex, Image } from "@chakra-ui/react";
import { AspectRatio } from "@chakra-ui/layout";

import useFetchMovieDetails from "./api/useFetchMovieDetails";
import {
  VideosTest,
  MovieDetails,
  MovieImages,
  MovieCredits,
} from "../src/TestCase";
import Navigation from "../src/components/Navigation/Navigation";
import MainImageSection from "../src/components/MovieInfo/MainImageSection";
import DetailsTicketBox from "../src/components/MovieInfo/DetailsTicketBox";
import RelatedVideos from "../src/components/MovieInfo/RelatedVides";

function MovieInfoPage() {
  const { details, images, videos, isLoading, isError } =
    useFetchMovieDetails();

  return (
    <>
      <Navigation />
      {isLoading ? (
        <div>loading</div>
      ) : (
        <Flex flexDirection="column" alignItems="center" w="100%">
          <MainImageSection filePath={MovieDetails.backdrop_path} />
          <DetailsTicketBox details={MovieDetails} credits={MovieCredits} />
          <RelatedVideos videos={VideosTest.results} />
          <Flex bgColor="brightBlue" w="80%" minW="10rem">
            Hello
          </Flex>
        </Flex>
      )}
    </>
  );
}

export default MovieInfoPage;
