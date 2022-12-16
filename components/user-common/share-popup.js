/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import windowSize from "../windowRes";

import styles from "./share-popup.module.css";

export default function SharePopup() {
  const windowRes = windowSize();

  const [Store] = useContext(StoreContext);
  const setSharePopup = Store.setSharePopup;

  return (
    <>
      <div id="ArchitectSelectPopupOuter" className={styles.ArchitectSelectPopupOuter}>
        <div onClick={() => setSharePopup(false)} className={styles.ArchitectSelectPopupClose}></div>
        <div className={styles.ArchitectSelectPopupInner}>
          {windowRes.innerWidth >= 767 ? (
            <div className={styles.desktop}>{ArchitectSelectPopupContent()}</div>
          ) : (
            <div className={styles.mobile}>{ArchitectSelectPopupContent()}</div>
          )}
        </div>
      </div>
    </>
  );
}

const ArchitectSelectPopupContent = () => {
  const [Store] = useContext(StoreContext);
  const setSharePopup = Store.setSharePopup;

  const router = useRouter();

  return (
    <>
      <div className={styles.popupouter}>
        <div className={styles.profiles}></div>
        <div className={styles.line}></div>
        <div className={styles.buttons}>
          <div className={styles.continue} onClick={() => setSharePopup(false)}>
            close
          </div>
        </div>
      </div>
    </>
  );
};
