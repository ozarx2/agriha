/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
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
                  <Link href={`/project-details/${item._id}`} passHref>
                    <div className={styles.archProjectPic}>
                      <img
                        src={
                          item?.thumbnail
                            ? item?.thumbnail
                            : item?.Image[0]
                            ? item?.Image[0]
                            : "/img/architect-dashboard/noImg.jpeg"
                        }
                        onError={(e) => (e.target.src = "/img/landing/nophoto.jpg")}
                        alt="projectpic1.svg"
                      />
                      <div className={styles.archProjectTitle}>{item.projectname}</div>
                    </div>
                  </Link>
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
                  <Link href={`/project-details/${item._id}`} passHref>
                    <div className={styles.archProjectPic}>
                      <img
                        src={
                          item?.thumbnail
                            ? item?.thumbnail
                            : item?.Image[0]
                            ? item?.Image[0]
                            : "/img/architect-dashboard/noImg.jpeg"
                        }
                        onError={(e) => (e.target.src = "/img/landing/nophoto.jpg")}
                        alt="projectpic1.svg"
                      />
                      <div className={styles.archProjectTitle}>{item.projectname}</div>
                    </div>
                  </Link>
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
