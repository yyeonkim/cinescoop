import type { NextPage } from "next";
import { Box } from "@chakra-ui/react";

import { BASE_URL } from "../src/hooks/fetching";
import { IGenre } from "../src/interfaces";
import GenrePlusList from "../src/components/Lists/GenrePlusList";
import ScrollTopButton from "../src/components/ScrollTopButton";

interface IProps {
  genres: IGenre[];
}

const Genre: NextPage<IProps> = ({ genres }) => {
  return (
    <>
      <GenrePlusList genres={genres} />
      <Box position="fixed" bottom="2rem" right="2rem">
        <ScrollTopButton />
      </Box>
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
