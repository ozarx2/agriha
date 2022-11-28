import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from './archProfiles.module.css'
import StarRatings from "react-star-ratings";
const FnArchProfiles =()=>{
    const router = useRouter();
    return(
        <>
        <div className={styles.archProfileMultipleViewMain}>
            <div className={styles.archProfileMultipleView}>
              <img src="/img/architect/arch.svg" alt="arch.svg" />
              <div className={styles.archProfileDesignPic}>
                <div className={styles.archProfileSection}>
                  <div className={styles.arcProfileGroupSection}>
                    <img
                      src="/img/architect/group.svg"
                      alt="profilepic.svg"
                      className={styles.archProPic}
                    />
                    <div className={styles.archProfileGroup}>
                      <div className={styles.archGroupName}>
                        National Design Group
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
                    <Link href="/user-architect-about">
                      <div
                        className={`${styles.viewProfileBtn} ${
                          router.pathname == "/user-architect-about"
                            ? styles.active
                            : ""
                        }`}
                      >
                        View Proifle
                      </div>
                    </Link>
                    {/* <div className={styles.viewProfileBtn}>view profile</div> */}
                  </div>
                </div>
                <div>
                  <div className={styles.archLocationMain}>
                    <img
                      src="/img/architect/locationblue.svg"
                      alt="locationblue.svg"
                      className={styles.locationIconGreen}
                    />
                    <div className={styles.archlocation}>
                      Pallikunnu, Kannur, Kerala, 670004
                    </div>
                  </div>
                  <div className={styles.category}>
                    <div>Architect</div>
                  </div>
                  <div className={styles.categorySubhead}>
                    <div>
                      An experienced interior designer can transform your place
                      in San Diego, CA, to make it more impressive. Whether
                      you’re strugglin. An experienced interior designer can
                      transform your place in San Diego, CA, to make it more
                      impressive. Whether you’re strugglin.
                    </div>
                  </div>
                  <div className={styles.readMore}>
                    <Link href="/user-architect-about">
                      <div
                        className={` ${
                          router.pathname == "/user-architect-about"
                            ? styles.active
                            : ""
                        }`}
                      >
                        Read more
                      </div>
                    </Link>
                    <img
                      src="/img/architect/downarrow.svg"
                      alt="downarrow.svg"
                      className={styles.categoryDownIcon}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
    )
}
export default FnArchProfiles;