import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";

import { movieIDState } from "../../src/atom";

function useFetchMovieDetails() {
  const movieID = useRecoilValue(movieIDState);
  // const

  const [details, setDetails] = useState({});
  const [images, setImages] = useState({});
  const [videos, setVideos] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const detailResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
        );
        console.log(detailResponse.data);

        const imageResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieID}/images?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&include_image_language=en`
        );
        const videoResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
        );
        setImages(imageResponse.data);
        setVideos(videoResponse.data);
        setIsLoading(false);

        //console
        console.log(details);
        console.log(images);
        console.log(videos);
      } catch (error) {
        setIsError(true);
        console.log(error);
      }
    };

    getMovieDetails();
  }, [movieID]);

  return { details, images, videos, isLoading, isError };
}

export default useFetchMovieDetails;
