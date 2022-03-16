import { Circle, useToast } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useRecoilState, useRecoilValue } from "recoil";
import { doc, setDoc } from "firebase/firestore";

import {
  likedMoviesState,
  likedState,
  loginState,
  movieIDState,
  uidState,
  usernameState,
} from "../atom";
import { db } from "../../firebase";

export default function LikeButton() {
  const toast = useToast();
  const [liked, setLiked] = useRecoilState(likedState);
  const isLoggedIn = useRecoilValue(loginState);
  const movieID = useRecoilValue(movieIDState);
  const userId = useRecoilValue(uidState);
  const username = useRecoilValue(usernameState);
  const likedMovies = useRecoilValue(likedMoviesState);

  const onClick = async () => {
    if (!isLoggedIn) {
      toast({
        position: "top",
        title: "로그인 해주세요",
        description: "로그인이 필요한 서비스입니다.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    } else {
      // 버튼 애니메이션
      setLiked((current) => !current);

      // 찜하기 취소
      if (liked) {
        let movies = likedMovies?.filter((movie) => movie.id !== movieID);
        await setDoc(doc(db, "users", userId), {
          id: userId,
          username,
          movies,
        });
      } else {
        // 찜하기
        let movies = likedMovies?.push({ id: movieID });
        await setDoc(doc(db, "users", userId), {
          id: userId,
          username,
          movies,
        });
      }
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
