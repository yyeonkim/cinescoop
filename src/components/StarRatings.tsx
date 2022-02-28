import StarRatings from "react-star-ratings";

interface RatingProps {
  voteAverage: number;
  starSize: string;
}

const StarRating = ({ voteAverage, starSize }: RatingProps) => {
  return (
    <StarRatings
      rating={voteAverage / 2}
      starRatedColor="yellow"
      starDimension={starSize}
      starSpacing="0rem"
    />
  );
};
export default StarRating;
