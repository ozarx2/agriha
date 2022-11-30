/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import styles from "./project.module.css";

const FnProject = ({ singleArchitect, projects }) => {
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
              {projects?.map((item, index) => {
                return (
                  <>
                    <div className={styles.archProjectPic}>
                      <img
                        src={
                          item?.thumbnail
                            ? item?.thumbnail
                            : item?.Image[0]
                            ? item?.Image[0]
                            : "/img/architect-dashboard/noImg.jpeg"
                        }
                        alt="projectpic1.svg"
                      />
                      <div className={styles.archProjectTitle}>{item.projectname}</div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.archProjectSectionMain}>
          <div className={styles.archProjectSection}>
            <div className={styles.archProjPicSection}>
              {projects?.map((item, index) => {
                return (
                  <>
                    <div className={styles.archProjectPic}>
                      <img
                        src={
                          item?.thumbnail
                            ? item?.thumbnail
                            : item?.Image[0]
                            ? item?.Image[0]
                            : "/img/architect-dashboard/noImg.jpeg"
                        }
                        alt="projectpic1.svg"
                      />
                      <div className={styles.archProjectTitle}>{item.projectname}</div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FnProject;
