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
    <Flex mt={10} maxW="1200px">
      <Image src={`${IMAGE_URL}/w300/${detailData?.poster_path}`} />
      <Flex direction="column" justifyContent="space-between" ml="2rem">
        <Stack>
          <Flex alignItems="center">
            <Heading mr={5}>{detailData?.title}</Heading>
          </Flex>
          <Text display="flex" alignItems="center" fontWeight="light">
            <Text fontWeight="normal" fontSize="lg">
              평점 &nbsp;
            </Text>
            {detailData?.vote_average}
          </Text>
          <Text display="flex" alignItems="center" fontWeight="light">
            <Text fontWeight="normal" fontSize="lg">
              개요 &nbsp;
            </Text>
            {detailData?.genres && `${detailData.genres[0].name} | `}
            {detailData?.runtime}분 | {detailData?.release_date} 개봉
          </Text>
          <Text display="flex" alignItems="center" fontWeight="light">
            <Text fontWeight="normal" fontSize="lg">
              출연 &nbsp;
            </Text>
            {creditData && creditData[0].name}
          </Text>
          <Text>{detailData?.overview}</Text>
        </Stack>

        {/* 버튼 */}
        <HStack spacing={5}>
          <Button color="white" onClick={clickInfo} w="8rem" bg="brightBlue">
            상세정보
          </Button>
          <WatchButton movieId={movieId} />
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
