import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { db } from "../../firebase";
import { friendState, selectedFriendSelector } from "../atom";
import { IFriend } from "../interfaces";

function useFetchFriendData() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [friendData, setFriendData] = useRecoilState(friendState);
  const friendId = useRecoilValue(selectedFriendSelector);

  // console.log("selectedFriend", selectedFriend);

  useEffect(() => {
    const getFriendData = async () => {
      setIsLoading(true);
      setIsError(false);

      // console.log("selected id", friendId);
      try {
        const friendRef = doc(db, "users", friendId);
        const dbFriend = await getDoc(friendRef);
        const dbFriendData = await dbFriend.data();
        //   console.log(dbUserData);

        dbFriendData != undefined && setFriendData(dbFriendData as any);
        setIsLoading(false);
      } catch (e) {
        setIsError(true);
        console.log(e);
      }
    };

    getFriendData();
  }, [friendId]);

  return { friendData, isLoading, isError };
}

export default useFetchFriendData;
