import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import StarRatings from "react-star-ratings";
import api_url from "../../src/utils/url";
import AgrihaArchitectRating from "../user-common/rating";

import styles from "./main.module.css";

export default function AgrihaDisplayBidSingle({ i, items }) {
  const [Store] = useContext(StoreContext);
  const setDisplayBidItems = Store.setDisplayBidItems;
  const setDisplayBidArchitet = Store.setDisplayBidArchitet;
  const setBidArchitectSelectPopup = Store.setBidArchitectSelectPopup;

  const rating = AgrihaArchitectRating(items?.architect_id?._id);
  const router = useRouter();
  // console.log(items);

  // SELECT ARCHITECT BID
  async function selectArchitcect(id, archid, projectId) {
    const response = await fetch(`${api_url}/quotation/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        architect_id: archid,
        status: "ongoing",
      }),
    });
    const data = await response.json();
    if (response.status === 200) {
      setBidArchitectSelectPopup(false);
      router.push("/my-bid");
    }
  }

  return (
    <div className={styles.bid_outer} key={i}>
      <Link href={`/user-architect-about/${items?.architect_id?._id}`} passHref>
        <div className={styles.mright}>
          <img
            src={items?.architect_id?.profilepic ? items?.architect_id?.profilepic : "/img/landing/profile_img.svg"}
            onError={(e) => (e.target.src = "/img/landing/profile_img.svg")}
            alt="architect photo"
          />
          <div className={styles.profile}>
            <div className={styles.name}>
              {items?.architect_id?.registered_id?.name
                ? items?.architect_id?.registered_id?.name
                : items?.architect_id?.firstname + " " + items?.architect_id?.lastname}
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
              {/* <div className={styles.review}>{rating.review} Reviews</div> */}
            </div>
          </div>
        </div>
      </Link>

      <div className={styles.mleft}>
        <div className={styles.cash}>₹ {items?.quote} per sqft</div>
        <div
          className={styles.select}
          onClick={() => (
            setDisplayBidArchitet(items?.architect_id),
            setDisplayBidItems(items),
            setBidArchitectSelectPopup(true),
            selectArchitcect(items._id, items?.architect_id?._id, items.project_id)
          )}
          // onClick={() => selectArchitcect(items._id, items?.architect_id?._id, items.project_id)}
        >
          Select
        </div>
      </div>
    </div>
  );
}
