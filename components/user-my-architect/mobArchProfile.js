import React, { useState, useEffect, useContext } from "react";
import StarRatings from "react-star-ratings";
import Link from "next/link";
import AgrihaArchitectRating from "../user-common/rating";

import styles from "./main.module.css";

function MobAgrihaArchProfileSingle({ items, i }) {
  const rating = AgrihaArchitectRating(items._id);
  return (
    <React.Fragment key={i}>
      <Link href={`/user-architect-about/${items._id}`} passHref>
        <div>
          <div className={styles.archAboutMainSectionMob}>
            <div className={styles.archAboutSectionMobCoverImage}>
              <img
                src={items?.coverpic ? items?.coverpic : "/img/landing/nophoto.jpg"}
                onError={(e) => (e.target.src = "/img/landing/nophoto.jpg")}
                alt=""
              />
            </div>
            <div className={styles.archAboutSectionMob}>
              <div className={styles.archNameSectionMob}>
                <img
                  src={items?.profilepic ? items?.profilepic : "/img/landing/profile_img.svg"}
                  onError={(e) => (e.target.src = "/img/landing/profile_img.svg")}
                  alt=""
                />
                <div className={styles.archNameStarSectionMob}>
                  <div>
                    {items?.registered_id?.name ? items?.registered_id?.name : items.firstname + " " + items.lastname}
                  </div>
                  <div className={styles.archStarSectionMob}>
                    <div>{rating.rate}</div>
                    <StarRatings
                      rating={rating.rate}
                      starRatedColor="#edbc3b"
                      numberOfStars={5}
                      starDimension="14px"
                      starSpacing="1.5px"
                      name="rating"
                    />
                    <div>{rating.review} Reviews</div>
                  </div>
                </div>
              </div>
              <div className={`${styles.viewProfileBtn}`}>
                <img src="/img/architect/mobile/rightMob.svg" alt="rightMob.svg" />
              </div>
            </div>
          </div>
          {items?.location && items?.bio ? (
            <div className={styles.archDetailSecMainMob}>
              {items?.location ? (
                <div className={styles.archDetailSecMob}>
                  <img src="/img/architect/mobile/locationMob.svg" alt="locationMob" />
                  <span>{items?.location}</span>
                </div>
              ) : (
                ""
              )}
              <div className={styles.archReadmoreMob}>{items?.bio}</div>
              {/* {items?.bio ? (
            <div className={styles.archReadmoreBtnMob}>
              <Link href={`/user-architect-about/${items._id}`} passHref>
                <div>
                  <span>Read more</span>
                  <img src="/img/architect/mobile/downMob.svg" alt="downMob" />
                </div>
              </Link>
            </div>
          ) : (
            ""
          )} */}
            </div>
          ) : (
            ""
          )}
        </div>
      </Link>
    </React.Fragment>
  );
}
export default MobAgrihaArchProfileSingle;
