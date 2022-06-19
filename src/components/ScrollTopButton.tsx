import { useEffect, useState } from "react";
import { Button, IconButton, Box } from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";

const ScrollTopButton = () => {
  const [ScrollY, setScrollY] = useState(0);
  const [isBtn, setIsBtn] = useState(false); // 버튼 상태

  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    ScrollY > 100 ? setIsBtn(true) : setIsBtn(false);
  };

  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setScrollY(0);
    setIsBtn(false);
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener("scroll", handleFollow);
    };
    watch();
    return () => {
      window.removeEventListener("scroll", handleFollow);
    };
  });

  return (
    <>
      {isBtn ? (
        <IconButton
          borderRadius="50%"
          aria-label="Arrow Up"
          onClick={handleTop}
          icon={<ArrowUpIcon />}
        />
      ) : (
        ""
      )}
    </>
  );
};
export default ScrollTopButton;
