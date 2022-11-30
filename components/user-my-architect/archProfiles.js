/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./archProfiles.module.css";
import StarRatings from "react-star-ratings";
import api_url from "../../src/utils/url";
import dummy_token from "../../src/utils/dummy_token";

const FnArchProfiles = () => {
  const router = useRouter();

  /* GET PROJECT TYPES */
  const [allArchitects, setAllArchitects] = useState([]);
  async function getallArchitects() {
    const token = localStorage.getItem("userToken");
    const res = await fetch(`${api_url}/architects/view`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
        Authorization: `Bearer ${dummy_token}`,
      },
    });
    const data = await res.json();
    setAllArchitects(data);
  }
  console.log(allArchitects);
  useEffect(() => {
    getallArchitects();
  }, []);

  return (
    <>
      {allArchitects?.map((items, index) => {
        const coverpics = () => {
          return items?.coverpic ? items?.coverpic : "/img/landing/nophoto.jpg";
        };
        return (
          <>
            <div className={styles.archProfileMultipleViewMain}>
              <div className={styles.archProfileMultipleView}>
                <div
                  className={styles.archProfileMultipleViewImg}
                  style={{ backgroundImage: `url(${coverpics()})` }}
                ></div>
                <div className={styles.archProfileDesignPic}>
                  <div className={styles.archProfileSection}>
                    <div className={styles.arcProfileGroupSection}>
                      <img
                        src={items?.profilepic ? items?.profilepic : "/img/landing/profile_img.svg"}
                        alt="profilepic.svg"
                        className={styles.archProPic}
                      />
                      <div className={styles.archProfileGroup}>
                        <div className={styles.archGroupName}>
                          {items?.registered_id?.name
                            ? items?.registered_id?.name
                            : items.firstname + " " + items.lastname}
                        </div>
                        <div className={styles.archGroupSubHead}>
                          <div className={styles.ratingNumber}>4.5</div>
                          <StarRatings
                            rating={4.5}
                            starRatedColor="#edbc3b"
                            numberOfStars={5}
                            starDimension="14px"
                            starSpacing="1.5px"
                            name="rating"
                          />
                          <div className={styles.ratingReviews}>2 Reviews</div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.viewProfile}>
                      <Link href={`/user-architect-about/${items._id}`} passHref>
                        <div className={`${styles.viewProfileBtn}`}>View Proifle</div>
                      </Link>
                    </div>
                  </div>
                  <div>
                    <div className={styles.archLocationMain}>
                      <img
                        src="/img/architect/locationblue.svg"
                        alt="locationblue.svg"
                        className={styles.locationIconGreen}
                      />
                      <div className={styles.archlocation}>{items?.location}</div>
                    </div>
                    <div className={styles.category}>
                      <div>Architect</div>
                    </div>
                    <div className={styles.categorySubhead}>
                      <div>{items?.bio}</div>
                    </div>
                    <Link href={`/user-architect-about/${items._id}`} passHref>
                      <div className={styles.readMore}>
                        <div>Read more</div>
                        <img
                          src="/img/architect/downarrow.svg"
                          alt="downarrow.svg"
                          className={styles.categoryDownIcon}
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};
export default FnArchProfiles;
