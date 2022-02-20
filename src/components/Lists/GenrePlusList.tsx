import axios from "axios";
import { useRecoilState } from "recoil";
import { useState, useEffect, useCallback } from "react";
import { Heading, Select, Flex, Box, Spacer, Spinner } from "@chakra-ui/react";
import { genreState } from "../../atom";
import { BASE_URL, BASE_QUERY } from "../../../pages/api/useFetchGenre";
import GridList from "./GridList";
import { IGenreProps } from "./GenreList";

function GenrePlusList({ genres }: IGenreProps) {
  const [genre, setGenre] = useRecoilState(genreState);
  const [genreItems, setGenreItems] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const selectGenre = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { selectedIndex } = event.currentTarget.options;
    const selectedGenre = {
      id: event.currentTarget.options[selectedIndex].value,
      name: event.currentTarget.options[selectedIndex].text,
    };
    setGenre(selectedGenre);
  };

  useEffect(() => {
    const useFetchFirstData = async (id: string) => {
      setIsLoading(true);
      await axios
        .get(
          `${BASE_URL}/discover/movie?${BASE_QUERY}&with_genres=${id}&page=${page}`
        )
        .then((res) => {
          setGenreItems(res.data.results);
        });
      setIsLoading(false);
    };
    useFetchFirstData(genre.id);
  }, [genre]);

  const useFetchMoreData = useCallback(
    async (id: string) => {
      setIsLoading(true);
      await axios
        .get(
          `${BASE_URL}/discover/movie?${BASE_QUERY}&with_genres=${id}&page=${page}`
        )
        .then((response) => {
          const fetchedData = response.data.results;
          const mergedData = genreItems.concat(...fetchedData);
          setGenreItems(mergedData);
        });
      setPage(page + 1);
      setIsLoading(false);
    },
    [page]
  );

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && isLoading == false) {
      useFetchMoreData(genre.id);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [handleScroll]);

  return (
    <Flex justifyContent="center">
      <Box>
        <Flex mb={10} direction="column">
          <Heading size="lg" mb={5}>
            장르별 영화
          </Heading>
          <Select size="sm" w="7rem" value={genre.id} onChange={selectGenre}>
            {genres.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
        </Flex>
        <GridList data={genreItems} columnNum={4} rowNum={4} width={"50rem"} />
        <Flex justifyContent="center">{isLoading ? <Spinner /> : ""}</Flex>
      </Box>
    </Flex>
  );
}
export default GenrePlusList;
