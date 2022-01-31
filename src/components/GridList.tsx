import { Grid } from "@chakra-ui/react";

import VerCard from "./VerCard";
import type { Movie } from "./VerCard";

interface MovieListProps {
  data: Movie[];
  width: string;
  columnNum: number;
  rowNum: number;
}

function GridList({ data, width, columnNum, rowNum }: MovieListProps) {
  return (
    <Grid
      templateColumns={`repeat(${columnNum}, 1fr)`}
      templateRows={`repeat(${rowNum}, 1fr)`}
      gap={10}
      marginX={"auto"}
      w={width}
    >
      {data &&
        data.map((item: Movie, index: number) => (
          <VerCard key={item.id} info={item} />
        ))}
    </Grid>
  );
}

export default GridList;
export type { Movie };
