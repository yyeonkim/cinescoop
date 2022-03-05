import {
  Img,
  Button,
  Flex,
  Spacer,
  Switch,
  Text,
  useColorMode,
  Image,
} from "@chakra-ui/react";
import logo from "../../../public/logo.png";
import Link from "next/link";
import { useRecoilValue } from "recoil";

import Profile from "./Profile";
import Search from "./Search";
import PageLink from "./PageLink";
import SwitchMode from "./SwitchMode";
import { loginState, userState } from "../../atom";

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
    <Flex gap={30} paddingX={100} paddingY={0.7} alignItems="center">
      <Link href="/">
        <Image src={logo.src} boxSize="12rem" objectFit="contain" mr={2} />
      </Link>
      <PageLink path="/" name="Home" />
      <PageLink path="/about" name="About" />
      <Spacer />
      {search && <Search version="short" />}
      <SwitchMode />
      <Profile />
    </Flex>
  );
}

export default Navigation;
