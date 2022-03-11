import { Circle } from "@chakra-ui/react";
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
  const [liked, setLiked] = useRecoilState(likedState);
  const isLoggedIn = useRecoilValue(loginState);
  const movieID = useRecoilValue(movieIDState);
  const userId = useRecoilValue(uidState);
  const username = useRecoilValue(usernameState);
  const likedMovies = useRecoilValue(likedMoviesState);

  const onClick = async () => {
    if (!isLoggedIn) {
      window.alert("로그인이 필요합니다.");
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
