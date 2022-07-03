import { useEffect, useState } from "react";
import axios from "axios";
import { ICast } from "../../src/interfaces";

function useNowDetail(id: number) {
  const [movieDetail, setMovieDetail] = useState<any>([]);
  const [cast, setCast] = useState<ICast[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const detailRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&region=KR&language=ko&include_adult=true&include_image_language=ko`
        );
        const creditRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}&region=KR&language=ko&include_adult=true&include_image_language=ko`
        );

        setMovieDetail(detailRes.data);
        setCast(creditRes.data.cast);

        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        console.log(error);
      }
    };

    getMovieDetails();
  }, []);

  return { isLoading, isError, cast, movieDetail };
}

export default useNowDetail;
