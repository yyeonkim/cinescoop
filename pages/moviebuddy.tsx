import { Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import { auth } from "../firebase";
import FriendList from "../src/components/MovieBuddy/FriendList";
import PageTitle from "../src/components/PageTitle";
import useFetchUserData from "../src/hooks/useFetchUserData";

const Moviebuddy: NextPage = () => {
  const user = auth.currentUser;
  const { userData, isLoading, isError } = useFetchUserData();

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
