/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import React, { useRef, useState, useEffect, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
// import api_url from "../../src/utils/url";
var api_url = "https://arclif-agriha.herokuapp.com";
import windowSize from "../windowRes";

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
      setGetAllBid(data.data);
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
          {userId != "" ? (
            <>
              {windowRes.innerWidth >= 1100 ? (
                <>
                  <div className={styles.desktop_outer}>
                    <div className={`container ${styles.container} ${styles.desktop}`}>
                      <div className={styles.desktop_inner}>{AgrihaMyBidMainMyBid({ getAllBid })}</div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.mobile_outer}>
                    <div className={`container ${styles.container} ${styles.mobile}`}>
                      <div className={styles.mobile_inner}>{AgrihaMyBidMainMyBid({ getAllBid })}</div>
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

const AgrihaMyBidMainMyBid = ({ getAllBid }) => {
  return (
    <div className={styles.bid_max_outer}>
      {getAllBid?.map((item, i) => {
        console.log(item);
        return (
          <React.Fragment key={i}>
            <div className={styles.bid_outer} key={i}>
              <div className={styles.image}>
                <img src="/img/my-bid/sample.png" alt="bid img" />
              </div>
              <div className={styles.time}>
                <div className={styles.left}>7d : 7h : 15m : 10s</div>
                <div className={styles.right}>16 Bid now</div>
              </div>
              <div className={styles.name}>
                <div className={styles.left}>{item.project_name}</div>
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
          </React.Fragment>
        );
      })}
    </div>
  );
};
