import { useRouter } from "next/router";

export default function genreMovies() {
  const {
    query: { genreId },
  } = useRouter(); // path로 넘긴 genreId

  return <h1>Genre Movies: {genreId}</h1>;
}
