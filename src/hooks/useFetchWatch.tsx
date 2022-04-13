import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

import { IMovieDetails } from "../interfaces";
import { fetchDetail } from "./fetching";

export default function useFetchWatch() {
  const [data, setData] = useState<IMovieDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = getAuth().currentUser;

  if (user) {
    useEffect(() => {
      const currentUser = JSON.parse(localStorage.getItem("user") as any);

      currentUser.movies.watch?.map(async (id: number) => {
        const data = await fetchDetail(`${id}`);
        setData((current) => current.concat([data]));
      });
      setIsLoading(false);
    }, []);

    return { isLoading, data };
  }

  return { isLoading: false, data };
}
