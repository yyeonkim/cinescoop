import {
  Avatar,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { FC } from "react";
import { useSetRecoilState } from "recoil";

import { selectedFriendState } from "../../atom";
import { IFriendList } from "../../interfaces";
import AddBuddyLink from "./AddBuddyLink";

const FriendList: FC<IFriendList> = ({ friends }) => {
  const setSelectedFriend = useSetRecoilState(selectedFriendState);
  const [isLargerThan641] = useMediaQuery("(min-width: 641px)");

  return (
    <Flex flexDir="column" width="100%" mt="2rem">
      <Flex mb="2rem" align="baseline">
        <Heading fontSize={["2xl", "2xl", "3xl"]} flexGrow={1}>
          내 무비버디
        </Heading>
        <AddBuddyLink />
      </Flex>
      <HStack
        w="100%"
        overflow="scroll"
        scrollbarColor="white"
        css={{
          "&::-webkit-scrollbar": {
            height: "0.6rem",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "6px",
          },
          "&::-webkit-scrollbar-track": {
            visible: false,
          },
          "&::-webkit-scrollbar-corner": {
            backgroundColor: "rgba(255, 255, 255, 0.0)",
          },
        }}
      >
        {friends.map((friend) => (
          <Button
            flexDir="column"
            align="center"
            h="fit-content"
            fontWeight="light"
            _hover={{
              background: "none",
              color: "lightBlue",
            }}
            _focus={{
              outline: "none",
              color: "#FF5AF1 !important",
              fontWeight: "bold !important",
            }}
            _active={{ background: "none" }}
            background="none"
            onClick={() => setSelectedFriend(friend)}
          >
            <Avatar
              name={friend.friendUsername}
              src="https://bit.ly/broken-link"
              size={isLargerThan641 ? "2xl" : "lg"}
            />
            <Text width="fit-content" mt="0.5rem" mb="1.5rem">
              {friend.friendUsername}
            </Text>
          </Button>
        ))}
      </HStack>
    </Flex>
  );
};

export default FriendList;
