/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
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

  return (
    <>
      <div className={styles.main_outer}>
        <div className={styles.main_inner}>
          {windowRes.innerWidth >= 1100 ? (
            <>
              <div>
                desktop
                <img src="#" alt="alt" />
              </div>
            </>
          ) : (
            <>
              <div>{AgrihaMyBidMainMyBid()}</div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

const AgrihaMyBidMainMyBid = () => {
  return (
    <div className="bid_outer">
      {Array.apply(null, { length: 5 }).map((e, i) => (
        <div className="bid_inner" key={i}>
          <div>d</div>
          <div>rhg</div>
        </div>
      ))}
    </div>
  );
};
