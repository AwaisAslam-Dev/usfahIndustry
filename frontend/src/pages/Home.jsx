import React from "react";
import Hero from "../components/Hero";
import FeatureSection from "../components/FeatureSection";
import ExploreMenu from "../components/ExploreProducts";
import BestSeller from "../components/BestSeller";
const Home = () => {
  return (
    <>
      <Hero/>
      <ExploreMenu />
      <BestSeller/>
      <FeatureSection/>
    </>
  );
};

export default Home;
