import { Circle, Tooltip, useToast } from "@chakra-ui/react";
import {
  RiThumbUpFill,
  RiThumbUpLine,
  RiThumbDownLine,
  RiThumbDownFill,
} from "react-icons/ri";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

import { auth, db } from "../../../firebase";
import { IUserMovies, IGenre } from "../../interfaces";
import { useRecoilState } from "recoil";
import { ratingState } from "../../atom";

interface IGoodBadButtonProps {
  type: "good" | "bad";
  movieId: number;
  genres: IGenre[] | undefined | never[];
}

// 좋아요 또는 별로예요를 나타내는 컴포넌트
// type: "good" --> 좋아요 버튼
// type: "bad" --> 별로예요 버튼
export default function GoodBadButton({
  type,
  movieId,
  genres,
}: IGoodBadButtonProps) {
  const user = auth.currentUser;
  const toast = useToast();
  const [rating, setRating] = useRecoilState(ratingState);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      // 로그인 사용자이면 좋아요/별로예요 평가 설정하기
      if (user) {
        const docRef = doc(db, "users", `${user?.uid}`);
        const docSnap = await getDoc(docRef);
        const { good, bad } = docSnap?.data()?.movies;

        if (good.includes(movieId)) {
          setRating("good");
        } else if (bad.includes(movieId)) {
          setRating("bad");
        } else {
          // 평가를 하지 않았으면
          setRating("");
        }
      } else {
        // 로그아웃 사용자이면, rating을 빈 값으로 설정
        setRating("");
      }
    });
  }, []);

  const saveMoviesToDB = async (
    good: IUserMovies["good"],
    bad: IUserMovies["bad"],
    updatedGenresObj: IGenre[]
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
      genres: updatedGenresObj,
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
        updatedGood = updatedGood?.filter((id: number) => id !== movieId);
      }
      if (rating === "bad" && !updatedGood.includes(movieId)) {
        updatedGood = updatedGood?.concat([movieId]);
        updatedBad = updatedBad?.filter((id: number) => id !== movieId);
      }
      if (rating === "" && !updatedGood.includes(movieId)) {
        updatedGood = updatedGood?.concat([movieId]);
      }
    } else {
      // 별로예요 버튼을 누르면
      setRating((current) => (current === "bad" ? "" : "bad"));
      if (rating === "bad") {
        updatedBad = updatedBad?.filter((id: number) => id !== movieId);
      }
      if (rating === "good" && !updatedBad.includes(movieId)) {
        updatedBad = updatedBad?.concat([movieId]);
        updatedGood = updatedGood?.filter((id: number) => id !== movieId);
      }
      if (rating === "" && !updatedBad.includes(movieId)) {
        updatedBad = updatedBad?.concat([movieId]);
      }
    }

    return { updatedGood, updatedBad };
  };

  const getUpdatedGenres = async () => {
    const docRef = doc(db, "users", `${user?.uid}`);
    const docSnap = await getDoc(docRef);
    const updatedGenresObj = docSnap?.data()?.genres;

    // 좋아요 버튼을 누르면
    if (type === "good") {
      if (rating === "good") {
        // '좋아요'를 해제하는 경우, 장르를 제거한다.
        genres?.forEach((genre) => {
          const key = genre.name;
          updatedGenresObj[key]--;
        });
      } else {
        // '좋아요' 평가를 하는 경우, 장르를 추가한다.
        genres?.forEach((genre) => {
          const key = genre.name;
          if (key in updatedGenresObj) {
            updatedGenresObj[key]++;
          } else {
            updatedGenresObj[key] = 1;
          }
        });
      }
    } else {
      // '좋아요'로 평가한 상태에서 별로예요 버튼을 누르면
      if (rating === "good") {
        // 장르를 제거한다.
        genres?.forEach((genre) => {
          const key = genre.name;
          updatedGenresObj[key]--;
        });
      }
    }

    return updatedGenresObj;
  };

  const onClick = async () => {
    if (!user) {
      toast({
        title: "로그인 해주세요",
        description: "로그인이 필요한 서비스입니다.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    } else {
      // 로그인 사용자만 서비스 이용이 가능하다.
      // 버튼을 누르면 DB에 영화를 추가/삭제한다.
      // 좋아요 한 영화 장르를 DB에 반영한다.
      const { updatedGood, updatedBad } = await getUpdatedMovies();
      const updatedGenresObj = await getUpdatedGenres();
      saveMoviesToDB(updatedGood, updatedBad, updatedGenresObj);
    }
  };

  return (
    <Tooltip
      label={
        type === "good"
          ? "'좋아요' 영화에 추가됩니다"
          : "'별로예요' 영화에 추가됩니다"
      }
      aria-label="Description tooltip"
      hasArrow
      placement="top-start"
      color="white"
      bg="pink"
    >
      <Circle
        size="2.5rem"
        bg="white"
        _hover={{ cursor: "pointer" }}
        onClick={onClick}
        color="black"
        border="1px"
      >
        {type === "good" ? (
          rating === "good" ? (
            <RiThumbUpFill size="1.4rem" color="brightBlue" />
          ) : (
            <RiThumbUpLine size="1.4rem" />
          )
        ) : rating === "bad" ? (
          <RiThumbDownFill size="1.4rem" color="brightBlue" />
        ) : (
          <RiThumbDownLine size="1.4rem" />
        )}
      </Circle>
    </Tooltip>
  );
}
