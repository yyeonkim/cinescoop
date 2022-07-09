import React from "react";
import { useMediaQuery } from "@chakra-ui/react";

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
      <Footer />
    </>
  );
};

export default Layout;
