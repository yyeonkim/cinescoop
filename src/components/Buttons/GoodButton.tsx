import { Circle, Icon, Tooltip, useToast } from "@chakra-ui/react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { RiThumbUpFill, RiThumbUpLine } from "react-icons/ri";
import { auth, db } from "../../../firebase";
import { IMovieBtn } from "../../interfaces";

function GoodButton({ movieId, genres }: IMovieBtn) {
  const [goodState, setGoodState] = useState(false);
  const toast = useToast();

  const updateGoodList = async () => {
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
      setGoodState(!goodState);

      const userRef = doc(db, "users", user.uid);
      const dbUser = await getDoc(userRef);
      const dbUserData = dbUser.data();

      let updatedGoodList = dbUserData?.movies["good"];
      let updatedGenresObj = dbUserData?.genres;

      if (goodState === false) {
        updatedGoodList.push(movieId);
        genres.forEach((genre) => {
          const key = genre.name;
          if (key in updatedGenresObj) {
            updatedGenresObj[key]++;
          } else {
            updatedGenresObj[key] = 1;
          }
        });
      } else {
        updatedGoodList = updatedGoodList.filter(
          (item: number) => item !== movieId
        );
        genres.forEach((genre) => {
          const key = genre.name;
          updatedGenresObj[key]--;
        });
      }

      const docData = {
        ...dbUserData,
        genres: updatedGenresObj,
        movies: {
          bad: dbUserData?.movies.bad,
          good: updatedGoodList,
          watch: dbUserData?.movies.watch,
        },
      };

      await setDoc(userRef, docData);
      console.log("good list updated");
    }
  };

  return (
    <Tooltip
      label={
        goodState ? "Remove movie from <Good List>" : "Add movie to <Good List>"
      }
      aria-label="Description tooltip"
      hasArrow
      placement="top-start"
      color="white"
      bg="pink"
    >
      <Circle p="0.5rem" border="1px solid black" onClick={updateGoodList}>
        <Icon
          as={goodState ? RiThumbUpFill : RiThumbUpLine}
          aria-label={"good button"}
          w="1rem"
          h="1rem"
        />
      </Circle>
    </Tooltip>
  );
}

export default GoodButton;
