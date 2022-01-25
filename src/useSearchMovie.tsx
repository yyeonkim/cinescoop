import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import { movieDataState } from "./atom";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

function useSearchMovie() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [movieData, setMovieData] = useRecoilState(movieDataState);

  const query = "Jack";
  useEffect(() => {
    const getMovieList = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
        );
        setIsLoading(false);
        setMovieData(response.data);
        console.log(movieData);
      } catch (error) {
        setIsError(true);
      }
    };

    getMovieList();
  }, []);
}

export default useSearchMovie;
