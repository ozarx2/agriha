import React, { useRef, useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
import api_url from "../../src/utils/url";

import styles from "./main.module.css";

export default function AgrihaDisplayBidSingle({ i, items }) {
  console.log(items);

  /* GET Single Architect details */
  const [singleArchitect, setSingleArchitect] = useState([]);
  async function getSingleArchitect() {
    const token = localStorage.getItem("userToken");
    const res = await fetch(`${api_url}/architects/${items.architect_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer ${dummy_token}`,
      },
    });
    const data = await res.json();
    setSingleArchitect(data);
  }

  console.log(singleArchitect);

  useEffect(() => {
    getSingleArchitect();
  }, []);

  return (
    <div className={styles.bid_outer} key={i}>
      <div className={styles.mright}>
        <img
          src={
            singleArchitect?.architect_id?.profilepic
              ? singleArchitect?.architect_id?.profilepic
              : "/img/landing/profile_img.svg"
          }
          onError={(e) => (e.target.src = "/img/landing/profile_img.svg")}
          alt="architect photo"
        />
        <div className={styles.profile}>
          <div className={styles.name}>{singleArchitect?.registered_id?.name}</div>
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
  );
}
