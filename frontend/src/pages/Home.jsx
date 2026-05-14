import React from "react";
import { Helmet } from "react-helmet-async";
import Hero from "../components/Hero";
import FeatureSection from "../components/FeatureSection";
import ExploreMenu from "../components/ExploreProducts";
import BestSeller from "../components/BestSeller";
const Home = () => {
  return (
    <>
    <Helmet>
    <title>Home - Usfah Industry</title>
    <meta
      name="description"
      content="Best dental surgical and beauty instruments."
    />
  </Helmet>
      <Hero/>
      <ExploreMenu />
      <BestSeller/>
      <FeatureSection/>
    </>
  );
};

export default Home;
