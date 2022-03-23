import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { auth, db } from "../../firebase";
import { likedState } from "../atom";
import { IUserDB, IUserMovie } from "../interfaces";

type IMovieId = string | string[] | undefined;

export default function useFillButton(movieId: IMovieId) {
  const setLiked = useSetRecoilState(likedState);

  // 사용자가 찜한 영화 가져오기
  const getLikedMovies = async (uid: string) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    const movies: IUserDB["movies"] = docSnap.data()?.movies;

    return movies;
  };

  useEffect(() => {
    // 사용자 로그인 여부 확인
    (async () => {
      const user = auth.currentUser;
      if (user) {
        const { uid } = user;
        const likedMovies = await getLikedMovies(uid); // 사용자가 찜한 영화

        // 찜한 영화인지 아닌지 확인
        if (likedMovies !== undefined) {
          const index = likedMovies.findIndex(
            (movie: IUserMovie) => `${movie.id}` === movieId
          );
          // 좋아요 표시
          setLiked(index === -1 ? false : true);
        }
      }
    })();
  }, [movieId]);
}
