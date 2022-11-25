/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useState, useEffect, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";

import styles from "./sample-popup.module.css";

export default function SamplePopup() {
  const [Store] = useContext(StoreContext);
  const setLoginPopup = Store.setLoginPopup;

  const [windowRes, setWindowRes] = useState([]);
  if (typeof window !== "undefined") {
    const [windowSize, setWindowSize] = useState(getWindowSize());
    function getWindowSize() {
      const innerWidth = window.innerWidth;
      const innerHeight = window.innerHeight;
      return { innerWidth, innerHeight };
    }
    useEffect(() => {
      function handleWindowResize() {
        setWindowSize(getWindowSize());
        setWindowRes(getWindowSize());
      }
      setWindowRes(getWindowSize());
      window.addEventListener("resize", handleWindowResize);
      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    }, []);
  }

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
