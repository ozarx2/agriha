/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import windowSize from "../../windowRes";

import styles from "./about.module.css";

const FnAbout = ({ singleArchitect }) => {
  const windowRes = windowSize();
  return (
    <>
      {windowRes.innerWidth >= 1100 ? (
        <div className={styles.archTabSubHead}>
          {singleArchitect?.bio}
          {/* <div className={styles.archTabReadmore}>
            Read more
            <img src="/img/architect-about/downarrow.svg" alt="downarrow.svg" className={styles.tabDownarrowIcon} />
          </div> */}
        </div>
      ) : (
        <div className={styles.archTabSubHeadMob}>
          {singleArchitect?.bio}
          <div className={styles.archTabReadmoreMob}>
            <div>Create project with Architect</div>{" "}
          </div>
        </div>
      )}
    </>
  );
};

export default FnAbout;
