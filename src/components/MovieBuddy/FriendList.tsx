import {
  Avatar,
  Button,
  css,
  Flex,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import { IFriendList } from "../../interfaces";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";

const FriendList: FC<IFriendList> = ({ friends }) => {
  console.log("friends", friends);
  return (
    <Flex flexDir="column" width="100%" mt="2rem">
      <Flex mb="1rem">
        <Heading size="lg">내 무비버디</Heading>
      </Flex>
      <HStack
        spacing="2rem"
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
          >
            <Avatar
              name={friend.friendUsername}
              src="https://bit.ly/broken-link"
              size="2xl"
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
