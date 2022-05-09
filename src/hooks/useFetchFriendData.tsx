import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { db } from "../../firebase";
import { friendState } from "../atom";
import { IFriend } from "../interfaces";

function useFetchFriendData({ friendId, friendUsername }: IFriend) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [friendData, setFriendData] = useRecoilState(friendState);

  useEffect(() => {
    const getFriendData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const friendRef = doc(db, "users", friendId);
        const dbFriend = await getDoc(friendRef);
        const dbFriendData = await dbFriend.data();
        //   console.log(dbUserData);

        dbFriendData != undefined && setFriendData(dbFriendData);
        setIsLoading(false);
      } catch (e) {
        setIsError(true);
        console.log(e);
      }
    };

    getFriendData();
    console.log("friendData", friendData);
  }, [friendId]);

  return { friendData, isLoading, isError };
}

export default useFetchFriendData;
