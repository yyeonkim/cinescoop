import { Flex, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { HiHome } from "react-icons/hi";
import { FaUserFriends } from "react-icons/fa";
import { MdMovie } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";

export default function MobileNavigation() {
  const { pathname } = useRouter();

  return (
    <HStack
      w="100%"
      bg="#1B1447"
      position="fixed"
      zIndex={10}
      bottom={0}
      p={5}
      boxShadow="0 -3px 6px rgba(0, 0, 0, 0.16)"
      justifyContent="center"
      spacing={10}
    >
      <Link href="/">
        <Flex direction="column" alignItems="center">
          <HiHome size="1.5rem" color={pathname === "/" ? "white" : "grey"} />
          <Text color={pathname === "/" ? "white" : "grey"} fontSize="sm">
            홈
          </Text>
        </Flex>
      </Link>
      <Link href="/moviebuddy">
        <Flex direction="column" alignItems="center">
          <FaUserFriends
            size="1.5rem"
            color={pathname === "/moviebuddy" ? "white" : "grey"}
          />
          <Text color={pathname === "/" ? "white" : "grey"} fontSize="xs">
            무비버디
          </Text>
        </Flex>
      </Link>
      <Link href="/nowplaying">
        <Flex direction="column" alignItems="center">
          <MdMovie
            size="1.5rem"
            color={pathname === "/nowplaying" ? "white" : "grey"}
          />
          <Text color={pathname === "/" ? "white" : "grey"} fontSize="xs">
            상영중
          </Text>
        </Flex>
      </Link>
      <Link href="/mypage">
        <Flex direction="column" alignItems="center">
          <IoPersonCircle
            size="1.5rem"
            color={pathname === "/mypage" ? "white" : "grey"}
          />
          <Text color={pathname === "/" ? "white" : "grey"} fontSize="xs">
            마이페이지
          </Text>
        </Flex>
      </Link>
    </HStack>
  );
}
