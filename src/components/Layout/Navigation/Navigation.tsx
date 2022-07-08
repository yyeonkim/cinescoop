import { Flex, Spacer, Image, Center, useMediaQuery } from "@chakra-ui/react";
import Link from "next/link";

import logo from "../../../../public/logo.png";
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
  const [isLargerThan640] = useMediaQuery("(min-width: 640px)");

  return (
    <Center px={5} py={isLargerThan640 ? 10 : 5}>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        maxW="1280px"
        w="100%"
      >
        <Link href="/">
          <Image
            src={logo.src}
            w="8rem"
            objectFit="contain"
            mr={10}
            cursor="pointer"
          />
        </Link>
        {isLargerThan640 && (
          <>
            <PageLink path="/moviebuddy" name="Movie Buddy" />
            <PageLink path="/nowplaying" name="In Theaters" />
            <Spacer />
            {search && <Search version="short" />}
            <SwitchMode />
          </>
        )}
        <Profile />
      </Flex>
    </Center>
  );
}

export default Navigation;
