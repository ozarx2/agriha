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

  const rating = AgrihaArchitectRating(items.architect_id);

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

  // console.log(items);

  useEffect(() => {
    getSingleArchitect();
  }, []);

  const router = useRouter();

  /* ACCEPT REQUEST */
  // async function acceptRequest(id, archid) {
  //   var token = localStorage.getItem("userToken");

  //   const res = await fetch(`${api_url}/projects/accept/${id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify({
  //       architect_id: archid,
  //       status: "ongoing",
  //     }),
  //   });

  //   const data = await res.json();
  //   console.log(data);
  //   if (data.projectdata.status === "ongoing") {
  //     setBidArchitectSelectPopup(false);
  //     router.push("/my-bid");
  //   }
  // }

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
    if (response.status === 200) {
      setBidArchitectSelectPopup(false);
      router.push("/my-bid");
    }
  }

  return (
    <div className={styles.bid_outer} key={i}>
      <Link href={`/user-architect-about/${items.architect_id}`} passHref>
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
            setDisplayBidArchitet(singleArchitect),
            setDisplayBidItems(items),
            setBidArchitectSelectPopup(true),
            selectArchitcect(items._id, items.architect_id, items.project_id)
          )}
          // onClick={() => selectArchitcect(items._id, items.architect_id, items.project_id)}
        >
          Select
        </div>
      </div>
    </div>
  );
}
