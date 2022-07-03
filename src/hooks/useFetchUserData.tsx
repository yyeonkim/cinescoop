import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { auth, db } from "../../firebase";
import { userState } from "../atom";

function useFetchUserData() {
  const user = auth.currentUser;

  const [userData, setUserData] = useRecoilState(userState);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      if (user) {
        setIsLoading(true);
        setIsError(false);

        try {
          const userRef = doc(db, "users", user.uid);
          const dbUser = await getDoc(userRef);
          const dbUserData = await dbUser.data();

          dbUserData != undefined && setUserData(dbUserData);
          setIsLoading(false);
        } catch (e) {
          setIsError(true);
          console.log(e);
        }
      }
    };

    getUserData();
    console.log("userData", userData);
  }, [user]);

  return { userData, isLoading, isError };
}

export default useFetchUserData;
