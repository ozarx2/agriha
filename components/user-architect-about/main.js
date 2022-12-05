/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import windowSize from "../windowRes";
import UserArchitectAboutDesktop from "./desktop";
import UserArchitectAboutMobile from "./mobile";

import styles from "./main.module.css";

const UserArchitectAbout = () => {
  const windowRes = windowSize();
  return (
    <>
      <div className={styles.main_outer}>
        <div className={styles.main_inner}>
          {windowRes.innerWidth >= 1100 ? <UserArchitectAboutDesktop /> : <UserArchitectAboutMobile />}
        </div>
      </div>
    </>
  );
};

export default UserArchitectAbout;
