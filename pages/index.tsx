import type { NextPage } from "next";
import Footer from "../src/components/Footer";
import AccountBox from "../src/components/Account/AccountBox";

const Home: NextPage = () => {
  return (
    <div>
      <AccountBox />
      <Footer />
    </div>
  );
};

export default Home;
