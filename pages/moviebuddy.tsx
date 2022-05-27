import { Flex, Heading } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { auth } from "../firebase";
import { loginState, selectedFriendState } from "../src/atom";
import SwipeList from "../src/components/Lists/SwipeList";
import LoadingAnimation from "../src/components/LoadingAnimation";
import Analysis from "../src/components/MovieBuddy/Analysis";
import FriendList from "../src/components/MovieBuddy/FriendList";
import PageTitle from "../src/components/PageTitle";
import useFetchListData from "../src/hooks/useFetchListData";
import useFetchUserData from "../src/hooks/useFetchUserData";

const Moviebuddy: NextPage = () => {
  const user = auth.currentUser;
  const [login, setLogin] = useRecoilState(loginState);
  const { userData, isLoading, isError } = useFetchUserData();
  const [selectedFriend, setSelectedFriend] =
    useRecoilState(selectedFriendState);
  const [isUser, setIsUser] = useState(true);
  const { isLoading: listIsLoading, friendGoodData } = useFetchListData(); // 친구가 좋아요 한 영화 목록

  useEffect(() => {
    setSelectedFriend({
      friendId: userData.id,
      friendUsername: userData.username,
    });
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    });
  }, [user, login]);

  return (
    <Flex flexDir="column" w="100%">
      <PageTitle
        title="Movie Buddy"
        subtitle="친구들과 영화 취향을 공유 및 비교분석할 수 있는 Cinescoop의 Movie Buddy"
      />
      {user ? (
        isLoading ? (
          <>isloading</>
        ) : (
          <>
            <Flex flexDir="column" px="10rem">
              <FriendList friends={userData.friends} />
              <Analysis
                userData={userData}
                friend={selectedFriend}
                isUser={isUser}
              />
              <Flex flexDir="column" width="100%" mt="4rem">
                <Heading size="lg" mb="1rem">
                  좋아하는 영화
                </Heading>
                {listIsLoading ? (
                  <LoadingAnimation />
                ) : (
                  <SwipeList
                    data={friendGoodData}
                    poster={false}
                    slidesNumber={6}
                  />
                )}
              </Flex>
            </Flex>
          </>
        )
      ) : (
        <>not logged in </>
      )}
    </Flex>
  );
};

export default Moviebuddy;
