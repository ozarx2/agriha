/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import windowSize from "../../windowRes";
import styles from "./award.module.css";

const FnAward = ({ singleArchitect }) => {
  const windowRes = windowSize();
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
            {/* <div className={styles.archAwards}>
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
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default FnAward;
