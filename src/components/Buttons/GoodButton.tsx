import { Circle, Icon, Tooltip, useToast } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { RiThumbUpFill, RiThumbUpLine } from "react-icons/ri";
import { auth, db } from "../../../firebase";

function GoodButton() {
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
    } else {
      const dbUser = await getDoc(doc(db, "users", user.uid));

      console.log(dbUser.data().movies);
      //good 추가
      //     if (goodState === false) {
      //       dbUser.
      //   }
      setGoodState(!goodState);
    }
  };

  return (
    <Tooltip
      label={
        goodState ? "Remove movie from <Good List>" : "Add movie to <Good List>"
      }
      aria-label="Description tooltip"
    >
      <Circle p="0.8rem" border="1px solid black">
        <Icon
          as={goodState ? RiThumbUpFill : RiThumbUpLine}
          aria-label={"good button"}
          onClick={updateGoodList}
          w="1rem"
          h="1rem"
        />
      </Circle>
    </Tooltip>
  );
}

export default GoodButton;
