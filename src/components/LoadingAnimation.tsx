import { Spinner } from "@chakra-ui/react";

export default function LoadingAnimation() {
  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="pink"
      size="xl"
    />
  );
}
