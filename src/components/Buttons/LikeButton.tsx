import { Circle, useToast } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useRecoilState, useRecoilValue } from "recoil";
import { doc, setDoc } from "firebase/firestore";

import { likedState, movieIDState } from "../../atom";
import { auth, db } from "../../../firebase";
import { IUserMovies } from "../../interfaces";

export default function LikeButton() {
  const toast = useToast();
  const [liked, setLiked] = useRecoilState(likedState);
  const movieID = useRecoilValue(movieIDState);
  const {
    id,
    movies: { good, bad, watch },
    username,
  } = JSON.parse(localStorage.getItem("user") as any); // 사용자 정보 가져오기

  const saveMoviesToDB = async (movies: IUserMovies["watch"]) => {
    const dbInfo = {
      id,
      username,
      movies: {
        watch: movies,
        good,
        bad,
      },
    };
    await setDoc(doc(db, "users", id), dbInfo);
    localStorage.setItem("user", JSON.stringify(dbInfo)); // 사용자 정보 저장
  };

  const onClick = async () => {
    const user = auth.currentUser;

    if (!user) {
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
        ? watch?.filter((movie) => movie !== movieID)
        : watch?.concat([movieID]);
      saveMoviesToDB(movies);
    }
  };

  return (
    <Circle
      size="2.5rem"
      bg="white"
      color="pink"
      _hover={{ cursor: "pointer" }}
      onClick={onClick}
    >
      {liked ? <AiFillHeart size="1.4rem" /> : <AiOutlineHeart size="1.4rem" />}
    </Circle>
  );
}
