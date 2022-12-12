import Link from "next/link";
import React, { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
import AgrihaArchitectTotalRating from "../user-common/totalRating";

import styles from "./main.module.css";

function AgrihaAlsoViewedSingle({ items }) {
  const rating = AgrihaArchitectTotalRating(items._id);

  // const [rate, setRate] = useState(0);
  // const [count, setCount] = useState(0);
  // const token = localStorage.getItem("userToken");

  // useEffect(() => {
  //   const getRate = async () => {
  //     const response = await axios.get(`${api_url}/star-rating/${items._id}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     let r = 0;
  //     response?.data?.data?.map((items) => {
  //       r += items.rating;
  //     });
  //     length = response?.data?.data?.length;
  //     setCount(length);
  //     if (length !== 0 && r) {
  //       let result = Math.round(parseFloat(r / length) * 100) / 100;
  //       setRate(result);
  //     } else {
  //       let result = 0;
  //       setRate(result);
  //     }
  //   };
  //   getRate();
  // }, []);

  return (
    <div className={styles.archViewedProfileSection}>
      <img
        src={items?.coverpic ? items?.coverpic : "/img/landing/nophoto.jpg"}
        onError={(e) => (e.target.src = "/img/landing/nophoto.jpg")}
        alt=""
      />
      <div className={styles.archViewedProfile}>
        <div className={styles.archViewedTitle}>
          {items?.registered_id?.name ? items?.registered_id?.name : items.firstname + " " + items.lastname}
        </div>
        <div className={styles.archViewedRating}>
          <div className={styles.viewedRatingNumber}>{rating.TotalRating}</div>
          <StarRatings
            rating={rating.TotalRating}
            starRatedColor="#edbc3b"
            numberOfStars={5}
            starDimension="14px"
            starSpacing="1.5px"
            name="rating"
          />
          <div className={styles.viewedRatingReviews}>{rating.totalCount} Reviews</div>
        </div>
        <div className={styles.archViewProfileSection}>
          <Link href={`/user-architect-about/${items._id}`} passHref>
            <a href="" className={styles.archViewProfile}>
              View profile
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default AgrihaAlsoViewedSingle;
