import { User } from "firebase/auth";
import React from "react";
import Navigation from "../Navigation/Navigation";
import Footer from "./Footer";

interface layoutProps {
  children: React.ReactNode;
  user: User | null;
}

const Layout = ({ children, user }: layoutProps) => {
  return (
    <>
      <Navigation search={true} user={user} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
