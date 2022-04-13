import { Circle, Icon, Tooltip, useToast } from "@chakra-ui/react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbUpLine } from "react-icons/ri";
import { auth, db } from "../../../firebase";
import { IMovieId } from "../../interfaces";

function WatchButton({ movieId }: IMovieId) {
  const [watchState, setWatchState] = useState(false);
  const toast = useToast();

  const updateWatchList = async () => {
    const user = auth.currentUser;

    if (!user) {
      toast({
        position: "top",
        title: "로그인 해주세요",
        description: "로그인이 필요한 서비스입니다.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      return;
    } else {
      setWatchState(!watchState);

      const userRef = doc(db, "users", user.uid);
      const dbUser = await getDoc(userRef);
      const dbUserData = dbUser.data();

      let updatedWatchList = dbUserData.movies["watch"];

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
      <Circle p="0.5rem" border="1px solid black" onClick={updateWatchList}>
        <Icon
          as={watchState ? AiOutlineCheck : AiOutlinePlus}
          aria-label={"watch button"}
          w="1rem"
          h="1rem"
        />
      </Circle>
    </Tooltip>
  );
}

export default WatchButton;
