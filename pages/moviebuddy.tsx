import { Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import { auth } from "../firebase";
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
        <Flex flexDir="column" px="10rem">
        </Flex>
      ) : (
        <>not logged in </>
      )}
    </Flex>
  );
};

export default Moviebuddy;
