import React, { useState } from "react";
import { Flex, Heading, HStack, Select, Text } from "@chakra-ui/react";

type Cinema = "CGV" | "메가박스" | "롯데시네마";

const ShowTime = () => {
  const [cinema, setCinema] = useState<Cinema>("CGV");

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setCinema(value as any);
  };

  return (
    <>
      <Flex w="100%" mt={10}>
        <Heading color="pink" size="lg" mr={10}>
          상영 시간표
        </Heading>
        <Select onInput={onInput} w="8rem" value={cinema}>
          <option value="CGV">CGV</option>
          <option value="메가박스">메가박스</option>
          <option value="롯데시네마">롯데시네마</option>
        </Select>
      </Flex>
      {/* <Flex justifyContent="space-between">
        <HStack bg="brightBlue">
          <Text as="b">지역</Text>
          <Select></Select>
        </HStack>
      </Flex> */}
    </>
  );
};

export default ShowTime;
