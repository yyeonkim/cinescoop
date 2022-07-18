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
  return (
    <Flex
      p={["1rem 2rem 2rem 2rem", "1rem 2rem 2rem 2rem", "2rem 5rem 5rem 5rem"]}
      flexDir="column"
    >
      <Heading fontSize={["2xl", "2xl", "4xl"]} textAlign="center">
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
        direction={["column", "column", "row", "row"]}
      >
        <Flex
          flexDir="column"
          w={["100%", "100%", "45%"]}
          alignItems="center"
          mb="1rem"
        >
          <Image
            src={`https://www.themoviedb.org/t/p/w1280/${details?.poster_path} `}
            w={["80%", "80%", "100%", "100%"]}
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
          marginLeft={[0, 0, "2rem"]}
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
                  <Text as="i" color="lightPurple" mb={1}>
                    {castMember.character}
                  </Text>
                </Flex>
              ))}
            </List>
          </GridItem>
        </Grid>
      </Flex>
      <Text textAlign="justify" fontSize={["sm", "sm", "md"]}>
        {details?.overview}
      </Text>
    </Flex>
  );
}

export default InfoBox;
