/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { StoreContext } from "../../../components/StoreContext";
import windowSize from "../../windowRes";
import StarRatings from "react-star-ratings";
import Progress from "../../../components/progress-bar/index";
import api_url from "../../../src/utils/url";
import dummy_token from "../../../src/utils/dummy_token";

import styles from "./review.module.css";

const FnReview = ({ singleArchitect }) => {
  const windowRes = windowSize();

  const router = useRouter();
  const { id } = router.query;

  const [Store] = useContext(StoreContext);
  const userId = Store.userId;
  const setLoginPopup = Store.setLoginPopup;

  const [newRating, setNewRating] = useState(0);

  /* GET CURRENT RATING */
  async function getCurrentArchitectRating() {
    const token = localStorage.getItem("userToken");
    const res = await fetch(`${api_url}/star-rating/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer ${dummy_token}`,
      },
    });
    const data = await res.json();
    const hisRating = data.data.filter((res) => res.user_id === userId);
    setNewRating(hisRating[0]?.rating);
  }

  useEffect(() => {
    if (id !== "") {
      getCurrentArchitectRating();
    }
  }, [id]);

  /* SENS ARCHITECT RATING */
  const changeRating = (newRating, name) => {
    setNewRating(newRating);
  };
  async function sendRating() {
    const token = localStorage.getItem("userToken");
    const res = await fetch(`${api_url}/star-rating`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer ${dummy_token}`,
      },
      body: JSON.stringify({
        architect_id: id,
        user_id: userId,
        rating: newRating,
        comment: "",
      }),
    });
    const data = await res.json();
    console.log(data);
  }

  return (
    <>
      {windowRes.innerWidth >= 1100 ? (
        <div className={styles.archReviewSection}>
          {userId !== "" ? (
            <>
              <StarRatings
                rating={newRating}
                starRatedColor="#edbc3b"
                numberOfStars={5}
                starDimension="25px"
                starSpacing="1.8px"
                changeRating={changeRating}
                name="rating"
              />
              <div className={styles.submitReview} onClick={() => sendRating()}>
                Submit your rating
              </div>
            </>
          ) : (
            <div className={styles.submitReview} onClick={() => setLoginPopup(true)}>
              Login
            </div>
          )}
        </div>
      ) : (
        <div className={styles.archReviewSectionMainMob}>
          <div className={styles.archReviewSectionMob}>
            <div>
              {userId !== "" ? (
                <>
                  <StarRatings
                    rating={newRating}
                    starRatedColor="#edbc3b"
                    numberOfStars={5}
                    starDimension="30px"
                    starSpacing="1.8px"
                    changeRating={changeRating}
                    name="rating"
                  />
                  <div className={styles.submitReview} onClick={() => sendRating()}>
                    Submit your rating
                  </div>
                </>
              ) : (
                <div className={styles.submitReview} onClick={() => setLoginPopup(true)}>
                  Login
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FnReview;
