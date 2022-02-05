import { Button, Flex, Spacer, useColorMode } from "@chakra-ui/react";

import AccountBox from "./Profile";
import Search from "./Search";
import PageLink from "./PageLink";
import internal from "stream";

export interface SearchProps {
  version: string;
}
export interface AccountBoxProps {
  login: boolean;
  name: string;
}
export interface IsSearch {
  num: number;
}
function Navigation({ num }: IsSearch) {
  const { colorMode, toggleColorMode } = useColorMode();
  if (num == 1) {
    return (
      <Flex gap={30} paddingX={100} paddingY={10} alignItems="center">
        <p>Logo</p>
        <PageLink path="/" name="Home" />
        <PageLink path="/about" name="About" />
        <Spacer />
        <Search version="short" />
        <Button
          onClick={toggleColorMode}
          variant="outline"
          size="md"
          _focus={{ outline: "none" }}
          _hover={{ borderColor: "pink" }}
        >
          {colorMode == "dark" ? "Dark" : "Light"} Mode
        </Button>
        <AccountBox login={true} name="Alice Jung" />
      </Flex>
    );
  } else {
    return (
      <Flex gap={30} paddingX={100} paddingY={10} alignItems="center">
        <p>Logo</p>
        <PageLink path="/" name="Home" />
        <PageLink path="/about" name="About" />
        <Spacer />
        <Button
          onClick={toggleColorMode}
          variant="outline"
          size="md"
          minWidth="6rem"
          _focus={{ outline: "none" }}
          _hover={{ borderColor: "pink" }}
        >
          {colorMode == "dark" ? "Dark" : "Light"} Mode
        </Button>
        <AccountBox login={true} name="Alice Jung" />
      </Flex>
    );
  }
}

export default Navigation;
