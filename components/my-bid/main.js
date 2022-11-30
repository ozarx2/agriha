/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";

import styles from "./main.module.css";

export default function AgrihaMyBidMain() {
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
                <div className={styles.text}>You have no bid list</div>
                <div className={styles.button}>
                  <div className={styles.button_flex}>
                    <img src="/img/my-bid/plus.svg" alt="plus" />
                    <span>Create a bid</span>
                  </div>
                </div>
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
          <div className={styles.image}>
            <img src="/img/my-bid/sample.png" alt="bid img" />
          </div>
          <div className={styles.time}>
            <div className={styles.left}>0d : 7h : 15m : 10s</div>
            <div className={styles.right}>16 Bid now</div>
          </div>
          <div className={styles.name}>
            <div className={styles.left}>Project name</div>
            <div className={styles.right}>
              <img src="/img/my-bid/arrow_right.svg" alt="view more" />
            </div>
          </div>
          <div className={styles.result}>
            <div className={styles.line}></div>
            <Link href="/display-bid" passHref>
              <div className={styles.bid}>Bid Result</div>
            </Link>
            <div className={styles.line}></div>
          </div>
        </div>
      ))}
    </div>
  );
};
