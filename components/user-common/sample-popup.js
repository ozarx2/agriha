/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useState, useEffect, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import windowSize from "../windowRes";

import styles from "./sample-popup.module.css";

export default function SamplePopup() {
  const [Store] = useContext(StoreContext);
  const setLoginPopup = Store.setLoginPopup;

  const windowRes = windowSize();

  return (
    <>
      <div id="SamplePopupOuter" className={styles.SamplePopupOuter}>
        <div onClick={() => setLoginPopup(false)} className={styles.SamplePopupClose}></div>
        <div className={styles.SamplePopupInner}>
          {windowRes.innerWidth >= 767 ? <div className={styles.desktop}></div> : <div className={styles.mobile}></div>}
        </div>
      </div>
    </>
  );
}
