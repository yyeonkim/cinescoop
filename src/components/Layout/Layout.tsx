import React from "react";
import Navigation from "../Navigation/Navigation";
import Footer from "./Footer";

interface layoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: layoutProps) => {
  return (
    <>
      <Navigation search={true} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
