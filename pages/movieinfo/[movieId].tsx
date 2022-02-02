import { useRouter } from "next/router";

export default function MovieInfo() {
  const {
    query: { movieId },
  } = useRouter();

  return <h1>Movie: {movieId}</h1>;
}
