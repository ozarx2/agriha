/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import FnUserMyArchitectDesktop from "./desktop";
import FnUserMyArchitectMobile from "./mobile";
import windowSize from "../windowRes";

import styles from "./main.module.css";

const UserMyArchitects = () => {
  const windowRes = windowSize();
  return (
    <div className={styles.main_outer}>
      <div className={styles.main_inner}>
        {windowRes.innerWidth >= 1100 ? <FnUserMyArchitectDesktop /> : <FnUserMyArchitectMobile />}
      </div>
    </div>
  );
};

export default UserMyArchitects;
