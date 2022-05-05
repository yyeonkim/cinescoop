import { Circle, useToast } from "@chakra-ui/react";
import {
  RiThumbUpFill,
  RiThumbUpLine,
  RiThumbDownLine,
  RiThumbDownFill,
} from "react-icons/ri";
import { useRecoilState, useRecoilValue } from "recoil";
import { doc, setDoc } from "firebase/firestore";

import { movieIDState, ratingState } from "../../atom";
import { auth, db } from "../../../firebase";
import { IUserMovies } from "../../interfaces";
import { useEffect } from "react";

// 버튼 타입
interface IGoodBadButtonProps {
  type: "good" | "bad";
}

// 좋아요 또는 별로예요를 나타내는 컴포넌트
// type: "good" --> 좋아요 버튼
// type: "bad" --> 별로예요 버튼
export default function GoodBadButton({ type }: IGoodBadButtonProps) {
  const toast = useToast();
  const userItem = JSON.parse(localStorage.getItem("user") as any); // localStorage 사용자 정보
  const [rating, setRating] = useRecoilState(ratingState);
  const movieID = useRecoilValue(movieIDState);

  // 좋아요, 별로에요 정보 불러오기
  useEffect(() => {
    if (userItem && userItem.movies.good.includes(movieID)) {
      setRating("good");
    }
    if (userItem && userItem.movies.bad.includes(movieID)) {
      setRating("bad");
    }
  }, []);

  const saveMoviesToDB = async (
    goodMovies: IUserMovies["good"],
    badMovies: IUserMovies["bad"]
  ) => {
    let dbInfo;
    if (type === "good") {
      dbInfo = {
        id: userItem.id,
        username: userItem.username,
        friends: userItem.friends,
        movies: {
          watch: userItem.movies.watch,
          good: goodMovies,
          bad: badMovies,
        },
      };
    } else {
      dbInfo = {
        id: userItem.id,
        username: userItem.username,
        friends: userItem.friends,
        movies: {
          watch: userItem.movies.watch,
          good: goodMovies,
          bad: badMovies,
        },
      };
    }
    await setDoc(doc(db, "users", userItem.id), dbInfo);
    localStorage.setItem("user", JSON.stringify(dbInfo));
  };

  const getUpdatedMovies = () => {
    let goodMovies = userItem.movies.good;
    let badMovies = userItem.movies.bad;

    // 좋아요 버튼을 누르면
    if (type === "good") {
      setRating((current) => (current === "good" ? "" : "good"));
      if (rating === "good") {
        goodMovies = goodMovies?.filter((id: number) => id !== movieID);
      }
      if (rating === "bad" && !goodMovies.includes(movieID)) {
        goodMovies = goodMovies?.concat([movieID]);
        badMovies = badMovies?.filter((id: number) => id !== movieID);
      }
      if (rating === "" && !goodMovies.includes(movieID)) {
        goodMovies = goodMovies?.concat([movieID]);
      }
    } else {
      // 별로예요 버튼을 누르면
      setRating((current) => (current === "bad" ? "" : "bad"));
      if (rating === "bad") {
        badMovies = badMovies?.filter((id: number) => id !== movieID);
      }
      if (rating === "good" && !badMovies.includes(movieID)) {
        badMovies = badMovies?.concat([movieID]);
        goodMovies = goodMovies?.filter((id: number) => id !== movieID);
      }
      if (rating === "" && !badMovies.includes(movieID)) {
        badMovies = badMovies?.concat([movieID]);
      }
    }

    return { goodMovies, badMovies };
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
      // 로그인 한 사용자에 한해서
      // 버튼을 누르면 DB에 영화를 추가하고 해제하면 삭제한다.
      const { goodMovies, badMovies } = getUpdatedMovies();

      saveMoviesToDB(goodMovies, badMovies);
    }
  };
  console.log(rating);

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
