import type { NextPage } from "next";
import { Box, Button, Divider, Flex, Heading } from "@chakra-ui/react";

import { BASE_URL } from "./api/useFetchGenre";
import { IMovie, ITrending, IGenre } from "../src/interfaces";
import PageList from "../src/components/Lists/PageList";
import SwipeList from "../src/components/Lists/SwipeList";
import GenreList from "../src/components/Lists/GenreList";
import Navigation from "../src/components/Navigation/Navigation";
import HomeText from "../src/components/HomeText";
import Cinema from "../src/components/Cinema";
import Footer from "../src/components/Footer";
import GenrePlusList from "../src/components/Lists/GenrePlusList";

interface IProps {
  genres: IGenre[];
}

const Genre: NextPage<IProps> = ({ genres }) => {
  return (
    <>
      <Navigation num={0} />
      <GenrePlusList genres={genres} />
    </>
  );
};

export async function getStaticProps() {
  // Genre ids
  const { genres } = await (
    await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=ko`
    )
  ).json();

  return { props: { genres } };
}

export default Genre;
