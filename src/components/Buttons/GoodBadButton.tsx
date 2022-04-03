import { Circle, useToast } from "@chakra-ui/react";
import {
  RiThumbUpFill,
  RiThumbUpLine,
  RiThumbDownLine,
  RiThumbDownFill,
} from "react-icons/ri";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { doc, setDoc } from "firebase/firestore";

import {
  badMoviesState,
  goodMoviesState,
  likedMoviesState,
  movieIDState,
  ratingState,
  uidState,
  userDBState,
  usernameState,
} from "../../atom";
import { auth, db } from "../../../firebase";
import { IUserMovies } from "../../interfaces";

// 버튼 타입
interface IGoodBadButtonProps {
  type: "good" | "bad";
}

export default function GoodBadButton({ type }: IGoodBadButtonProps) {
  const toast = useToast();
  const [rating, setRating] = useRecoilState(ratingState);
  const movieID = useRecoilValue(movieIDState);
  const userId = useRecoilValue(uidState);
  const username = useRecoilValue(usernameState);
  const likedMovies = useRecoilValue(likedMoviesState);
  const goodMovies = useRecoilValue(goodMoviesState);
  const badMovies = useRecoilValue(badMoviesState);
  const setUserDB = useSetRecoilState(userDBState);

  const saveMoviesToDB = async (
    movies: IUserMovies["good"] | IUserMovies["bad"]
  ) => {
    let dbInfo;
    if (type === "good") {
      dbInfo = {
        id: userId,
        username,
        movies: { watch: likedMovies, good: movies, bad: badMovies },
      };
    } else {
      dbInfo = {
        id: userId,
        username,
        movies: { watch: likedMovies, good: goodMovies, bad: movies },
      };
    }
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
      // 로그인 한 사용자
      // 버튼을 누르면 DB에 영화를 추가하고 해제하면 삭제한다.
      let movies = [];
      // 좋아요 버튼을 누르면
      if (type === "good") {
        setRating((current) => (current === "good" ? "" : "good"));
        movies =
          rating === "good"
            ? goodMovies?.filter((id) => id !== movieID)
            : goodMovies?.concat([movieID]);
      } else {
        // 별로예요 버튼을 누르면
        setRating((current) => (current === "bad" ? "" : "bad"));
        movies =
          rating === "bad"
            ? badMovies?.filter((id) => id !== movieID)
            : badMovies?.concat([movieID]);
      }
      saveMoviesToDB(movies);
    }
  };

  // 평가된 영화면 아이콘을 brightBlue 색으로 바꿈
  return (
    <Circle
      size="2.5rem"
      bg="white"
      _hover={{ cursor: "pointer" }}
      onClick={onClick}
      color="black"
    >
      {type === "good" ? (
        rating === "good" ? (
          <RiThumbUpFill size="1.4rem" />
        ) : (
          <RiThumbUpLine size="1.4rem" />
        )
      ) : rating === "bad" ? (
        <RiThumbDownFill size="1.4rem" />
      ) : (
        <RiThumbDownLine size="1.4rem" />
      )}
    </Circle>
  );
}
