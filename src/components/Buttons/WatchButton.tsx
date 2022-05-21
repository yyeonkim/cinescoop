import { Circle, Icon, Tooltip, useToast } from "@chakra-ui/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import { auth, db } from "../../../firebase";

interface IWatchBottonProps {
  movieId: number;
}

function WatchButton({ movieId }: IWatchBottonProps) {
  const [watchState, setWatchState] = useState(false);
  const toast = useToast();

  useEffect(() => {
    // 로그인 사용자이면 찜하기 설정하기
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", `${user?.uid}`);
        const docSnap = await getDoc(docRef);
        const watch = docSnap?.data()?.movies.watch;

        if (watch.includes(movieId)) {
          setWatchState(true);
        }
      }
    });
  }, []);

  const updateWatchList = async () => {
    const user = auth.currentUser;

    if (!user) {
      toast({
        position: "bottom",
        title: "로그인 해주세요",
        description: "로그인이 필요한 서비스입니다.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    } else {
      setWatchState(!watchState);

      const userRef = doc(db, "users", user.uid);
      const dbUser = await getDoc(userRef);
      const dbUserData = dbUser.data();

      let updatedWatchList = dbUserData?.movies["watch"];

      if (watchState === false) {
        updatedWatchList.push(movieId);
      } else {
        updatedWatchList = updatedWatchList.filter(
          (item: number) => item !== movieId
        );
      }

      const docData = {
        ...dbUserData,
        movies: {
          bad: dbUserData?.movies.bad,
          good: dbUserData?.movies.good,
          watch: updatedWatchList,
        },
      };

      await setDoc(userRef, docData);
      console.log("watch list updated");
    }
  };

  return (
    <Tooltip
      label={
        watchState
          ? "Remove movie from <Watchlist>"
          : "Add movie to <Watchlist>"
      }
      aria-label="Description tooltip"
      hasArrow
      placement="top-start"
      color="white"
      bg="pink"
    >
      <Circle
        size="2.5rem"
        border="1px solid black"
        onClick={updateWatchList}
        bg="white"
      >
        <Icon
          as={watchState ? AiOutlineCheck : AiOutlinePlus}
          aria-label={"watch button"}
          w="1rem"
          h="1rem"
          color="black"
        />
      </Circle>
    </Tooltip>
  );
}

export default WatchButton;
