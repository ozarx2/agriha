import React from "react";
import Main from "../components/Main";
import HeaderMain from "./HeaderMain";
import axios from "axios";
import OurServices from "./OurServices";
import AboutUs from "./AboutUs";
import HowItWorks from "./HowItWorks";
import OurRecentWorks from "./OurRecentWorks";
import GetInTouch from "./GetInTouch";
import ValuesContainer from "./ValuesContainer";
import Footer from "./Footer";
import CountsContainer from "./CountsContainer";
import styles from "../styles/Main.module.css";

axios.defaults.withCredentials = true;

const Hero = () => {
  return (
    <div className={styles.hero}>
      <HeaderMain />
      <Main />
      <OurServices />
      <HowItWorks />
      <AboutUs />
      <OurRecentWorks />
      <CountsContainer />
      <GetInTouch />
      <ValuesContainer />
      <Footer />
    </div>
  );
};

export default Hero;
