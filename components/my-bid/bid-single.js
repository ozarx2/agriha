/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import React, { useState, useEffect } from "react";
import api_url from "../../src/utils/url";

import styles from "./main.module.css";

export default function AgrihaMyBidMainSingleBid({ item, i }) {
  const [countDown, setCountDown] = useState("");

  const [getAllBidResult, setGetAllBidResult] = useState([]);
  async function getAllBidResults() {
    const response = await fetch(`${api_url}/quotation/${item._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data) {
      const temp = data;
      console.log(temp);
      setGetAllBidResult(temp);
    }
  }

  //   console.log(getAllBidResult);

  const deadline = new Date((Math.floor(+new Date(item.createdAt) / 1000) + 7 * 24 * 60 * 60) * 1000);
  var x = setInterval(function () {
    var now = new Date().getTime();
    var t = deadline - now;
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((t % (1000 * 60)) / 1000);
    var countDownS = `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
    setCountDown(countDownS);

    if (t < 0) {
      clearInterval(x);
      var countDownS = "EXPIRED";
      setCountDown(countDownS);
    }
  }, 1000);

  useEffect(() => {
    getAllBidResults();
  }, []);

  return (
    <React.Fragment key={i}>
      <div className={styles.bid_outer} key={i}>
        <div className={styles.image}>
          <img
            src={item.thumbnail ? item.thumbnail : "/img/landing/nophoto.jpg"}
            onError={(e) => (e.target.src = "/img/landing/nophoto.jpg")}
            alt="bid img"
          />
        </div>
        <div className={styles.time}>
          <div className={styles.left}>{countDown}</div>
          {/* <div className={styles.left}>{time}d : 7h : 15m : 10s</div> */}
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
}
