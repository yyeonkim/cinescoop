import {
  Stack,
  Flex,
  Image,
  Text,
  Button,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

import { IMAGE_URL } from "../hooks/fetching";
import { movieIDState } from "../atom";
import { ICast, IMovieDetails } from "../interfaces";
import WatchButton from "./Buttons/WatchButton";
import GoodBadButton from "./Buttons/GoodBadButton";

interface IDetailProps {
  detailData?: IMovieDetails;
  creditData?: ICast[];
}

const MovieDetail = ({ detailData, creditData }: IDetailProps) => {
  const router = useRouter();
  const movieId = useRecoilValue(movieIDState);

  const clickInfo = () => {
    router.push(`/movieinfo/${movieId}`);
  };

  return (
    <Flex>
      <Image src={`${IMAGE_URL}/w300/${detailData?.poster_path}`} />
      <Flex direction="column" justifyContent="space-between" ml="2rem">
        <Stack>
          <Flex alignItems="center">
            <Heading mr={5}>{detailData?.title}</Heading>
            <WatchButton movieId={movieId} />
          </Flex>
          <Text>
            <Text as="b">평점 </Text>
            {detailData?.vote_average}
          </Text>
          <Text>
            <Text as="b">개요</Text>{" "}
            {detailData?.genres && `${detailData.genres[0].name} | `}
            {detailData?.runtime}분 | {detailData?.release_date} 개봉
          </Text>
          <Text>
            <Text as="b">출연</Text> {creditData && creditData[0].name}
          </Text>
          <Text>{detailData?.overview}</Text>
        </Stack>
        <HStack spacing={5}>
          <Button onClick={clickInfo} w="8rem" bg="brightBlue">
            관련 정보
          </Button>
          <GoodBadButton
            type="good"
            movieId={movieId}
            genres={detailData?.genres}
          />
          <GoodBadButton
            type="bad"
            movieId={movieId}
            genres={detailData?.genres}
          />
        </HStack>
      </Flex>
    </Flex>
  );
};

export default MovieDetail;
