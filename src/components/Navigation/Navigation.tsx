import {
  Button,
  Flex,
  Spacer,
  Switch,
  Text,
  useColorMode,
} from "@chakra-ui/react";
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
  const login = useRecoilValue(loginState);
  const user = useRecoilValue(userState);

  return (
    <Flex gap={30} paddingX={100} paddingY={10} alignItems="center">
      <p>Logo</p>
      <PageLink path="/" name="Home" />
      <PageLink path="/about" name="About" />
      <Spacer />
      {search && <Search version="short" />}
      <SwitchMode />
      {/* <Text>{colorMode == "dark" ? "Dark" : "Light"} Mode</Text>
      <Button
        onClick={toggleColorMode}
        variant="outline"
        size="md"
        _focus={{ outline: "none" }}
        _hover={{ borderColor: "pink" }}
      >
        {colorMode == "dark" ? "Dark" : "Light"} Mode
      </Button> */}
      <Profile login={login} name={user} />
    </Flex>
  );
}

export default Navigation;
