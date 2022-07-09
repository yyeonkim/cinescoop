import { Flex, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { HiHome } from "react-icons/hi";
import { FaUserFriends } from "react-icons/fa";
import { MdMovie } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";

import logo from "../../../public/logo.png";
import Profile from "./Profile";
import Search from "./Search";
import PageLink from "./PageLink";
import SwitchMode from "./SwitchMode";

export interface SearchProps {
  version: string;
}
export interface AccountBoxProps {
  login: boolean;
  name: string;
}
export interface IsSearch {
  search: boolean;
}

export default function MobileNavigation() {
  return (
    <HStack
      w="100%"
      bg="#1B1447"
      position="fixed"
      zIndex={10}
      bottom={0}
      p={5}
      boxShadow="0 -3px 6px rgba(0, 0, 0, 0.16)"
      justifyContent="center"
      spacing={10}
    >
      <Link href="/">
        <Flex direction="column" alignItems="center">
          <HiHome size="1.5rem" />
          <Text fontSize="sm">홈</Text>
        </Flex>
      </Link>
      <Link href="/moviebuddy">
        <Flex direction="column" alignItems="center">
          <FaUserFriends size="1.5rem" />
          <Text fontSize="sm">무비버디</Text>
        </Flex>
      </Link>
      <Link href="/nowplaying">
        <Flex direction="column" alignItems="center">
          <MdMovie size="1.5rem" />
          <Text fontSize="sm">상영중</Text>
        </Flex>
      </Link>
      <Link href="/mypage">
        <Flex direction="column" alignItems="center">
          <IoPersonCircle size="1.5rem" />
          <Text fontSize="sm">마이페이지</Text>
        </Flex>
      </Link>
    </HStack>
  );
}
