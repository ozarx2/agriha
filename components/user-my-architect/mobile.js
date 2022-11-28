import React from "react";
import StarRatings from "react-star-ratings";
import { useRouter } from "next/router";
import Link from "next/link";

import styles from "./main.module.css";

const FnUserMyArchitectMobile = () => {
  const router = useRouter();
  return (
    <>
      <div className={styles.sthree_outer}>
        <div className={`container ${styles.container} ${styles.sthree}`}>
          <div className={styles.sthree_inner}>
            <div className={styles.agrihaUserProDeskMain}>
              <div className={styles.sone_outer}>
                <div className={`container ${styles.container} ${styles.sone}`}>
                  <div className={styles.archAboutMainSectionMob}>
                    <div className={styles.archAboutSectionMob}>
                      <div className={styles.archNameSectionMob}>
                        <img
                          src="/img/architect/mobile/profileMob.svg"
                          alt=""
                        />
                        <div className={styles.archNameStarSectionMob}>
                          <div>National design group</div>
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
                      <Link href="/user-architect-about">
                        <div
                          className={`${styles.viewProfileBtn} ${
                            router.pathname == "/user-architect-about"
                              ? styles.active
                              : ""
                          }`}
                        >
                          <img
                            src="/img/architect/mobile/rightMob.svg"
                            alt="rightMob.svg"
                          />
                        </div>
                      </Link>
                      {/* <div>
                        
                      </div> */}
                    </div>
                  </div>
                  <div className={styles.archDetailSecMainMob}>
                    <div className={styles.archDetailSecMob}>
                      <img
                        src="/img/architect/mobile/locationMob.svg"
                        alt="locationMob"
                      />
                      <span>Pallikunnu, Kannur, Kerala, 670005</span>
                    </div>
                    <div className={styles.archReadmoreMob}>
                      An experienced interior designer can transform your place
                      in designer can transform your place
                    </div>
                    <div className={styles.archReadmoreBtnMob}>
                      <Link href="/user-architect-about">
                        <div
                          className={` ${
                            router.pathname == "/user-architect-about"
                              ? styles.active
                              : ""
                          }`}
                        >
                          Read more{" "}
                          <span>
                            <img
                              src="/img/architect/mobile/downMob.svg"
                              alt="downMob"
                            />
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FnUserMyArchitectMobile;
