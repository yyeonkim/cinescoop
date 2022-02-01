import {
  AspectRatio,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { IMovieDetails, IMovieCredits, ICast, ICrew } from "../../interfaces";

interface detailsTicketBoxProps {
  details: IMovieDetails;
  cast: ICast[];
  crew: ICrew[];
}

function DetailsTicketBox({ details, cast, crew }: detailsTicketBoxProps) {
  const color = useColorModeValue("darkBlue", "black");

  return (
    <Flex
      w="50vw"
      flexDir="column"
      alignItems="center"
      bgColor="white"
      padding="2rem 5rem 5rem 5rem"
      color={color}
      display="relative"
      zIndex={2}
      fontSize="0.8rem"
    >
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
            h="12rem"
            overflow="scroll"
          >
            <List gap={2}>
              {cast.map((castMember, index) => (
                <Flex flexDir="column" alignItems="right" key={castMember.id}>
                  {castMember.original_name}
                  <Text as="i" color="lightBlue" marginBottom="1">
                    {castMember.character}
                  </Text>
                </Flex>
              ))}
            </List>
          </GridItem>
        </Grid>
      </Flex>
      <Text textAlign="justify">{details.overview}</Text>
    </Flex>
  );
}

export default DetailsTicketBox;
