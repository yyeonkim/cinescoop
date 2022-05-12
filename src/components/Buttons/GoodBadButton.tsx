import { Circle, useToast } from "@chakra-ui/react";
import {
  RiThumbUpFill,
  RiThumbUpLine,
  RiThumbDownLine,
  RiThumbDownFill,
} from "react-icons/ri";
import { useRecoilState } from "recoil";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import { ratingState } from "../../atom";
import { auth, db } from "../../../firebase";
import { IUserMovies } from "../../interfaces";

// 버튼 타입
interface IGoodBadButtonProps {
  type: "good" | "bad";
  movieID: number;
}

// 좋아요 또는 별로예요를 나타내는 컴포넌트
// type: "good" --> 좋아요 버튼
// type: "bad" --> 별로예요 버튼
export default function GoodBadButton({ type, movieID }: IGoodBadButtonProps) {
  const toast = useToast();
  const user = auth.currentUser;

  const [isLoggedIn, setIsLoggedIn] = useState(user ? true : false);
  const [rating, setRating] = useRecoilState(ratingState);

  // 좋아요, 별로에요 정보 불러오기
  useEffect(() => {
    // 로그인 상태 확인하기
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    // 로그인 사용자이면 좋아요/별로예요 평가 설정하기
    (async () => {
      if (isLoggedIn) {
        const docRef = doc(db, "users", `${user?.uid}`);
        const docSnap = await getDoc(docRef);
        const { good, bad } = docSnap?.data()?.movies;

        if (good.includes(movieID)) {
          setRating("good");
        }
        if (bad.includes(movieID)) {
          setRating("bad");
        } else {
          // 로그아웃 사용자이면, rating을 빈 값으로 설정
          setRating("");
        }
      }
    })();
  }, [isLoggedIn]);

  const saveMoviesToDB = async (
    good: IUserMovies["good"],
    bad: IUserMovies["bad"]
  ) => {
    const docRef = doc(db, "users", `${user?.uid}`);
    const docSnap = await getDoc(docRef);
    const {
      friends,
      username,
      movies: { watch },
    }: any = docSnap?.data();

    const dbInfo = {
      id: user?.uid,
      username,
      friends,
      movies: {
        watch,
        good,
        bad,
      },
    };

    await setDoc(doc(db, "users", user?.uid), dbInfo);
  };

  // 업데이트한 좋아요/별로예요 영화 목록 가져오기
  const getUpdatedMovies = async () => {
    const docRef = doc(db, "users", `${user?.uid}`);
    const docSnap = await getDoc(docRef);
    const { good, bad } = docSnap?.data()?.movies;

    let updatedGood = good;
    let updatedBad = bad;

    // 좋아요 버튼을 누르면
    if (type === "good") {
      setRating((current) => (current === "good" ? "" : "good"));
      if (rating === "good") {
        updatedGood = updatedGood?.filter((id: number) => id !== movieID);
      }
      if (rating === "bad" && !updatedGood.includes(movieID)) {
        updatedGood = updatedGood?.concat([movieID]);
        updatedBad = updatedBad?.filter((id: number) => id !== movieID);
      }
      if (rating === "" && !updatedGood.includes(movieID)) {
        updatedGood = updatedGood?.concat([movieID]);
      }
    } else {
      // 별로예요 버튼을 누르면
      setRating((current) => (current === "bad" ? "" : "bad"));
      if (rating === "bad") {
        updatedBad = updatedBad?.filter((id: number) => id !== movieID);
      }
      if (rating === "good" && !updatedBad.includes(movieID)) {
        updatedBad = updatedBad?.concat([movieID]);
        updatedGood = updatedGood?.filter((id: number) => id !== movieID);
      }
      if (rating === "" && !updatedBad.includes(movieID)) {
        updatedBad = updatedBad?.concat([movieID]);
      }
    }

    return { updatedGood, updatedBad };
  };

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
      // 로그인 한 사용자에 한해서
      // 버튼을 누르면 DB에 영화를 추가하고 해제하면 삭제한다.
      const { updatedGood, updatedBad } = await getUpdatedMovies();
      saveMoviesToDB(updatedGood, updatedBad);
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
