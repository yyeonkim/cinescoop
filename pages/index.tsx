import type { NextPage } from "next";
import Footer from "../src/components/Footer";
import Account from "../src/components/Account";

const Home: NextPage = () => {
  return (
    <div>
      <Footer />
      <Account />
    </div>
  );
};

export default Home;
