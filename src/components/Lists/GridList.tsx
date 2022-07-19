import { Flex } from "@chakra-ui/react";

import VerCard from "../VerCard";
import type { Movie } from "../VerCard";

interface MovieListProps {
  data: Movie[];
}

function GridList({ data }: MovieListProps) {
  return (
    <Flex flexWrap="wrap">
      {data?.map((item: Movie) => (
        <VerCard key={item.id} info={item} />
      ))}
    </Flex>
  );
}

export default GridList;
