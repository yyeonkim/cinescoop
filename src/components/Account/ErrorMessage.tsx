import { Text } from "@chakra-ui/react";

interface ErrorMessageProps {
  message: string | undefined;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <Text fontSize="xs" color="tomato">
      {message}
    </Text>
  );
}

export default ErrorMessage;
