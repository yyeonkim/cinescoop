import {
  AspectRatio,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from "@chakra-ui/react";

import { VideosTest } from "../../TestCase";

interface video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

interface relatedVideosProps {
  videos: video[];
}

function RelatedVideos({ videos }: relatedVideosProps) {
  const color = useColorModeValue("white", "black");

  return (
    <Flex
      w="50vw"
      flexDir="column"
      alignItems="center"
      bgColor="white"
      padding="2rem 5rem 5rem 5rem"
      color={color}
    >
      <Heading size="xl" marginBottom="2rem">
        Related Videos
      </Heading>
      <Tabs align="center">
        <TabList>
          {videos.map((video, index) => (
            <Tab key={index}>{video.type}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {videos.map((video, index) => (
            <TabPanel>
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

export default RelatedVideos;
