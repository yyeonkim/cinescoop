import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface ReserveProps {
  id: number;
  path: string;
}

export default function ReserveButton({ id, path }: ReserveProps) {
  const router = useRouter();

  const seeReservePage = (id: number, path: string) => {
    router.push(`/${path}/${id}`);
  };

  return (
    <Button
      bg="pink"
      color="darkBlue"
      px={5}
      onClick={() => seeReservePage(id, path)}
    >
      예매하기
    </Button>
  );
}
