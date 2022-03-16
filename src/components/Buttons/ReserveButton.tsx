import { Button } from "@chakra-ui/react";
import Link from "next/link";

export default function ReserveButton() {
  return (
    <Link href={"./nowplaying"}>
      <Button bg="pink" color="darkBlue" px={5}>
        예매하기
      </Button>
    </Link>
  );
}
