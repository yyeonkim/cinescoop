import React from "react";
import Footer from "./Footer";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      {props.children}
      <Footer />
    </>
  );
};

export default Layout;
