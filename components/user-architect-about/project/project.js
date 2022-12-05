/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import windowSize from "../../windowRes";

import styles from "./project.module.css";

const FnProject = ({ singleArchitect, projects }) => {
  const windowRes = windowSize();

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
