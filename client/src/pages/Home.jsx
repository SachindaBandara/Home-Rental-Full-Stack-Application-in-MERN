import React from "react";
import Navbar from "../components/Navbar";
import Slide from "../components/Silde";
import Categories from "../components/Categories";
import Listings from "../components/Listings";

const Home = () => {
  return (
    <>
      <Navbar />
      <Slide/>
      <Categories/>
      <Listings/>
      
    </>
  );
};

export default Home;
