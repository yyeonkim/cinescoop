import { Flex, Spacer } from "@chakra-ui/react";

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

function Navigation() {
  return (
    <Flex gap={30} paddingX={100} paddingY={10} alignItems="center">
      <p>Logo</p>
      <PageLink path="/" name="Home" />
      <PageLink path="/about" name="About" />
      <Spacer />
      <Search version="short" />
      <AccountBox login={true} name="Alice Jung" />
    </Flex>
  );
}

export default Navigation;
