/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { StoreContext } from "../../components/StoreContext";
import api_url from "../../src/utils/url";
import windowSize from "../windowRes";
import moment from "moment";

import styles from "./main.module.css";

export default function AgrihaMyPublicBidMainSingle() {
  const windowRes = windowSize();
  const router = useRouter();
  const { id } = router.query;

  const [Store] = useContext(StoreContext);

  const [bidId, setBidId] = useState("");

  /* GET ARCHITECT ID */
  function getParameters() {
    let urlString = window.location.href;
    let paramString = urlString.split("/")[4];
    let queryString = new URLSearchParams(paramString);
    for (let pair of queryString.entries()) {
      setBidId(pair[0]);
    }
  }

  useEffect(() => {
    getParameters();
  }, [id]);

  useEffect(() => {
    if (id !== null) {
      setBidId(id);
    } else {
      getParameters();
    }
  }, []);

  // console.log(bidId);

  const [getBidData, setGetBidData] = useState([]);

  async function getAllProjects() {
    const response = await fetch(`${api_url}/projects/unauth_bids/${bidId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    if (data) {
      setGetBidData(data);
    }
  }
  useEffect(() => {
    if (bidId !== undefined) {
      getAllProjects();
    }
  }, [bidId]);

  return (
    <>
      <div className={styles.main_outer}>
        <div className={`container ${styles.container} ${styles.bidAll}`}>
          <div className={`${styles.main_inner} ${windowRes.innerWidth >= 1100 ? styles.desktop : styles.mobile}`}>
            <div className={styles.bid_max_outer}>
              {/* {getBidData?.map((item, i) => {
                return (
                  <div onClick={() => router.push(`/bid/${item?._id}`)} key={i} className={styles.bid_outer}>
                    <div className={styles.bid_title}>{item?.project_type}</div>
                    <div className={styles.bid_sub_title}>
                      <div className={styles.type}> {item?.project_name}</div>
                      <div className={styles.date}>{moment(item?.createdAt).format("lll")}</div>
                    </div>
                    <div className={styles.details}>
                      <div className={styles.details_in}>
                        <div className={styles.location}>
                          <span>📍</span>
                          {item?.project_requirements[0].location}
                        </div>
                        <div className={styles.budget}>
                          <span>₹</span>
                          {item?.project_requirements[0].budget}
                        </div>
                      </div>
                      <div className={styles.more_btn}> View More</div>
                    </div>
                  </div>
                );
              })} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
