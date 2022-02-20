import {
  Img,
  Button,
  Flex,
  Spacer,
  Switch,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import logo from "../../public/logo.png";

import AccountBox from "./Profile";
import Search from "./Search";
import PageLink from "./PageLink";

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
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex gap={30} paddingX={100} paddingY={10} alignItems="center">
      <Img src="logo.png" boxSize="12rem" objectFit="contain" mr={2} />
      <PageLink path="/" name="Home" />
      <PageLink path="/about" name="About" />
      <Spacer />
      {search && <Search version="short" />}

      <Button
        onClick={toggleColorMode}
        variant="outline"
        size="md"
        _focus={{ outline: "none" }}
        _hover={{ borderColor: "pink" }}
        minWidth="6rem"
      >
        {colorMode == "dark" ? "Dark" : "Light"} Mode
      </Button>
      <AccountBox login={true} name="Alice Jung" />
    </Flex>
  );
}

export default Navigation;
