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

import { AccountBoxProps } from "./Navigation";

function Profile({ login, name }: AccountBoxProps) {
  const initials = login ? name : "";

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
            <MenuItem>로그아웃하기</MenuItem>
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
