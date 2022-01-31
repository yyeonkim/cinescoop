import React from "react";
import {
  Input,
  IconButton,
  FormControl,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { HiOutlineSearch } from "react-icons/hi";
import { SearchingProps } from "../../pages/API/useSearchMovie";

function SearchBar({ handleChange }: SearchingProps) {
  /*const onSubmit = () => {
    getMovieList();
  };

  const onKeyPress = (e: any) => {
    if (e.key === "Enter") getMovieList();
  };
*/

  return (
    <FormControl>
      <InputGroup width="30rem">
        <Input
          onChange={handleChange}
          //onKeyPress={onKeyPress}
          variant="flushed"
          placeholder="search"
        />

        <InputRightElement>
          <IconButton
            icon={<HiOutlineSearch />}
            aria-label="search"
            size="lg"
            background="none"
            //onClick={onSubmit}
          />
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
}

export default SearchBar;
