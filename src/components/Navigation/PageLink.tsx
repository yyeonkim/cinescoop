import { Link } from "@chakra-ui/react";
import NextLink from "next/link";

interface PageLinkProps {
  path: string;
  name: string;
}

function PageLink({ path, name }: PageLinkProps) {
  return (
    <NextLink href={path} passHref>
      <Link
        _hover={{ color: "pink" }}
        textDecoration="none"
        transitionDuration="0.2s"
        _focus={{ outline: 0 }}
      >
        {name}
      </Link>
    </NextLink>
  );
}

export default PageLink;
