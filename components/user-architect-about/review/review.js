/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import Progress from "../../../components/progress-bar/index";
import styles from "./review.module.css";
const FnReview = () => {
  const [windowRes, setWindowRes] = useState([]);
  if (typeof window !== "undefined") {
    const [windowSize, setWindowSize] = useState(getWindowSize());
    function getWindowSize() {
      const innerWidth = window.innerWidth;
      const innerHeight = window.innerHeight;
      return { innerWidth, innerHeight };
    }
    useEffect(() => {
      function handleWindowResize() {
        setWindowSize(getWindowSize());
        setWindowRes(getWindowSize());
      }
      setWindowRes(getWindowSize());
      window.addEventListener("resize", handleWindowResize);
      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    }, []);
  }
  return (
    <>
      {windowRes.innerWidth >= 1100 ? (
        <div className={styles.archReviewSectionMain}>
          <div className={styles.archReviewSection}>
            <div className={styles.archReviewDesk}>
              <div className={styles.archReviewStar}>
                <StarRatings
                  rating={3.5}
                  starRatedColor="#edbc3b"
                  numberOfStars={5}
                  starDimension="25px"
                  starSpacing="1.8px"
                  name="rating"
                />
                <div className={styles.submitReview}>
                  <div>Submit your rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.archReviewSectionMainMob}>
          <div className={styles.archReviewSectionMob}>
            <div>
              <StarRatings
                rating={3.5}
                starRatedColor="#edbc3b"
                numberOfStars={5}
                starDimension="30px"
                starSpacing="1.8px"
                name="rating"
              />
              <div>
                <div className={styles.submitReview}>
                  <div>Submit your rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FnReview;
