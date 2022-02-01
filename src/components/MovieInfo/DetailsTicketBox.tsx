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
    >
      <Heading size="2xl">{details.original_title}</Heading>
      <Flex w="100%" padding="2rem 0 5rem 0">
        <Image
          src={`https://www.themoviedb.org/t/p/w1280/${details.poster_path} `}
          w="40%"
          h="xs"
        />

        <Grid
          templateColumns="1fr 2fr"
          templateRows="1fr 1fr 1fr 1frauto"
          rowGap={5}
          marginLeft="3rem"
          w="100%"
          fontWeight="semibold"
        >
          <GridItem>Release Date</GridItem>
          <GridItem textAlign="right">{details.release_date}</GridItem>
          <GridItem>Genres</GridItem>
          <GridItem textAlign="right">
            <List textAlign="right">
              {details.genres.map((genre) => (
                <ListItem key={genre.id}>{genre.name}</ListItem>
              ))}
            </List>
          </GridItem>
          <GridItem>Director</GridItem>
          <GridItem textAlign="right">
            {
              crew.filter((crewMember) => crewMember.job === "Director")[0]
                .original_name
            }
          </GridItem>
          <GridItem>Cast</GridItem>
          <GridItem textAlign="right">
            <List gap={2}>
              {cast.map(
                (castMember, index) =>
                  index < 1 && (
                    <Flex
                      flexDir="column"
                      alignItems="right"
                      key={castMember.id}
                    >
                      <p>{castMember.original_name}</p>
                      <p color="darkGrey !important">{castMember.character}</p>
                    </Flex>
                  )
              )}
            </List>
          </GridItem>
        </Grid>
      </Flex>
      <Text>{details.overview}</Text>
    </Flex>
  );
}

export default DetailsTicketBox;
