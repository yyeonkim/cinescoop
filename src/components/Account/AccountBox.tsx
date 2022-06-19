import React, { useEffect } from "react";
import {
  Flex,
  Text,
  useDisclosure,
  Avatar,
  Button,
  Circle,
} from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import { auth } from "../../../firebase";
import ChangeNicknameModal from "./ChangeNicknameModal";
import WithdrawalModal from "./WithdrawalModal";
import ChangePasswordModal from "./ChangePasswordModal";
import { useRecoilState } from "recoil";
import { loginState } from "../../atom";
import { onAuthStateChanged } from "firebase/auth";
import useFetchUserData from "../../hooks/useFetchUserData";
import { useRouter } from "next/router";
import { CheckIcon } from "@chakra-ui/icons";

function AccountBox() {
  const router = useRouter();
  const disclosure1 = useDisclosure();
  const disclosure2 = useDisclosure();
  const disclosure3 = useDisclosure();
  const user = auth.currentUser;
  const { userData, isLoading, isError } = useFetchUserData();
  const [login, setLogin] = useRecoilState(loginState);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    });
  }, [user, login]);

  const verifyEmail = () => {
    router.push("/"); // Home으로 가면 인증 메일이 보내진다.
  };

  return (
    <Flex
      bgColor="#3843CD"
      h="15rem"
      w="50rem"
      p="3rem"
      mt="1rem"
      color="white"
      borderRadius="0.5rem"
    >
      {login && user ? (
        <Flex alignItems="center">
          <Avatar
            size="2xl"
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
          <Flex flexDir="column" ml="2rem">
            <Text fontSize="1.5rem">{userData.username}</Text>
            {user.email ? (
              <Flex alignItems="center">
                <Text opacity="0.5" mr=".5rem">
                  {user.email}
                </Text>
                {user.emailVerified ? (
                  <Circle size="1rem" bg="rgba(255, 255, 255, .2)">
                    <CheckIcon w={3} h={3} />
                  </Circle>
                ) : (
                  <Button onClick={verifyEmail} size="xs">
                    인증하기
                  </Button>
                )}
              </Flex>
            ) : (
              <></>
            )}
            <Text
              cursor="pointer"
              color="pink"
              mt="2rem"
              onClick={disclosure3.onOpen}
            >
              닉네임 변경하기 {">"}
              <ChangeNicknameModal
                isOpen={disclosure3.isOpen}
                onClose={disclosure3.onClose}
              />
            </Text>
            <Text cursor="pointer" color="pink" onClick={disclosure1.onOpen}>
              비밀번호 변경하기 {">"}
              <ChangePasswordModal
                isOpen={disclosure1.isOpen}
                onClose={disclosure1.onClose}
              />
            </Text>
            <Text cursor="pointer" color="pink" onClick={disclosure2.onOpen}>
              탈퇴하기 {">"}
              <WithdrawalModal
                isOpen={disclosure2.isOpen}
                onClose={disclosure2.onClose}
              />
            </Text>
          </Flex>
        </Flex>
      ) : (
        <>not logged in</>
      )}
    </Flex>
  );
}

export default AccountBox;
