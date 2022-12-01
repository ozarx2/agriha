/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import windowSize from "../windowRes";
import ProfilePopup from "../user-common/profile-popup";
import FnUserMyProjectDesktop from "./desktop";
import FnUserMyProjectMobile from "./mobile";

import styles from "./main.module.css";

const UserMyProjects = () => {
  const windowRes = windowSize();
  return (
    <>
      <div className={styles.main_outer}>
        <div className={styles.main_inner}>
          {windowRes.innerWidth >= 1100 ? <FnUserMyProjectDesktop /> : <FnUserMyProjectMobile />}
        </div>
      </div>
    </>
  );
};

export default UserMyProjects;
