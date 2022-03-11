import { Flex, Img, Text, Box } from "@chakra-ui/react";
import styled from "styled-components";
import axios from "axios";
import { movieIDState } from "../atom";
import { useState, useEffect } from "react";

interface NumberProps {
  info: any;
}

function HoverCard({ info }: NumberProps) {
  console.log(info);
  const [video, setVideo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getMovieVideos = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const videoRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${info.id}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
        );

        setVideo(videoRes.data.results);

        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        console.log(error);
      }
    };

    getMovieVideos();
  }, [info.id]);
  console.log(video);
  return (
    <>
      {" "}
      {video[0] ? (
        <>
          <Box w="100%">
            <iframe
              src={`https://www.youtube.com/embed/${video[0].key}?vq=hd1080&autoplay=1&modestbranding=1&showinfo=0&rel=0&fs=0&color=white&disablekb=1&mute=1`}
              frameBorder="0"
            />
          </Box>
          <Text>{info.title}</Text>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default HoverCard;
