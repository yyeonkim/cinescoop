import {
  AspectRatio,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Heading,
} from "@chakra-ui/react";

import { IVideo } from "../../../interfaces";

interface relatedVideosBoxProps {
  videos: IVideo[];
}

function RelatedVideosBox({ videos }: relatedVideosBoxProps) {
  return (
    <Flex
      p={["1rem 2rem 2rem", "1rem 2rem 2rem", "1rem 5rem 5rem"]}
      flexDir="column"
      w="100%"
      alignItems="center"
    >
      <Heading fontSize={["2xl", "2xl", "4xl"]}>Related Videos</Heading>
      <Tabs variant="soft-rounded" align="center" w="100%">
        <TabList
          my="1rem"
          overflowY="hidden"
          sx={{
            scrollbarWidth: "none",
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {videos.map((video, index) => (
            <Tab
              fontSize={["sm", "sm", "md"]}
              key={index}
              flexShrink={0}
              _hover={{ color: "pink" }}
              _selected={{
                color: "brightBlue",
                bgColor: "lightBlue",
                fontWeight: "bold",
              }}
              _focus={{ outline: "none" }}
            >
              {video.type}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {videos.map((video) => (
            <TabPanel padding="1" marginTop="1">
              <AspectRatio w="100%" ratio={1.7}>
                <iframe
                  src={`https://www.youtube.com/embed/${video.key}?vq=hd1080&autoplay=1&modestbranding=1&showinfo=0&rel=0&fs=0&color=white&disablekb=1&mute=1`}
                  frameBorder="0"
                />
              </AspectRatio>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default RelatedVideosBox;
