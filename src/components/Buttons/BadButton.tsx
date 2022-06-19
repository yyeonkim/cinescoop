import { Circle, Icon, Tooltip, useToast } from "@chakra-ui/react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { RiThumbDownLine, RiThumbDownFill } from "react-icons/ri";
import { auth, db } from "../../../firebase";

interface IBadButtonProps {
  movieId: number;
}

function BadButton({ movieId }: IBadButtonProps) {
  const [badState, setBadState] = useState(false);
  const toast = useToast();

  const updateBadList = async () => {
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
      setBadState(!badState);

      const userRef = doc(db, "users", user.uid);
      const dbUser = await getDoc(userRef);
      const dbUserData = dbUser.data();

      let updatedBadList = dbUserData?.movies["bad"];

      if (badState === false) {
        updatedBadList.push(movieId);
      } else {
        updatedBadList = updatedBadList.filter(
          (item: number) => item !== movieId
        );
      }

      const docData = {
        ...dbUserData,
        movies: {
          bad: updatedBadList,
          good: dbUserData?.movies.bad,
          watch: dbUserData?.movies.watch,
        },
      };

      await setDoc(userRef, docData);
      console.log("bad list updated");
    }
  };

  return (
    <Tooltip
      label={
        badState ? "Remove movie from <Bad List>" : "Add movie to <Bad List>"
      }
      aria-label="Description tooltip"
      hasArrow
      placement="top-start"
      color="white"
      bg="pink"
    >
      <Circle p="0.5rem" border="1px solid black" onClick={updateBadList}>
        <Icon
          as={badState ? RiThumbDownFill : RiThumbDownLine}
          aria-label={"bad button"}
          w="1rem"
          h="1rem"
        />
      </Circle>
    </Tooltip>
  );
}

export default BadButton;
