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
function Navigation({ search }: IsSearch) {
  return (
    <Flex gap={30} paddingX={100} m={0} alignItems="center">
      <Link href="/">
        <Image
          src={logo.src}
          boxSize="10rem"
          objectFit="contain"
          mr={2}
          cursor="pointer"
        />
      </Link>
      <PageLink path="/about" name="About" />
      <Spacer />
      {search && <Search version="short" />}
      <SwitchMode />
      <Profile />
    </Flex>
  );
}

export default Navigation;
