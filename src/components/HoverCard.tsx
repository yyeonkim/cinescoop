import { Flex, Img, Text, Box, Button } from "@chakra-ui/react";
import axios from "axios";
import BadButton from "./Buttons/BadButton";
import GoodButton from "./Buttons/GoodButton";
import WatchButton from "./Buttons/WatchButton";
import GoodBadButton from "./Buttons/GoodBadButton";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { movieIDState } from "../atom";
import useNowDetail from "../hooks/useNowDetail";
import ReserveButton from "./Buttons/ReserveButton";
import { useState, useEffect } from "react";
import DetailButton from "./Buttons/DetailButton";
import { IMovie } from "../interfaces";

interface HoverProps {
  info: IMovie;
}

function HoverCard({ info }: HoverProps) {
  const router = useRouter();
  const [movieID, setMovieID] = useRecoilState(movieIDState);
  const { movieDetail } = useNowDetail(info.id);
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

  const seeMovieInfo = (id: number) => {
    setMovieID(id);
    router.push(`/movieinfo/${id}`);
  };

  console.log(movieDetail);

  return (
    <>
      {video[0] ? (
        <Box bgColor="black">
          <Box w="100%">
            <iframe
              src={`https://www.youtube.com/embed/${video[0].key}?vq=hd1080&autoplay=1&modestbranding=1&showinfo=0&rel=0&fs=0&color=white&disablekb=1&mute=1`}
              frameBorder="0"
            />
          </Box>
          <Box p={1}>
            <Flex alignItems="center">
              <Text textColor="white">{info.title}</Text>
              <GoodButton />
              <BadButton />
              <WatchButton />
            </Flex>
            <Text textColor="white">{movieDetail.runtime} 분</Text>
            <Flex>
              {movieDetail.genres &&
                movieDetail.genres.map((genre) => (
                  <Text textColor="white" mr={1} key={genre.id}>
                    {genre.name}
                  </Text>
                ))}
            </Flex>
            <DetailButton info={info} />
          </Box>
        </Box>
      ) : (
        ""
      )}
    </>
  );
}

export default HoverCard;
