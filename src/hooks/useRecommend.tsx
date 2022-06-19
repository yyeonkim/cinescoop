import { useEffect, useState } from "react";
import axios from "axios";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

function useRecommend() {
  var id = 624860;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [recommendData, setRecommendData] = useState([]);

  useEffect(() => {
    const getRecommendMovie = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const RecommendRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
        );
        setRecommendData(RecommendRes.data);

        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        console.log(error);
      }
    };

    getRecommendMovie();
  }, []);

  return { isLoading, isError, recommendData };
}

export default useRecommend;
