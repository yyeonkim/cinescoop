import { NextPage } from "next";
import { useState } from "react";
import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";

import Navigation from "../../src/components/Navigation/Navigation";
import { fetchCredit, fetchDetail, IMAGE_URL } from "../api/useFetchGenre";
import { IMovieDetails } from "../../src/interfaces";

const Reserve: NextPage = () => {
  const [movieId, setMovieId] = useState("438695");

  const { data: detailData, isLoading: detailLoading } =
    useQuery<IMovieDetails>(["detail", movieId], () => fetchDetail(movieId));

  const { data: creditData, isLoading: creditLoading } = useQuery(
    ["credit", movieId],
    () => fetchCredit(movieId)
  );

  const isLoading = detailLoading || creditLoading;

  return (
    <>
      <Navigation search={true} />
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <Flex>
          <Image src={`${IMAGE_URL}/w300/${detailData?.poster_path}`} />
          <div>
            <Heading>{detailData?.title}</Heading>
            <Text>평점 {detailData?.popularity}</Text>
            <Text>
              예매율 {detailData?.vote_count} {detailData?.vote_average}
            </Text>
            <Text>
              개요 {detailData?.genres[0].name}, {detailData?.genres[1].name} |{" "}
              {detailData?.runtime}분 | {detailData?.release_date} 개봉
            </Text>
            <Text>출연 {creditData[0].name}</Text>
          </div>
        </Flex>
      )}
    </>
  );
};

export default Reserve;
