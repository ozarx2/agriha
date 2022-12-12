/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import api_url from "../../src/utils/url";
import windowSize from "../windowRes";
import AgrihaMyBidMainSingleBid from "./bid-single";

import styles from "./main.module.css";

export default function AgrihaMyBidMain() {
  const windowRes = windowSize();

  const [Store] = useContext(StoreContext);
  const userId = Store.userId;
  const setRegisterPopup = Store.setRegisterPopup;
  const loginActive = Store.loginActive;
  const setArchitectBidtPopup = Store.setArchitectBidtPopup;

  const [getAllBid, setGetAllBid] = useState([]);

  async function getAllProjects() {
    const response = await fetch(`${api_url}/projects/getbid/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data) {
      const oldDate = new Date((Math.floor(+new Date() / 1000) - 7 * 24 * 60 * 60) * 1000);
      const temp = data.data.filter((res) => new Date(res.createdAt) >= oldDate);
      setGetAllBid(temp);
    }
  }

  useEffect(() => {
    if (userId !== "") {
      getAllProjects();
    }
  }, [userId]);

  return (
    <>
      <div className={styles.main_outer}>
        <div className={styles.main_inner}>
          {userId != "" && getAllBid.length != 0 ? (
            <>
              {windowRes.innerWidth >= 1100 ? (
                <>
                  <div className={styles.desktop_outer}>
                    <div className={`container ${styles.container} ${styles.desktop}`}>
                      <div className={styles.desktop_inner}>
                        <div className={styles.bid_max_outer}>
                          {getAllBid?.map((item, i) => {
                            return <AgrihaMyBidMainSingleBid item={item} i={i} />;
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
                          {getAllBid?.map((item, i) => {
                            return <AgrihaMyBidMainSingleBid item={item} i={i} />;
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
                <div className={styles.text}>You have no bid list</div>

                {loginActive ? (
                  // logged in
                  <div className={styles.button} onClick={() => setArchitectBidtPopup(true)}>
                    <div className={styles.button_flex}>
                      <img src="/img/my-bid/plus.svg" alt="plus" />
                      <span>Create a bid</span>
                    </div>
                  </div>
                ) : (
                  // no login
                  <div className={styles.button} onClick={() => setRegisterPopup(true)}>
                    <div className={styles.button_flex}>
                      <img src="/img/my-bid/plus.svg" alt="plus" />
                      <span>Create a bid</span>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
