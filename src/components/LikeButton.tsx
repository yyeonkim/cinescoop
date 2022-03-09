import { Circle } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useRecoilState, useRecoilValue } from "recoil";
import { doc, setDoc } from "firebase/firestore";

import { likedState, movieIDState } from "../atom";

export default function LikeButton() {
  const [liked, setLiked] = useRecoilState(likedState);
  const movieID = useRecoilValue(movieIDState);

  const onClick = () => {
    setLiked((current) => !current);
    // 찜하기 취소
    if (liked) {
      console.log(movieID);
    }
  };

  return (
    <Circle
      size="2.5rem"
      bg="white"
      color="pink"
      _hover={{ cursor: "pointer" }}
      onClick={onClick}
    >
      {liked ? <AiFillHeart size="1.4rem" /> : <AiOutlineHeart size="1.4rem" />}
    </Circle>
  );
}
