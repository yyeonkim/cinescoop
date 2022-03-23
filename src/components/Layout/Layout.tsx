import React from "react";
import Navigation from "../Navigation/Navigation";
import Footer from "./Footer";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <Navigation search={true} />
      {props.children}
      <Footer />
    </>
  );
};

export default Layout;
