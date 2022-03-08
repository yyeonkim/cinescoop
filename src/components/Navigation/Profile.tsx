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
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "../../../firebase";

function Profile() {
  const user = auth.currentUser;
  const router = useRouter();

  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("User logged out");
        router.push("/");
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
          {user ? (
            <Avatar
              name={
                user.displayName
                  ? user.displayName
                  : user.email
                  ? user.email
                  : "-"
              }
              src={
                user.photoURL != null
                  ? user.photoURL
                  : "https://bit.ly/broken-link"
              }
              icon={<AiOutlineUser fontSize="1.5rem" />}
            />
          ) : (
            <Avatar
              name=""
              src="https://bit.ly/broken-link"
              icon={<AiOutlineUser fontSize="1.5rem" />}
            />
          )}
        </MenuButton>
        <MenuList position="relative" zIndex={2}>
          {user ? (
            <>
              <Link href={`/mypage`}>
                <MenuItem>마이페이지</MenuItem>
              </Link>
              <MenuItem onClick={logout}>로그아웃하기</MenuItem>
            </>
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
