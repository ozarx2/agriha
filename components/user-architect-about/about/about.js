/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import styles from "./about.module.css";
const FnAbout = () => {
  const [windowRes, setWindowRes] = useState([]);
  if (typeof window !== "undefined") {
    const [windowSize, setWindowSize] = useState(getWindowSize());
    function getWindowSize() {
      const innerWidth = window.innerWidth;
      const innerHeight = window.innerHeight;
      return { innerWidth, innerHeight };
    }
    useEffect(() => {
      function handleWindowResize() {
        setWindowSize(getWindowSize());
        setWindowRes(getWindowSize());
      }
      setWindowRes(getWindowSize());
      window.addEventListener("resize", handleWindowResize);
      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    }, []);
  }
  return (
    <>
      {windowRes.innerWidth >= 1100 ? (
        <div className={styles.archTabSubHead}>
          An experienced interior designer can transform your place in San Diego, CA, to make it more impressive.
          Whether you’re struggling to find the right wall color or you want help creating an updated look, Amour Decor
          will be ready to assist you. We’ll give your project our undivided attention, and we hope.
          <div className={styles.archTabReadmore}>
            Read more
            <img src="/img/architect-about/downarrow.svg" alt="downarrow.svg" className={styles.tabDownarrowIcon} />
          </div>
        </div>
      ) : (
        <div className={styles.archTabSubHeadMob}>
          An experienced interior designer can transform your place in San Diego, CA, to make it more impressive.
          Whether you’re struggling to find the right wall color or you want help creating an updated look, Amour Decor
          will be ready to assist you. We’ll give your project our undivided attention, and we hope.
          <div className={styles.archTabReadmoreMob}>
            <div>Create project with Architect</div>{" "}
          </div>
        </div>
      )}
    </>
  );
};

export default FnAbout;
