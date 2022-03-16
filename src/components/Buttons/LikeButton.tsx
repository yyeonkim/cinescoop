import { Circle, useToast } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { doc, setDoc } from "firebase/firestore";

import {
  likedMoviesState,
  likedState,
  movieIDState,
  uidState,
  userDBState,
  usernameState,
} from "../../atom";
import { auth, db } from "../../../firebase";
import { IUserMovie } from "../../interfaces";

export default function LikeButton() {
  const toast = useToast();
  const [liked, setLiked] = useRecoilState(likedState);
  const movieID = useRecoilValue(movieIDState);
  const userId = useRecoilValue(uidState);
  const username = useRecoilValue(usernameState);
  const likedMovies = useRecoilValue(likedMoviesState);
  const setUserDB = useSetRecoilState(userDBState);

  const saveMoviesToDB = async (movies: IUserMovie[]) => {
    const dbInfo = {
      id: userId,
      username,
      movies,
    };
    await setDoc(doc(db, "users", userId), dbInfo);
    setUserDB(dbInfo);
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
        ? likedMovies?.filter((movie) => movie.id !== movieID)
        : likedMovies?.concat([{ id: movieID }]);
      saveMoviesToDB(movies as IUserMovie[]);
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
