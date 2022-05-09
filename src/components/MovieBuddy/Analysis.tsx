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
type stringKeyObject = { [key: string]: number };

const Analysis: FC<AnalysisProps> = ({ user, friend, isUser }) => {
  const { friendData, isLoading, isError } = useFetchFriendData(friend);

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
        p="2rem 1rem"
        h="fit-content"
      >
        <CircularProgress>
          <CircularProgressLabel></CircularProgressLabel>
        </CircularProgress>
        <Flex flexDir="column">
          <Text>좋아하는 영화 장르</Text>
          <Divider orientation="horizontal" />
          {genreSum === 0 ? (
            <Text>아직 좋아요를 누른 영화가 없습니다. </Text>
          ) : (
            <Wrap>
              {sortedGenres.map((genre) => {
                const name = genre[0];
                const val = genre[1];
                const percentage = (val / genreSum) * 100;

                return (
                  <Box>
                    {name}, {percentage}%
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
