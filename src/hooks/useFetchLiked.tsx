import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import { likedMoviesState } from "../atom";
import { IMovieDetails } from "../interfaces";
import { fetchDetail } from "./fetching";

export default function useFetchLiked() {
  const movies = useRecoilValue(likedMoviesState); // []
  const [data, setData] = useState<IMovieDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    movies?.map(async (id) => {
      const data = await fetchDetail(`${id}`);
      setData((current) => current.concat([data]));
    });
    setIsLoading(false);
  }, []);

  return { isLoading, data };
}
