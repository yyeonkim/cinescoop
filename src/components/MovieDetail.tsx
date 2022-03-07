import {
  Stack,
  Flex,
  Image,
  Text,
  Button,
  Heading,
  Circle,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";

import { IMAGE_URL } from "../hooks/fetching";
import { movieIDState } from "../atom";
import { ICast, IMovieDetails } from "../interfaces";

interface IDetailProps {
  detailData?: IMovieDetails;
  creditData?: ICast[];
}

const MovieDetail = ({ detailData, creditData }: IDetailProps) => {
  const router = useRouter();
  const movieID = useRecoilValue(movieIDState);
  const [liked, setLiked] = useState(false);

  const onClick = () => {
    router.push(`/movieinfo/${movieID}`);
  };

  return (
    <Flex>
      <Image src={`${IMAGE_URL}/w300/${detailData?.poster_path}`} />
      <Flex direction="column" justifyContent="space-between" ml="2rem">
        <Stack>
          <Flex alignItems="center">
            <Heading mr={5}>{detailData?.title}</Heading>
            <Circle
              size="2.5rem"
              bg="white"
              color="pink"
              _hover={{ cursor: "pointer" }}
              onClick={() => setLiked((current) => !current)}
            >
              {liked ? (
                <AiFillHeart size="1.4rem" />
              ) : (
                <AiOutlineHeart size="1.4rem" />
              )}
            </Circle>
          </Flex>
          <Text>
            <Text as="b">평점 </Text>
            {detailData?.vote_average} | <Text as="b">찜 </Text>
            100
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
        <Flex>
          <Button onClick={onClick} w="8rem" bg="brightBlue">
            관련 정보
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MovieDetail;
