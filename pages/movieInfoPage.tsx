import { Flex } from "@chakra-ui/react";

import useFetchMovieDetails from "./api/useFetchMovieInfo";
import Navigation from "../src/components/Navigation/Navigation";
import MainImageSection from "../src/components/MovieInfo/MainImageSection";
import DetailsTicketBox from "../src/components/MovieInfo/DetailsTicketBox";
import RelatedVideos from "../src/components/MovieInfo/RelatedVides";
import { useRecoilValue } from "recoil";
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
          <Flex bgColor="brightBlue" w="80%" minW="10rem">
            Hello
          </Flex>
        </Flex>
      )}
    </>
  );
}

export default MovieInfoPage;
