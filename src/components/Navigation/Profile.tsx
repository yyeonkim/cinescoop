import { ChevronDownIcon } from "@chakra-ui/icons";
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
  return (
    <Flex>
      <Avatar
        name="Segun Adebayo"
        src="https://bit.ly/broken-link"
        icon={<AiOutlineUser fontSize="1.5rem" />}
      />
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          _hover={{ color: "pink" }}
          _focus={{ outline: "none" }}
          _active={{ background: "none" }}
          background="none"
          alignSelf="center"
        >
          {name}
        </MenuButton>
        <MenuList>
          <Link href={`/mypage`}>
            <MenuItem>마이페이지</MenuItem>
          </Link>
          <MenuItem>로그아웃하기</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}

export default Profile;
