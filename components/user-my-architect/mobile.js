/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import StarRatings from "react-star-ratings";
import api_url from "../../src/utils/url";
import dummy_token from "../../src/utils/dummy_token";

import styles from "./main.module.css";
import { StoreContext } from "../StoreContext";

const FnUserMyArchitectMobile = () => {
  const router = useRouter();

  const [Store] = useContext(StoreContext);

  const setAllArchitects = Store.setAllArchitects;
  const allArchitects = Store.allArchitects;

  /* GET PROJECT TYPES */
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
  // console.log(allArchitects);

  useEffect(() => {
    if (allArchitects.length === 0) {
      getallArchitects();
    }
  }, []);

  return (
    <>
      <div className={styles.agrihaUserProDeskMain}>
        <div className={styles.sone_outer}>
          <div className={`container ${styles.container} ${styles.sone}`}>
            {allArchitects?.map((items, index) => {
              return (
                <>
                  <div className={styles.archAboutMainSectionMob}>
                    <div className={styles.archAboutSectionMob}>
                      <div className={styles.archNameSectionMob}>
                        <img
                          src={items?.profilepic ? items?.profilepic : "/img/landing/profile_img.svg"}
                          onError={(e) => (e.target.src = "/img/landing/profile_img.svg")}
                          alt=""
                        />
                        <div className={styles.archNameStarSectionMob}>
                          <div>
                            {items?.registered_id?.name
                              ? items?.registered_id?.name
                              : items.firstname + " " + items.lastname}
                          </div>
                          <div className={styles.archStarSectionMob}>
                            <div>4.5</div>
                            <StarRatings
                              rating={4.5}
                              starRatedColor="#edbc3b"
                              numberOfStars={5}
                              starDimension="14px"
                              starSpacing="1.5px"
                              name="rating"
                            />
                          </div>
                        </div>
                      </div>
                      <Link href={`/user-architect-about/${items._id}`} passHref>
                        <div className={`${styles.viewProfileBtn}`}>
                          <img src="/img/architect/mobile/rightMob.svg" alt="rightMob.svg" />
                        </div>
                      </Link>
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
                      {items?.bio ? (
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
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default FnUserMyArchitectMobile;
