/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import windowSize from "../windowRes";
import FnUserPaymentDesktop from "./desktop";
import api_url from "../../src/utils/url";

import styles from "./main.module.css";
import FnUserPaymentMobile from "./mobile";

const UserPayment = () => {
  const windowRes = windowSize();
  return (
    <>
      <div className={styles.main_outer}>
        <div className={styles.main_inner}>
          {windowRes.innerWidth >= 1100 ? <FnUserPaymentDesktop /> : <FnUserPaymentMobile />}
        </div>
      </div>
    </>
  );
};

export default UserPayment;
