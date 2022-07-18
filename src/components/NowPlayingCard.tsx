import {
  Flex,
  Img,
  Text,
  Button,
  useColorModeValue,
  Stack,
  HStack,
} from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { useRouter } from "next/router";

import { movieIDState } from "../atom";
import WatchButton from "./Buttons/WatchButton";
import ReserveButton from "./Buttons/ReserveButton";
import useNowDetail from "../hooks/useNowDetail";
import { Movie } from "./VerCard";
import StarRating from "./StarRatings";
import { IMAGE_URL } from "../hooks/fetching";

interface CardProps {
  info: Movie;
  key: any;
}

function NowPlayingCard({ info }: CardProps) {
  const color = useColorModeValue("#FF5AF1", "#FF5AF1");

  const router = useRouter();
  const setMovieID = useSetRecoilState(movieIDState);
  const {
    movieDetail: detail,
    cast,
    isLoading,
    isError,
  } = useNowDetail(info.id);

  const onClick = (id: number, path: string) => {
    setMovieID(id);
    router.push(`/${path}/${id}`);
  };

  return (
    <>
      <Flex
        my="2rem"
        alignItems={["center", "center", "stretch"]}
        direction={["column", "column", "row"]}
      >
        {/* 영화 포스터 */}
        <Img
          src={`${IMAGE_URL}/w1280/${info.poster_path}`}
          borderRadius={5}
          cursor="pointer"
          w="15rem"
          mr={[0, 0, "2rem"]}
          mb={["1rem", "1rem", 0]}
        />
        <Flex direction="column" justifyContent="space-between">
          {/* 영화 정보 */}
          <Stack>
            <Text fontSize={["xl", "xl", "2xl"]} mb="1rem">
              {detail.title}
            </Text>
            <Flex>
              <Text fontSize={["md", "md", "lg"]}>평점 &nbsp;</Text>
              {detail.vote_average ? (
                <StarRating voteAverage={detail.vote_average} starSize="1rem" />
              ) : (
                <StarRating voteAverage={0} starSize="1rem" />
              )}
              <Text ml=".5rem">{detail.vote_average}</Text>
            </Flex>

            <Flex>
              <Text fontSize={["md", "md", "lg"]}>개요 &nbsp;</Text>
              <Text>
                {detail.genres?.map((genre, index) => {
                  if (index <= 1) {
                    if (index === 1 || index + 1 === detail.genres.length) {
                      return genre.name;
                    } else {
                      return genre.name + "·";
                    }
                  }
                })}
                &nbsp;| {detail.runtime}분 | {info.release_date}
              </Text>
            </Flex>

            <Flex>
              <Text fontSize={["md", "md", "lg"]}>출연 &nbsp;</Text>
              <Flex direction="column">
                <Text>{cast[0]?.name}</Text>
                <Text>{cast[1]?.name}</Text>
                <Text>{cast[2]?.name}</Text>
              </Flex>
            </Flex>
          </Stack>

          {/* 버튼 */}
          <HStack spacing="1rem" mt="2rem">
            <ReserveButton id={info.id} path={"reserve"} />
            <Button
              mx="1rem"
              borderColor="pink"
              borderWidth={1}
              bgColor="transparent"
              onClick={() => onClick(info.id, "movieinfo")}
            >
              관련 정보
            </Button>
            <WatchButton movieId={info.id} />
          </HStack>
        </Flex>
      </Flex>

      <hr color={color} />
    </>
  );
}

export default NowPlayingCard;
