import {
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";

import { ICast, ICrew, IMovieDetails } from "../../../interfaces";

interface infoBoxprops {
  details: IMovieDetails;
  cast: ICast[];
  crew: ICrew[];
}

function InfoBox({ details, cast, crew }: infoBoxprops) {
  return (
    <Flex padding="2rem 5rem 5rem 5rem" flexDir="column">
      <Heading size="2xl" textAlign="center">
        {details.original_title}
      </Heading>
      <Flex
        w="100%"
        minH="min-content"
        maxH="min-content"
        padding="2rem 0 3rem 0"
      >
        <Image
          src={`https://www.themoviedb.org/t/p/w1280/${details.poster_path} `}
          w="40%"
          h="xs"
        />
        <Grid
          templateColumns="1fr 2fr"
          marginLeft="3rem"
          w="100%"
          h="100%"
          fontWeight="semibold"
          rowGap={1}
        >
          <GridItem>Release Date</GridItem>
          <GridItem textAlign="right" fontWeight="normal">
            {details.release_date}
          </GridItem>
          <GridItem>Genres</GridItem>
          <GridItem textAlign="right" fontWeight="normal">
            <List textAlign="right">
              {details.genres.map((genre) => (
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
          >
            <List gap={2}>
              {cast.map((castMember, index) => (
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
      <Text textAlign="justify" fontSize="1rem">
        {details.overview}
      </Text>
    </Flex>
  );
}

export default InfoBox;
