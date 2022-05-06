import { Circle, useToast } from "@chakra-ui/react";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import { useRecoilValue } from "recoil";
import { doc, setDoc } from "firebase/firestore";

import { movieIDState } from "../../atom";
import { auth, db } from "../../../firebase";
import { IUserMovies } from "../../interfaces";
import { useEffect, useState } from "react";

export default function LikeButton() {
  const toast = useToast();
  const [liked, setLiked] = useState(false);
  const movieID = useRecoilValue(movieIDState);
  const userItem = JSON.parse(localStorage.getItem("user") as any); // 사용자 정보 가져오기

  // 찜한 영화 불러오기
  useEffect(() => {
    if (userItem && userItem.movies.watch.includes(movieID)) {
      setLiked(true);
    }
  }, []);

  const saveMoviesToDB = async (movies: IUserMovies["watch"]) => {
    const dbInfo = {
      id: userItem.id,
      username: userItem.username,
      friends: userItem.friends,
      movies: {
        watch: movies,
        good: userItem.movies.good,
        bad: userItem.movies.bad,
      },
    };
    await setDoc(doc(db, "users", userItem.id), dbInfo);
    localStorage.setItem("user", JSON.stringify(dbInfo)); // 사용자 정보 저장
  };

  const onClick = async () => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      toast({
        position: "top",
        title: "로그인 해주세요",
        description: "로그인이 필요한 서비스입니다.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    } else {
      // 찜하면 DB에 영화를 추가하고 해제하면 삭제한다.
      setLiked((current) => !current);
      const movies = liked
        ? userItem.movies.watch?.filter((movie: number) => movie !== movieID)
        : userItem.movies.watch?.concat([movieID]);
      saveMoviesToDB(movies);
    }
  };

  return (
    <Circle
      size="2.5rem"
      bg="white"
      color="black"
      _hover={{ cursor: "pointer" }}
      onClick={onClick}
    >
      {liked ? (
        <AiOutlineCheck size="1.4rem" />
      ) : (
        <AiOutlinePlus size="1.4rem" />
      )}
    </Circle>
  );
}
