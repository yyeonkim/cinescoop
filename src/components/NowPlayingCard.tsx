import { Flex, Img, Text, Button, List } from "@chakra-ui/react";
import { useRouter } from "next/router";
import useNowDetail from "../../pages/api/useNowDetail";
import { useRecoilState, useRecoilValue } from "recoil";
import { movieIDState } from "../atom";
import { IMovieDetails, ICast } from "../interfaces";
import { Movie } from "./VerCard";

interface CardProps {
  info: Movie;
  page: any;
  key: any;
}

function NowPlayingCard({ info, page, key }: CardProps) {
  const router = useRouter();
  const [movieID, setMovieID] = useRecoilState(movieIDState);
  const { movieDetail, cast, isLoading, isError } = useNowDetail(info.id);

  const detail = movieDetail as unknown as IMovieDetails;
  const cast1 = cast as unknown as unknown as ICast;

  const seeMovieInfo = (id: number) => {
    setMovieID(id);
    router.push(`/movieinfo/${id}`);
  };

  return (
    <Flex>
      <Img
        objectFit="cover"
        src={`https:www.themoviedb.org/t/p/w1280${info.poster_path}`}
        maxW="50%"
        maxH="75%"
        borderRadius={5}
      />
      <Flex direction="column">
        <Text textAlign="center" mb="0" fontSize="0.9rem">
          {detail.title}
        </Text>
        <Text textAlign="center" mb="0" fontSize="0.9rem">
          평점 {detail.vote_average}
        </Text>
        <Text>
          개요
          {detail.genres && detail.genres[0] ? (
            <div>{detail.genres[0].name}</div>
          ) : (
            ""
          )}
          {detail.runtime}분 {info.release_date}
        </Text>
        출연 {cast[0] && cast[0].name} {cast[1] && cast[1].name}{" "}
        {cast[2] && cast[2].name}
        <Flex>
          <Button>Buy tickets</Button>
          <Button onClick={() => seeMovieInfo(info.id)}>관련 정보</Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default NowPlayingCard;
