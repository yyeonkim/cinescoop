import { useEffect, useState } from "react";

import { IMovieDetails } from "../interfaces";
import { fetchDetail } from "./fetching";

export default function useFetchWatch() {
  const [data, setData] = useState<IMovieDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const {
      movies: { watch },
    } = JSON.parse(localStorage.getItem("user") as any);

    watch?.map(async (id: number) => {
      const data = await fetchDetail(`${id}`);
      setData((current) => current.concat([data]));
    });
    setIsLoading(false);
  }, []);

  return { isLoading, data };
}
