import { Flex, Image } from "@chakra-ui/react";

interface MainImageSectionProps {
  filePath: String;
}

function MainImageSection({ filePath }: MainImageSectionProps) {
  return (
    <Flex marginBottom="1rem" position="relative">
      <Image
        src={`https://www.themoviedb.org/t/p/w1280/${filePath} `}
        w="25vw"
        filter="blur(3px)"
        objectFit="none"
        objectPosition="left 50%"
      />
      <Image
        src={`https://www.themoviedb.org/t/p/w1280/${filePath} `}
        w="50vw"
      />
      <Image
        src={`https://www.themoviedb.org/t/p/w1280/${filePath} `}
        w="25vw"
        filter="blur(3px)"
        objectFit="none"
        objectPosition="right 50%"
      />
    </Flex>
  );
}

export default MainImageSection;
