/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { StoreContext } from "../../components/StoreContext";
import windowSize from "../windowRes";
import api_url from "../../src/utils/url";
import AgrihaDisplayBidSingle from "./display-bid-single";

import styles from "./main.module.css";

export default function AgrihaDisplayBidMain() {
  const windowRes = windowSize();
  const router = useRouter();
  const { id } = router.query;
  const bidId = id;

  const [Store] = useContext(StoreContext);

  const [bid, setBid] = useState(false);

  const [getAllBidResult, setGetAllBidResult] = useState([]);
  async function getAllBidResults() {
    const response = await fetch(`${api_url}/quotation/${bidId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data) {
      const temp = data.data;
      setGetAllBidResult(temp);
      if (temp?.length > 0) {
        setBid(true);
      }
    }
  }

  useEffect(() => {
    getAllBidResults();
  }, [bidId]);

  // console.log(getAllBidResult);

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
                      <div className={styles.desktop_inner}>
                        <div className={styles.bid_max_outer}>
                          <Link href="/my-bid" passHref>
                            <div className={styles.back}>
                              <img src="/img/my-bid/arrow_left.svg" alt="back" />
                              <span>Your bid list</span>
                            </div>
                          </Link>
                          {getAllBidResult?.map((items, i) => {
                            return <AgrihaDisplayBidSingle key={i} i={i} items={items} />;
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.mobile_outer}>
                    <div className={`container ${styles.container} ${styles.mobile}`}>
                      <div className={styles.mobile_inner}>
                        <div className={styles.bid_max_outer}>
                          <Link href="/my-bid" passHref>
                            <div className={styles.back}>
                              <img src="/img/my-bid/arrow_left.svg" alt="back" />
                              <span>Your bid list</span>
                            </div>
                          </Link>
                          {getAllBidResult?.map((items, i) => {
                            return <AgrihaDisplayBidSingle key={i} i={i} items={items} />;
                          })}
                        </div>
                      </div>
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
