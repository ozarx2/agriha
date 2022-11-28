/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import styles from "./project.module.css";

const FnProject = () => {
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
        <div className={styles.archProjectSectionMain}>
          <div className={styles.archProjectSection}>
            <div className={styles.archProjPicSection}>
              <div className={styles.archProjectPic}>
                <img src="/img/architect-project/picone.svg" alt="projectpic1.svg" />
                <div className={styles.archProjectTitle}>Home Staging & Interiors</div>
              </div>
              <div className={styles.archProjectPic}>
                <img src="/img/architect-project/pictwo.svg" alt="projectpic1.svg" />
                <div className={styles.archProjectTitle}>Home Staging & Interiors</div>
              </div>
              <div className={styles.archProjectPic}>
                <img src="/img/architect-project/picone.svg" alt="projectpic1.svg" />
                <div className={styles.archProjectTitle}>Home Staging & Interiors</div>
              </div>
              <div className={styles.archProjectPic}>
                <img src="/img/architect-project/picthree.svg" alt="projectpic1.svg" />
                <div className={styles.archProjectTitle}>Home Staging & Interiors</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.archProjectSectionMain}>
          <div className={styles.archProjectSection}>
            <div className={styles.archProjPicSection}>
              <div className={styles.archProjectPic}>
                <img src="/img/architect-project/mobile/picone.svg" alt="projectpic1.svg" />
                <div className={styles.archProjectTitle}>Home Staging & Interiors</div>
              </div>
              <div className={styles.archProjectPic}>
                <img src="/img/architect-project/mobile/picone.svg" alt="projectpic1.svg" />
                <div className={styles.archProjectTitle}>Home Staging & Interiors</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FnProject;
