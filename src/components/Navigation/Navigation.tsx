import { Flex, Spacer, Image } from "@chakra-ui/react";
import logo from "../../../public/logo.png";
import Link from "next/link";

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

interface navigationProps {
  search: boolean;
}
function Navigation({ search }: navigationProps) {
  return (
    <Flex gap={35} paddingX={100} m={0} alignItems="center">
      <Link href="/">
        <Image
          src={logo.src}
          boxSize="10rem"
          h="8rem"
          objectFit="contain"
          mr={2}
          cursor="pointer"
        />
      </Link>
      <PageLink path="/moviebuddy" name="Movie Buddy" />
      <PageLink path="/nowplaying" name="In Theaters" />
      <Spacer />
      {search && <Search version="short" />}
      <SwitchMode />
      <Profile />
    </Flex>
  );
}

export default Navigation;
