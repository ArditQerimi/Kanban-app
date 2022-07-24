import React from "react";
import Cards from "./Cards";
import Navbar from "./Navbar";

const Home = ({token}) => {
  return (
    <div>
      <Navbar token={token} />
      <Cards />
    </div>
  );
};

export default Home;
