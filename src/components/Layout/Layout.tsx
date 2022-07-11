import React from "react";
import { useMediaQuery, Box } from "@chakra-ui/react";

import Navigation from "./Navigation/Navigation";
import Footer from "./Footer";
import MobileNavigation from "./Navigation/MobileNavigation";

interface layoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: layoutProps) => {
  const [isSmallerThan640] = useMediaQuery("(max-width: 640px)");

  return (
    <>
      <Navigation search={true} />
      {isSmallerThan640 && <MobileNavigation />}
      {children}
      {isSmallerThan640 ? <Box mt="10rem"></Box> : <Footer />}
    </>
  );
};

export default Layout;
