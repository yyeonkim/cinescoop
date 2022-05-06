import { Circle } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useRecoilState } from "recoil";
import { movieIDState } from "../../atom";
import { useRouter } from "next/router";
import { IMovie } from "../../interfaces";

interface HoverProps {
  info: IMovie;
}

function DetailButton({ info }: HoverProps) {
  const router = useRouter();
  const [movieID, setMovieID] = useRecoilState(movieIDState);

  const seeMovieInfo = (id: number) => {
    setMovieID(id);
    router.push(`/movieinfo/${id}`);
  };

  return (
    <Circle
      size="2.5rem"
      bg="white"
      color="pink"
      _hover={{ cursor: "pointer" }}
      onClick={() => seeMovieInfo(info.id)}
    >
      <ArrowForwardIcon />
    </Circle>
  );
}

export default DetailButton;
