import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

import { auth, db } from "../../firebase";
import { fetchDetail } from "./fetching";

// 찜한 영화의 detail 정보를 return 한다.
export default function useFetchWatchData() {
  const [isLoading, setIsLoading] = useState(true);
  const [watchData, setWatchData] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      // 로그인 사용자이면
      if (user) {
        const docRef = doc(db, "users", `${user?.uid}`);
        const docSnap = await getDoc(docRef);
        const ids = docSnap?.data()?.movies.watch; // 찜한 영화 id

        // 찜한 영화 정보 가져오기
        for (let i = 0; i < ids.length; i++) {
          const data = await fetchDetail(ids[i]);
          setWatchData((current) => current.concat(data));
        }
        setIsLoading(false);
      }
    });
  }, []);

  return { isLoading, watchData };
}
