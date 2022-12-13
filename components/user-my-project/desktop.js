import React from "react";
import FnOngoingProjectUserSide from "./project";

import styles from "./main.module.css";

const FnUserMyProjectDesktop = ({ projects }) => {
  return (
    <>
      <div className={styles.agrihaUserProDeskMain}>
        <div className={styles.sone_outer}>
          <div className={`container ${styles.container} ${styles.sone}`}>
            <div className={styles.buttonsMainSection}>
              <div className={styles.myProjBtnOne}>
                <div className={styles.btn}>Ongoing Projects</div>
              </div>
              <div className={styles.myProjBtnTwo}>
                <div className={styles.btn}>Pending</div>
              </div>
              <div className={styles.myProjBtnThree}>
                <div className={styles.btn}>All Projects</div>
              </div>
            </div>
            <div>
              <FnOngoingProjectUserSide projects={projects} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FnUserMyProjectDesktop;
