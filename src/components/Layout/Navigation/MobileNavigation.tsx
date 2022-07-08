import { Flex, Spacer, Image, Center, useMediaQuery } from "@chakra-ui/react";
import Link from "next/link";

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

interface navigationProps {
  search: boolean;
}
export default function MobileNavigation({ search }: navigationProps) {
  const [isSmallerThan640] = useMediaQuery("(max-width: 640px)");

  return (
    isSmallerThan640 && (
      <Center px={5} zIndex={1} bg="brightBlue">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          w="100%"
        ></Flex>
      </Center>
    )
  );
}
