import { Flex, Img, Text } from "@chakra-ui/react";

interface Movie {
  adult: boolean;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
interface CardProps {
  info: Movie;
}

function VerCard({ info }: CardProps) {
  return (
    <Flex flexDir="column">
      <Img
        objectFit="cover"
        src={`https:www.themoviedb.org/t/p/w1280${info.poster_path}`}
        maxW="100%"
        minH="75%"
        maxH="75%"
      />
      <Text textAlign="center" mb="0">
        {info.title}
      </Text>
    </Flex>
  );
}

export default VerCard;
export type { Movie };
