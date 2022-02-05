import { Heading, Text, Select, Flex, Box, Spacer } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { useQuery } from "react-query";

import { IMovie, IGenre } from "../../interfaces";
import { genreState } from "../../atom";
import { fetchGenre, IMAGE_URL } from "../../../pages/api/useFetchGenre";
import GridList from "./GridList";
import { IGenreProps } from "./GenreList";

function GenrePlusList({ genres }: IGenreProps) {
  const [genre, setGenre] = useRecoilState(genreState);
  const { data, isLoading, refetch } = useQuery<IMovie[]>(
    ["withGenre", genre],
    () => fetchGenre(genre.id)
  );

  const selectGenre = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { selectedIndex } = event.currentTarget.options;
    const selectedGenre = {
      id: event.currentTarget.options[selectedIndex].value,
      name: event.currentTarget.options[selectedIndex].text,
    };
    setGenre(selectedGenre);
  };

  return (
    <Box px={10}>
      <Flex alignItems="center" mb={10}>
        <Heading size="lg" mr={10}>
          장르별 영화
        </Heading>
        <Select size="sm" w="7rem" onChange={selectGenre}>
          {genres.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </Select>
        <Spacer />
      </Flex>
      {isLoading ? (
        <Text>...Loading</Text>
      ) : (
        <GridList data={data} columnNum={4} />
      )}
    </Box>
  );
}
export default GenrePlusList;
