import {
  Flex,
  Img,
  Text,
  Button,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import LikeButton from "./Buttons/LikeButton";
import GoodButton from "./Buttons/GoodButton";
import BadButton from "./Buttons/BadButton";
import GoodBadButton from "./Buttons/GoodBadButton";
import useNowDetail from "../hooks/useNowDetail";
import { useSetRecoilState } from "recoil";
import { movieIDState } from "../atom";
import { IMovieDetails, ICast } from "../interfaces";
import { Movie } from "./VerCard";
import StarRating from "./StarRatings";
import ReserveButton from "./Buttons/ReserveButton";
import DetailButton from "./Buttons/DetailButton";

interface CardProps {
  info: Movie;
  page: any;
  key: any;
}

function NowPlayingCard({ info, page, key }: CardProps) {
  const router = useRouter();
  const setMovieID = useSetRecoilState(movieIDState);
  const { movieDetail, cast, isLoading, isError } = useNowDetail(info.id);

  const detail = movieDetail as unknown as IMovieDetails;
  const cast1 = cast as unknown as unknown as ICast;

  const onClick = (id: number, path: string) => {
    setMovieID(id);
    router.push(`/${path}/${id}`);
  };

  return (
    <Box mr={10} ml={10} mt={10}>
      <Flex mb={10}>
        <Img
          objectFit="contain"
          src={`https:www.themoviedb.org/t/p/w1280${info.poster_path}`}
          maxW="50%"
          maxH="75%"
          w="15rem"
          borderRadius={5}
        />
        <Flex direction="column" ml={10}>
          <Text fontSize="1.2rem" mb={1}>
            {detail.title}
          </Text>
          <Flex fontSize="0.9rem" mb={1}>
            <Text mr={1}>평점</Text>
            {detail.vote_average ? (
              <StarRating voteAverage={detail.vote_average} starSize={"15px"} />
            ) : (
              <StarRating voteAverage={0} starSize={"15px"} />
            )}
            <Text ml={1}>{detail.vote_average}</Text>
          </Flex>
          <Flex>
            <Text fontSize="0.9rem" mr={1}>
              개요
            </Text>
            {detail.genres &&
              detail.genres.map((genre) => (
                <Text mr={1} key={genre.id}>
                  {genre.name}
                </Text>
              ))}
            |
            <Text ml={1} mr={1}>
              {detail.runtime}분
            </Text>
            |<Text ml={1}>{info.release_date}</Text>
          </Flex>
          <Flex>
            <Text fontSize="0.9rem" mr={1}>
              출연
            </Text>{" "}
            <Flex direction="column">
              <Text>{cast[0]?.name}</Text>
              <Text>{cast[1]?.name}</Text>
              <Text>{cast[2]?.name}</Text>
            </Flex>
          </Flex>
          <Flex mt="8rem">
            <BadButton />
            <GoodButton />
            <LikeButton />

            <ReserveButton />
            <DetailButton info={info} />
            {/*<Button
              bgColor="pink"
              color="black"
              onClick={() => onClick(info.id, "movieinfo")}
            >
              관련 정보
              </Button>*/}
          </Flex>
        </Flex>
      </Flex>
      <hr color="#FF5AF1" />
    </Box>
  );
}

export default NowPlayingCard;
