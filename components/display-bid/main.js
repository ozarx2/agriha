/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useState, useEffect } from "react";

import styles from "./main.module.css";

export default function AgrihaDisplayBidMain() {
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

  const [bid, setBid] = useState(true);

  return (
    <>
      <div className={styles.main_outer}>
        <div className={styles.main_inner}>
          {bid ? (
            <>
              {windowRes.innerWidth >= 1100 ? (
                <>
                  <div className={styles.desktop_outer}>
                    <div className={`container ${styles.container} ${styles.desktop}`}>
                      <div className={styles.desktop_inner}>{AgrihaMyBidMainMyBid()}</div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.mobile_outer}>
                    <div className={`container ${styles.container} ${styles.mobile}`}>
                      <div className={styles.mobile_inner}>{AgrihaMyBidMainMyBid()}</div>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <div className={styles.no_bid}>
                <img className={styles.main} src="/img/my-bid/no-bid.svg" alt="no bid" />
                <div className={styles.text}>You have no bid received</div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

const AgrihaMyBidMainMyBid = () => {
  return (
    <div className={styles.bid_max_outer}>
      {Array.apply(null, { length: 5 }).map((e, i) => (
        <div className={styles.bid_outer} key={i}>
          <img src="/img/display-bid/profile.png" alt="architect photo" />
          <div className={styles.profile}>
            <div className={styles.name}>Althaf Rahman</div>
            <div className={styles.rating}>
              <div className={styles.num}>4.5</div>
              <div className={styles.star}>star</div>
            </div>
          </div>
          <div className={styles.cash}>₹ 32 Lakh</div>
          <div className={styles.select}>Select</div>
        </div>
      ))}
    </div>
  );
};
