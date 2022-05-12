import { Circle, useToast } from "@chakra-ui/react";
import {
  RiThumbUpFill,
  RiThumbUpLine,
  RiThumbDownLine,
  RiThumbDownFill,
} from "react-icons/ri";
import { useRecoilState, useRecoilValue } from "recoil";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

import { movieIDState, ratingState } from "../../atom";
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

  const [rating, setRating] = useRecoilState(ratingState);
  const [goodMovies, setGoodMovies] = useState([]);
  const [badMovies, setBadMovies] = useState([]);

  // 좋아요, 별로에요 정보 불러오기
  useEffect(() => {
    // 로그인 사용자이면 좋아요/별로예요 영화 가져오기
    (async () => {
      if (user) {
        const docRef = doc(db, "users", `${user?.uid}`);
        const docSnap = await getDoc(docRef);
        const { good, bad } = docSnap?.data()?.movies;
        setGoodMovies(good);
        setBadMovies(bad);

        if (goodMovies.includes(movieID)) {
          setRating("good");
        }
        if (badMovies.includes(movieID)) {
          setRating("bad");
        } else {
          // 로그아웃 사용자이면, rating을 빈 값으로 설정
          setRating("");
        }
      }
    })();
  }, []);

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
    localStorage.setItem("user", JSON.stringify(dbInfo));
  };

  // 업데이트한 좋아요/별로예요 영화 목록 가져오기
  const getUpdatedMovies = () => {
    let updatedGood = goodMovies;
    let updatedBad = badMovies;

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

    // state 업데이트
    setGoodMovies(updatedGood);
    setBadMovies(updatedBad);

    return { updatedGood, updatedBad };
  };

  const onClick = async () => {
    console.log(user);
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
      const { updatedGood, updatedBad } = getUpdatedMovies();
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
