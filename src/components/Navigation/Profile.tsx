import Link from "next/link";
import {
  Avatar,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import { useRouter } from "next/router";
import { loginState, userState } from "../../atom";
import { useRecoilState } from "recoil";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { AccountBoxProps } from "./Navigation";
import { auth } from "../../../firebase";

function Profile() {
  const router = useRouter();
  const [login, setLogin] = useRecoilState(loginState);
  const [user, setUser] = useRecoilState(userState);

  const initials = login ? user : "";
  const logout = () => {
    signOut(auth)
      .then(() => {
        setLogin(false);
        setUser("");
        console.log("User logged out");
      })
      .catch((error) => console.log(error));
  };

  return (
    <Flex>
      <Menu>
        <MenuButton
          as={Button}
          boxSize="fit-content"
          _hover={{
            background: "none",
            "&>span>span": {
              backgroundColor: "pink",
              transitionDuration: "0.4s",
            },
          }}
          _focus={{ outline: "none" }}
          _active={{ background: "none" }}
          background="none"
          alignSelf="center"
          padding={0}
        >
          <Avatar
            name={initials}
            src="https://bit.ly/broken-link"
            icon={<AiOutlineUser fontSize="1.5rem" />}
          />
        </MenuButton>
        <MenuList position="relative" zIndex={2}>
          <Link href={`/mypage`}>
            <MenuItem>마이페이지</MenuItem>
          </Link>
          {login ? (
            <MenuItem onClick={logout}>로그아웃하기</MenuItem>
          ) : (
            <Link href={`/login`}>
              <MenuItem>로그인하기</MenuItem>
            </Link>
          )}
        </MenuList>
      </Menu>
    </Flex>
  );
}

export default Profile;
