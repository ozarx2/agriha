/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
import windowSize from "../windowRes";

import styles from "./main.module.css";

export default function AgrihaDisplayBidMain() {
  const windowRes = windowSize();

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
      <Link href="/my-bid" passHref>
        <div className={styles.back}>
          <img src="/img/my-bid/arrow_left.svg" alt="back" />
          <span>Your bid list</span>
        </div>
      </Link>
      {Array.apply(null, { length: 5 }).map((e, i) => (
        <div className={styles.bid_outer} key={i}>
          <div className={styles.mright}>
            <img src="/img/display-bid/profile.png" alt="architect photo" />
            <div className={styles.profile}>
              <div className={styles.name}>Althaf Rahman</div>
              <div className={styles.rating}>
                <div className={styles.num}>4.5</div>
                <div className={styles.star}>
                  <StarRatings
                    rating={3.5}
                    starRatedColor="#edbc3b"
                    numberOfStars={5}
                    starDimension="11px"
                    starSpacing="0.5px"
                    name="rating"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.mleft}>
            <div className={styles.cash}>₹ 32 Lakh</div>
            <div className={styles.select}>Select</div>
          </div>
        </div>
      ))}
    </div>
  );
};
