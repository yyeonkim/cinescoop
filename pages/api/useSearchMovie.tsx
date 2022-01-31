import { useEffect, useState } from "react";
import axios from "axios";
import { inputState } from "../../src/atom";
import { useRecoilState } from "recoil";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export interface SearchingProps {
  handleChange: any;
}

function useSearchMovie() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [movieData, setMovieData] = useState([]);
  const [inputText, setInputText] = useRecoilState(inputState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    const getMovieList = async () => {
      setIsLoading(true);
      setIsError(false);
      if (inputText) {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${inputText}`
          );
          setIsLoading(false);
          setMovieData(response.data.results);
        } catch (error) {
          setIsError(true);
        }
      }
    };
    getMovieList();
  }, [inputText]);

  return {
    movieData,
    setMovieData,
    inputText,
    isLoading,
    isError,
    handleChange,
  };
}

export default useSearchMovie;
