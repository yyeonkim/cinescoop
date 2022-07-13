import { Divider, Flex, Image, useColorModeValue } from "@chakra-ui/react";

import { IMovieDetails, ICast, ICrew, IVideo } from "../../interfaces";
import ticketTopArt from "../../../public/ticketTopArt.svg";
import ticketMiddleArt from "../../../public/ticketMiddleArt.svg";
import ticketBottomArt from "../../../public/ticketBottomArt.svg";
import InfoBox from "./Ticket/InfoBox";
import RelatedVideosBox from "./Ticket/RelatedVidesBox";

interface ticketProps {
  details: IMovieDetails;
  cast: ICast[];
  crew: ICrew[];
  videos: IVideo[];
}

function Ticket({ details, cast, crew, videos }: ticketProps) {
  const color = useColorModeValue("darkBlue", "black");

  return (
    <>
      <Image src={ticketTopArt.src} maxW="1280px" w="90%" marginTop="1rem" />
      <Flex
        maxW="1280px"
        w="90%"
        flexDir="column"
        alignItems="center"
        bgColor="white"
        color={color}
        position="relative"
        zIndex={2}
        fontSize="0.8rem"
      >
        <InfoBox details={details} cast={cast} crew={crew} />
        <Image
          src={ticketMiddleArt.src}
          maxW="1280px"
          w="100%"
          marginTop="1rem"
          position="relative"
        />
        <Divider />
        <RelatedVideosBox videos={videos} />
      </Flex>
      <Image
        src={ticketBottomArt.src}
        maxW="1280px"
        w="90%"
        position="relative"
        zIndex={2}
      />
    </>
  );
}

export default Ticket;
