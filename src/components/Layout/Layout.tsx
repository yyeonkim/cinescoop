import { User } from "firebase/auth";
import React, { Context } from "react";
import Navigation from "../Navigation/Navigation";
import Footer from "./Footer";

interface layoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: layoutProps) => {
  // console.log("layout", user);
  return (
    <>
      <Navigation search={true} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
