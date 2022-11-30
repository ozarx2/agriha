/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import styles from "./award.module.css";

const FnAward = ({ singleArchitect }) => {
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
        <div className={styles.archAwardSection}>
          <div className={styles.archAwards}>
            <img src="/img/architect-award/silver.svg" alt="silver.svg" className={styles.archAwardSilver} />
            <div>Silver Award</div>
          </div>
          <div className={styles.archAwards}>
            <img src="/img/architect-award/golden.svg" alt="golden.svg" className={styles.archAwardGolden} />
            <div>Golden Award</div>
          </div>
        </div>
      ) : (
        <div className={styles.archAwardSectionMob}>
          <div className={styles.archAwardSecMob}>
            <div className={styles.archAwards}>
              <img
                src="/img/architect-award/mobile/silverMob.svg"
                alt="silver.svg"
                className={styles.archAwardSilver}
              />
              <div>Silver Award</div>
            </div>
            <div className={styles.archAwards}>
              <img
                src="/img/architect-award/mobile/goldenMob.svg"
                alt="golden.svg"
                className={styles.archAwardGolden}
              />
              <div>Golden Award</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FnAward;
