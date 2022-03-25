import { Icon } from "@chakra-ui/react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Dispatch, SetStateAction } from "react";

interface ShowIconProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

function ShowIcon({ show, setShow }: ShowIconProps) {
  const clickShow = () => setShow(!show);

  return (
    <>
      {show ? (
        <Icon boxSize="1.5rem" as={AiFillEye} onClick={clickShow} />
      ) : (
        <Icon boxSize="1.5rem" as={AiFillEyeInvisible} onClick={clickShow} />
      )}
    </>
  );
}

export default ShowIcon;
