import { useRouter } from "next/router";
import React, { useRef, useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
import api_url from "../../src/utils/url";
import AgrihaArchitectRating from "../user-common/rating";

import styles from "./main.module.css";

export default function AgrihaDisplayBidSingle({ i, items }) {
  const rating = AgrihaArchitectRating(items.architect_id);

  const router = useRouter();

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

  //   console.log(singleArchitect);

  useEffect(() => {
    getSingleArchitect();
  }, []);

  /* ACCEPT REQUEST */
  async function acceptRequest(id) {
    var token = localStorage.getItem("userToken");

    const res = await fetch(`${api_url}/projects/accept/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status: "ongoing",
      }),
    });

    const data = await res.json();
    console.log(data);
    if (data.projectdata.status === "ongoing") {
      router.push("/my-bid");
    }
  }

  // SELECT ARCHITECT BID
  async function selectArchitcect(id, archid, projectId) {
    const response = await fetch(`${api_url}/quotation/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        architect_id: archid,
        status: "ongoing",
      }),
    });
    const data = await response.json();
    console.log(data);

    if (data.status === "ongoing") {
      acceptRequest(projectId);
    }
  }

  return (
    <div className={styles.bid_outer} key={i}>
      <div className={styles.mright}>
        <img
          src={singleArchitect?.profilepic ? singleArchitect?.profilepic : "/img/landing/profile_img.svg"}
          onError={(e) => (e.target.src = "/img/landing/profile_img.svg")}
          alt="architect photo"
        />
        <div className={styles.profile}>
          <div className={styles.name}>
            {singleArchitect?.registered_id?.name
              ? singleArchitect?.registered_id?.name
              : singleArchitect?.firstname + " " + singleArchitect?.lastname}
          </div>
          <div className={styles.rating}>
            <div className={styles.num}>{rating.rate}</div>
            <div className={styles.star}>
              <StarRatings
                rating={rating.rate}
                starRatedColor="#edbc3b"
                numberOfStars={5}
                starDimension="11px"
                starSpacing="0.5px"
                name="rating"
              />
            </div>
            <div className={styles.review}>{rating.review} Reviews</div>
          </div>
        </div>
      </div>

      <div className={styles.mleft}>
        <div className={styles.cash}>₹ {items?.quote} per sqft</div>
        <div
          className={styles.select}
          onClick={() => selectArchitcect(items._id, items.architect_id, items.project_id)}
        >
          Select
        </div>
      </div>
    </div>
  );
}
