import { Button, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { auth, db } from "../../../firebase";
import { loginState } from "../../../src/atom";

const AddBuddy: NextPage = () => {
  const router = useRouter();
  const params = router.asPath.split("/");
  const buddyUid = params[2];
  const createdTime = params[3];
  const toast = useToast();
  const [buddyName, setBuddyName] = useState();

  const user = auth.currentUser;
  const [login, setLogin] = useRecoilState(loginState);

  const getBuddyName = async () => {
    const buddyRef = doc(db, "users", buddyUid);
    const dbBuddy = await getDoc(buddyRef);
    const dbBuddyData = await dbBuddy.data();
    setBuddyName(dbBuddyData?.username);
  };

  const checkLinkValidity = () => {
    const currTime = new Date().getTime();
    return currTime - parseInt(createdTime) <= 3600 * 1000 * 24;
  };

  const addBuddy = async () => {
    if (user != null) {
      const userRef = doc(db, "users", user.uid);
      const dbUser = await getDoc(userRef);
      const userData = await dbUser.data();

      const buddyRef = doc(db, "users", buddyUid);
      const dbBuddy = await getDoc(buddyRef);
      const dbBuddyData = await dbBuddy.data();

      let userUpdatedFriendList = userData?.friends;
      let buddyUpdatedFriendList = userData?.friends;
      userUpdatedFriendList.push({
        friendId: buddyUid,
        friendUsername: buddyName,
      });
      buddyUpdatedFriendList.push({
        friendId: user.uid,
        friendUsername: userData?.username,
      });

      const userDocData = {
        ...userData,
        friends: userUpdatedFriendList,
      };

      const buddyDocData = {
        ...dbBuddyData,
        friends: buddyUpdatedFriendList,
      };

      await setDoc(userRef, userDocData);
      await setDoc(buddyRef, buddyDocData);
    }

    toast({
      position: "bottom",
      title: "무비버디 추가 완료",
      description: `${buddyName}님이 무비버디로 추가되었습니다`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    router.push("/");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogin(true);
        getBuddyName();
      } else {
        setLogin(false);
      }
    });
    console.log(login);
  }, [user, login, buddyName]);

  return (
    <Flex
      position="absolute"
      zIndex="100"
      top="0"
      h="100vh"
      w="100%"
      flexDir="column"
      bgColor="darkBlue"
      align="center"
      justify="center"
    >
      <Flex
        bgColor="blue"
        flexDir="column"
        p="5rem 5rem"
        mx="auto"
        w="40%"
        my="atuo"
        justify="center"
      >
        {checkLinkValidity() ? (
          <>
            <Heading size="xl" mb="1rem">
              무비버디 추가하기
            </Heading>
            <Text mb="3rem">
              <Text as="span" color="pink">
                {buddyName}
              </Text>
              님과 사용자께서 무비버디가 된다면 서로가 Movie Buddy 페이지에서
              상대방의 영화취향을 볼 수 있게 됩니다.
              {buddyName}님을 무비버디로 추가하시겠습니까?
            </Text>
            <Flex justify="right">
              <Button bgColor="pink" p="1rem 2rem" onClick={addBuddy}>
                추가하기
              </Button>
            </Flex>
          </>
        ) : (
          <>
            <Heading size="xl" mb="1rem" color="pink">
              링크 유효기간이 만료되었습니다
            </Heading>
            <Text mb="3rem">
              해당 무비버디 추가 링크가 생성된지 만 하루가 지났습니다. 무비버디
              추가를 하고 싶으실 경우, 상대방으로부터 새로운 링크를 받아 다시
              시도해보십시오.
            </Text>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default AddBuddy;
