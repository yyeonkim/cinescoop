import { Circle } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useRecoilState } from "recoil";

import { likedState } from "../atom";

export default function LikeButton() {
  const [liked, setLiked] = useRecoilState(likedState);

  return (
    <Circle
      size="2.5rem"
      bg="white"
      color="pink"
      _hover={{ cursor: "pointer" }}
      onClick={() => setLiked((current) => !current)}
    >
      {liked ? <AiFillHeart size="1.4rem" /> : <AiOutlineHeart size="1.4rem" />}
    </Circle>
  );
}
