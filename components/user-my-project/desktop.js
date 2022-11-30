import React from "react";
import FnOngoingProjectUserSide from "./project";

import styles from "./main.module.css";

const FnUserMyProjectDesktop = () => {
  return (
    <>
      <div className={styles.sthree_outer}>
        <div className={`container ${styles.container} ${styles.sthree}`}>
          <div className={styles.sthree_inner}>
            <div className={styles.agrihaUserProDeskMain}>
              <div className={styles.sone_outer}>
                <div className={`container ${styles.container} ${styles.sone}`}>
                  <div className={styles.buttonsMainSection}>
                    <div
                      className={`${styles.myProjBtn} ${styles.myProjBtnOne}`}
                    >
                      <div className={styles.btn}>Ongoing Projects</div>
                    </div>
                    <div
                      className={`${styles.myProjBtn} ${styles.myProjBtnTwo}`}
                    >
                      <div className={styles.btn}>Pending</div>
                    </div>
                    <div
                      className={`${styles.myProjBtn} ${styles.myProjBtnThree}`}
                    >
                      <div className={styles.btn}>All Projects</div>
                    </div>
                  </div>
                  <div>
                    <FnOngoingProjectUserSide />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FnUserMyProjectDesktop;
