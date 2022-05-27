import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

import { auth, db } from "../../firebase";
import { fetchDetail } from "./fetching";

// 찜한 영화의 detail 정보를 return 한다.
export default function useFetchListData() {
  const [isLoading, setIsLoading] = useState(true);
  const [watchData, setWatchData] = useState([]);
  const [goodData, setGoodData] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      // 로그인 사용자이면
      if (user) {
        const docRef = doc(db, "users", `${user?.uid}`);
        const docSnap = await getDoc(docRef);
        const { watch, good } = docSnap?.data()?.movies; // 찜한 / 좋아요 영화 id

        // 찜한 영화 정보 가져오기
        watch?.forEach(async (id: number) => {
          const data = await fetchDetail(id);
          setWatchData((current) => current.concat(data));
        });
        // 좋아요 영화 정보 가져오기
        good?.forEach(async (id: number) => {
          const data = await fetchDetail(id);
          setGoodData((current) => current.concat(data));
        });
      }
      setIsLoading(false);
    });
  }, []);

  return { isLoading, watchData, goodData };
}
