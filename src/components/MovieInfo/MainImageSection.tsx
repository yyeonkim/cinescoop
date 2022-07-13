import { Flex, Image, useMediaQuery } from "@chakra-ui/react";

import { IMAGE_URL } from "../../hooks/fetching";

interface MainImageSectionProps {
  filePath: String;
}

function MainImageSection({ filePath }: MainImageSectionProps) {
  const [isLargerThan641] = useMediaQuery("(min-width: 641px)");

  return (
    <Flex marginBottom="1rem" position="relative">
      <Image
        src={`${IMAGE_URL}/w1280/${filePath} `}
        w={isLargerThan641 ? "25vw" : "10vw"}
        filter="blur(3px)"
        objectFit="none"
        objectPosition="left 50%"
      />
      <Image
        src={`${IMAGE_URL}/w1280/${filePath} `}
        w={isLargerThan641 ? "50vw" : "80vw"}
      />
      <Image
        src={`${IMAGE_URL}/w1280/${filePath} `}
        w={isLargerThan641 ? "25vw" : "10vw"}
        filter="blur(3px)"
        objectFit="none"
        objectPosition="right 50%"
      />
    </Flex>
  );
}

export default MainImageSection;
