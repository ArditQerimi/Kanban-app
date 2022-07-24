import React from "react";
import Cards from "./Cards";
import Navbar from "./Navbar";

const Home = ({ email }) => {
  return (
    <div>
      <Navbar email={email} />
      <Cards />
    </div>
  );
};

export default Home;
