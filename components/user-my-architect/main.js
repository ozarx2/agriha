/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import FnUserMyArchitectDesktop from "./desktop";
import FnUserMyArchitectMobile from "./mobile";

import styles from "./main.module.css";

const UserMyArchitects = () => {
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
    <div className={styles.main_outer}>
      <div className={styles.main_inner}>
        {windowRes.innerWidth >= 1100 ? (
          <FnUserMyArchitectDesktop />
        ) : (
          <FnUserMyArchitectMobile />
        )}
      </div>
    </div>
  );
};

export default UserMyArchitects;
