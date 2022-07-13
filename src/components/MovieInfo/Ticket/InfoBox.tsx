import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  List,
  ListItem,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";

import StarRating from "../../StarRatings";
import { ICast, ICrew, IMovieDetails } from "../../../interfaces";
import WatchButton from "../../Buttons/WatchButton";
import GoodBadButton from "../../Buttons/GoodBadButton";

interface infoBoxprops {
  details: IMovieDetails;
  cast: ICast[];
  crew: ICrew[];
}

function InfoBox({ details, cast, crew }: infoBoxprops) {
  const [isLargerThan641] = useMediaQuery("(min-width: 641px)");

  return (
    <Flex
      padding={isLargerThan641 ? "2rem 5rem 5rem 5rem" : "1rem 2rem 2rem 2rem"}
      flexDir="column"
    >
      <Heading size={isLargerThan641 ? "2xl" : "lg"} textAlign="center">
        {details?.title}
      </Heading>
      <Box mt={2} textAlign="center">
        <StarRating voteAverage={details?.vote_average} starSize={"1.5rem"} />
      </Box>
      <Flex
        w="100%"
        minH="min-content"
        maxH="min-content"
        padding="2rem 0 3rem 0"
        direction={isLargerThan641 ? "row" : "column"}
      >
        <Flex
          flexDir="column"
          w={isLargerThan641 ? "45%" : "100%"}
          alignItems="center"
          mb="1rem"
        >
          <Image
            src={`https://www.themoviedb.org/t/p/w1280/${details?.poster_path} `}
            w="100%"
          />
          <HStack maxW="min-content" spacing="0.5rem" mt="1rem">
            <WatchButton movieId={details?.id} />
            <GoodBadButton
              type="good"
              movieId={details?.id}
              genres={details?.genres}
            />
            <GoodBadButton
              type="bad"
              movieId={details?.id}
              genres={details?.genres}
            />
          </HStack>
        </Flex>

        <Grid
          templateColumns="1fr 2fr"
          marginLeft={isLargerThan641 ? "2rem" : 0}
          w="100%"
          h="100%"
          fontWeight="semibold"
          rowGap={1}
          flexGrow="1"
        >
          <GridItem>Release Date</GridItem>
          <GridItem textAlign="right" fontWeight="normal">
            {details?.release_date}
          </GridItem>
          <GridItem>Genres</GridItem>
          <GridItem textAlign="right" fontWeight="normal">
            <List textAlign="right">
              {details?.genres.map((genre) => (
                <ListItem key={genre.id}>{genre.name}</ListItem>
              ))}
            </List>
          </GridItem>
          <GridItem>Director</GridItem>
          <GridItem textAlign="right" fontWeight="normal">
            {
              crew.filter((crewMember) => crewMember.job === "Director")[0]
                .original_name
            }
          </GridItem>
          <GridItem>Cast</GridItem>
          <GridItem
            textAlign="right"
            fontWeight="normal"
            h="13rem"
            overflow="scroll"
            overflowX="hidden"
          >
            <List gap={2}>
              {cast.map((castMember) => (
                <Flex flexDir="column" alignItems="right" key={castMember.id}>
                  {castMember.original_name}
                  <Text as="i" color="lightPurple" marginBottom="1">
                    {castMember.character}
                  </Text>
                </Flex>
              ))}
            </List>
          </GridItem>
        </Grid>
      </Flex>
      <Text textAlign="justify" fontSize={isLargerThan641 ? "md" : "sm"}>
        {details?.overview}
      </Text>
    </Flex>
  );
}

export default InfoBox;
