import { Circle, Icon, Tooltip, useToast } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { RiThumbDownLine, RiThumbDownFill } from "react-icons/ri";
import { auth, db } from "../../../firebase";

function BadButton() {
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
    } else {
      const dbUser = await getDoc(doc(db, "users", user.uid));

      console.log(dbUser.data().movies);
      //good 추가
      //     if (goodState === false) {
      //       dbUser.
      //   }
      setBadState(!badState);
    }
  };

  return (
    <Tooltip
      label={
        badState ? "Remove movie from <Bad List>" : "Add movie to <Bad List>"
      }
      aria-label="Description tooltip"
    >
      <Circle p="0.8rem" border="1px solid black">
        <Icon
          as={badState ? RiThumbDownFill : RiThumbDownLine}
          aria-label={"good button"}
          onClick={() => setBadState(!badState)}
          w="1rem"
          h="1rem"
        />
      </Circle>
    </Tooltip>
  );
}

export default BadButton;
