import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Divider,
  Flex,
  Heading,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { FC } from "react";
import useFetchFriendData from "../../hooks/useFetchFriendData";
import { IFriend, IUserDB } from "../../interfaces";

interface AnalysisProps {
  user: IUserDB;
  friend: IFriend;
  isUser: boolean;
}

const Analysis: FC<AnalysisProps> = ({ user, friend, isUser }) => {
  const { friendData, isLoading, isError } = useFetchFriendData();

  const genreSum = Object.values(friendData.genres).reduce(
    (pv, cv) => pv + cv,
    0
  );

  const sortedGenres = Object.entries(friendData.genres)
    .filter((genre) => genre[1] != 0)
    .sort((a, b) => b[1] - a[1]);

  return (
    <Flex flexDir="column" width="100%" mt="4rem">
      <Heading size="lg">{friend.friendUsername}님의 영화</Heading>
      <Flex
        mt="1rem"
        bgColor="brightBlue"
        w="100%"
        p="2rem 3rem"
        h="fit-content"
      >
        {/* {isUser ? (
          <></>
        ) : ( */}
        <CircularProgress size="3xs" mr="3rem">
          <CircularProgressLabel></CircularProgressLabel>
        </CircularProgress>
        {/* )} */}

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
                const percentage = (val / genreSum) * 100;

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
