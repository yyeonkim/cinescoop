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
import StarRating from "./StarRatings";

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
    <Flex
      mt="2rem"
      maxW="1280px"
      alignItems={["center", "center", "start"]}
      direction={["column", "column", "row"]}
    >
      {/* 영화 포스터 */}
      <Image
        src={`${IMAGE_URL}/w300/${detailData?.poster_path}`}
        ignoreFallback
        objectFit="contain"
        w={["15rem", "15rem", "30rem"]}
        mb={["2rem", "2rem", 0]}
      />

      {/* 영화 정보 */}
      <Flex
        direction="column"
        justifyContent="space-between"
        ml={[0, 0, "2rem"]}
      >
        <Stack spacing="1rem">
          <Flex alignItems="center">
            <Heading>{detailData?.title}</Heading>
          </Flex>
          <Text display="flex" alignItems="center" fontWeight="light">
            <Text fontWeight="normal" fontSize="lg">
              평점 &nbsp;
            </Text>
            <StarRating
              voteAverage={detailData?.vote_average as number}
              starSize="1.3rem"
            />
            &ensp;
            {detailData?.vote_average}
          </Text>
          <Text display="flex" alignItems="center" fontWeight="light">
            <Text fontWeight="normal" fontSize="lg">
              개요 &nbsp;
            </Text>
            {detailData?.genres &&
              detailData?.genres.map((genre) => genre.name + " ")}
            | &nbsp;
            {detailData?.runtime}분 | {detailData?.release_date} 개봉
          </Text>
          <Text display="flex" fontWeight="light">
            <Text fontWeight="normal" fontSize="lg">
              출연 &nbsp;
            </Text>
            <Stack>
              {creditData?.map((credit, i) => {
                // 출연진 다섯 명까지만 출력
                if (i < 5) return <Text>{credit.name}</Text>;
              })}
            </Stack>
          </Text>
          <Text>{detailData?.overview}</Text>
        </Stack>

        {/* 버튼 */}
        <HStack spacing={5} mt="1rem">
          <Button
            color="white"
            onClick={clickInfo}
            w="8rem"
            borderColor="pink"
            borderWidth={1}
            bgColor="transparent"
          >
            관련 정보
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
