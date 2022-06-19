import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";

import { movieIDState, movieInfoState } from "../../src/atom";

function useFetchMovieInfo() {
  const movieID = useRecoilValue(movieIDState);
  const [movieInfo, setMovieInfo] = useRecoilState(movieInfoState);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const detailRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=ko`
        );
        const creditRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=ko`
        );
        const videoRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
        );
        const similarMovieRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
        );

        setMovieInfo({
          details: detailRes.data,
          cast: creditRes.data.cast,
          crew: creditRes.data.crew,
          videos: videoRes.data.results,
          similarMovies: similarMovieRes.data.results,
        });

        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        console.log(error);
      }
    };

    getMovieDetails();
  }, [movieID]);

  return { isLoading, isError };
}

export default useFetchMovieInfo;
