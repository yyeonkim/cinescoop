import { Flex } from "@chakra-ui/react";

import MainImageSection from "../../src/components/MovieInfo/MainImageSection";
import SimilarMovies from "../../src/components/MovieInfo/SimilarMovies";
import Ticket from "../../src/components/MovieInfo/Ticket";
import { NextPage } from "next";
import { BASE_QUERY, BASE_URL } from "../../src/hooks/fetching";
import {
  IMovieCredits,
  IMovieDetails,
  ISimilarMovies,
  IVideo,
} from "../../src/interfaces";

interface IMovieInfoProps {
  details: IMovieDetails;
  credits: IMovieCredits;
  videos: IVideo[];
  similarMovies: ISimilarMovies[];
}

const MovieInfoPage: NextPage<IMovieInfoProps> = ({
  details,
  credits,
  videos,
  similarMovies,
}) => {
  return (
    <>
      <Flex flexDirection="column" alignItems="center" w="100%">
        <MainImageSection filePath={details?.backdrop_path} />
        <Ticket
          details={details}
          cast={credits.cast}
          crew={credits.crew}
          videos={videos}
        />
        <SimilarMovies data={similarMovies} />
      </Flex>
    </>
  );
};

// Get movie info
export async function getServerSideProps({ query: { movieId } }: any) {
  // Movie details
  const details = await (
    await fetch(`${BASE_URL}/movie/${movieId}?${BASE_QUERY}`)
  ).json();

  // Movie credits
  const credits = await (
    await fetch(`${BASE_URL}/movie/${movieId}/credits?${BASE_QUERY}`)
  ).json();

  // Movie videos
  const { results: videos } = await (
    await fetch(`${BASE_URL}/movie/${movieId}/videos?${BASE_QUERY}`)
  ).json();

  // Similar movies
  const { results: similarMovies } = await (
    await fetch(`${BASE_URL}/movie/${movieId}/similar?${BASE_QUERY}&page=1`)
  ).json();

  return { props: { details, credits, videos, similarMovies } };
}

export default MovieInfoPage;
