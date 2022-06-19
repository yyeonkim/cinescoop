import StarRatings from "react-star-ratings";
import { useColorModeValue } from "@chakra-ui/react";

interface RatingProps {
  voteAverage: number;
  starSize: string;
}

const StarRating = ({ voteAverage, starSize }: RatingProps) => {
  const color = useColorModeValue("orange", "yellow");

  return (
    <StarRatings
      rating={voteAverage / 2}
      starRatedColor={color}
      starDimension={starSize}
      starSpacing="0rem"
    />
  );
};
export default StarRating;
