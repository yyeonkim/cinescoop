import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Divider,
  Flex,
  Heading,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { FC } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { selectedFriendState } from "../../atom";
import useFetchFriendData from "../../hooks/useFetchFriendData";
import { IFriend, IUserDB } from "../../interfaces";

interface AnalysisProps {
  userData: IUserDB;
  isUser: boolean;
  friend: IFriend;
}

const Analysis: FC<AnalysisProps> = ({ userData, isUser, friend }) => {
  const { friendData, isLoading, isError } = useFetchFriendData();
  const setSelectedFriend = useSetRecoilState(selectedFriendState);

  var similarity = require("compute-cosine-similarity");

  const genreSum = Object.values(friendData.genres).reduce(
    (pv, cv) => pv + cv,
    0
  );
  const sortedGenres = Object.entries(friendData.genres)
    .filter((genre) => genre[1] != 0)
    .sort((a, b) => b[1] - a[1]);

  const showUserGenres = () => {
    setSelectedFriend({
      friendId: userData.id,
      friendUsername: userData.username,
    });
  };

  const calCosineSimilarity = () => {
    if (genreSum === 0) return 0;

    const allGenres = Object.keys({ ...userData.genres, ...friendData.genres });
    let userCnt: number[] = [];
    let friendCnt: number[] = [];
    allGenres.forEach((genre) => {
      userData.genres.hasOwnProperty(genre)
        ? userCnt.push(userData.genres[genre as keyof typeof userData.genres])
        : userCnt.push(0);
      friendData.genres.hasOwnProperty(genre)
        ? friendCnt.push(
            friendData.genres[genre as keyof typeof friendData.genres]
          )
        : friendCnt.push(0);
    });
    console.log("userCnt", userCnt);
    console.log("friendCnt", friendCnt);

    console.log(allGenres);

    return Math.round(similarity(userCnt, friendCnt) * 100);
  };

  const cosineSimilarity = calCosineSimilarity();

  return (
    <Flex flexDir="column" width="100%" mt="4rem">
      <Flex align="baseline">
        <Heading size="lg" flexGrow={1}>
          {friend.friendUsername}님의 영화
        </Heading>
        <Button
          bg="none"
          _focus={{ outline: "none" }}
          _hover={{ background: "none", color: "pink" }}
          _active={{ background: "none", color: "lightBlue" }}
          onClick={showUserGenres}
        >
          내 영화 취향&gt;
        </Button>
      </Flex>
      <Flex
        mt="0.3rem"
        bgColor="brightBlue"
        w="100%"
        p="2rem 3rem"
        h="fit-content"
      >
        {friend.friendId === userData.id ? (
          <></>
        ) : (
          <CircularProgress
            value={cosineSimilarity}
            size="3xs"
            mr="3rem"
            color="pink"
          >
            <CircularProgressLabel fontSize="5xl" fontWeight="bold">
              {cosineSimilarity}%
              <Text fontSize="lg" fontWeight="light" m="0">
                유사율
              </Text>
            </CircularProgressLabel>
          </CircularProgress>
        )}

        <Flex flexDir="column" flexGrow="1">
          <Text fontSize="xl">좋아하는 영화 장르</Text>
          <Divider orientation="horizontal" m="0.5rem 0 1rem" />
          {genreSum === 0 ? (
            <Text>아직 좋아요를 누른 영화가 없습니다. </Text>
          ) : (
            <Wrap spacing={4}>
              {sortedGenres.map((genre) => {
                const name = genre[0];
                const val = genre[1];
                const percentage = Math.round((val / genreSum) * 100);

                return (
                  <Box
                    px="1rem"
                    py="0.5rem"
                    bgColor="rgb(255, 255, 255, 0.2)"
                    borderRadius="2rem"
                  >
                    {name} {percentage}%
                  </Box>
                );
              })}
            </Wrap>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Analysis;
