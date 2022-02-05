import { Box, Button, Divider, Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BASE_URL } from "../api/useFetchGenre";
import { IMovie, ITrending, IGenre } from "../../src/interfaces";
import Navigation from "../../src/components/Navigation/Navigation";
import GenrePlusList from "../../src/components/Lists/GenrePlusList";
import { Query } from "react-query";

export interface IProps {
  genres: IGenre[];
}

export default function genreMovies({ genres }: IProps) {
  const {
    query: { genreId },
  } = useRouter(); // path로 넘긴 genreId

  return (
    <>
      <Navigation />
      <GenrePlusList genres={genres} />
    </>
  );
}

export async function getServerSideProps() {
  // Genre ids
  const { genres } = await (
    await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=ko`
    )
  ).json();

  return { props: { genres } };
}
