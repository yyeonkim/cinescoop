import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import { auth, db } from "../../firebase";
import { selectedFriendSelector } from "../atom";
import { fetchDetail } from "./fetching";

export default function useFetchListData() {
  const [isLoading, setIsLoading] = useState(true);
  const [watchData, setWatchData] = useState([]);
  const [goodData, setGoodData] = useState([]);
  const friendId = useRecoilValue(selectedFriendSelector);
  const [friendGoodData, setFriendGoodData] = useState([]); // 친구 영화 정보

  // 친구 영화 정보 가져오기
  useEffect(() => {
    (async () => {
      const docRef = doc(db, "users", friendId);
      const docSnap = await getDoc(docRef);
      const { good } = docSnap?.data()?.movies; // 좋아요 영화 id
      // 좋아요 영화 정보 가져오기
      good?.forEach(async (id: number) => {
        const data = await fetchDetail(id);
        setFriendGoodData((current) => current.concat(data));
      });
    })();

    setIsLoading(false);

    return () => {
      setFriendGoodData([]); // 영화 정보 초기화
    };
  }, [friendId]);

  // 내 영화 정보 가져오기
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

  return { isLoading, watchData, goodData, friendGoodData };
}
