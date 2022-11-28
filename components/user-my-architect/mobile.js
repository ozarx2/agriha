/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
import { useRouter } from "next/router";
import Link from "next/link";
import api_url from "../../src/utils/url";

import styles from "./main.module.css";

const FnUserMyArchitectMobile = () => {
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
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMGM5ZDhiNWIyOWEyZjM0OGM5NzQ5NyIsImlhdCI6MTY2MTc3MTE0OCwiZXhwIjoxNjYxODU3NTQ4fQ.n9kwWACUDQzUT45XecGYGZ638bOYfTv8iUpdfD-_m3Q",
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
      <div className={styles.agrihaUserProDeskMain}>
        <div className={styles.sone_outer}>
          <div className={`container ${styles.container} ${styles.sone}`}>
            {allArchitects?.map((items, index) => {
              return (
                <>
                  <div className={styles.archAboutMainSectionMob}>
                    <div className={styles.archAboutSectionMob}>
                      <div className={styles.archNameSectionMob}>
                        <img src="/img/architect/mobile/profileMob.svg" alt="" />
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
                      <Link href="/user-architect-about" passHref>
                        <div
                          className={`${styles.viewProfileBtn} ${
                            router.pathname == "/user-architect-about" ? styles.active : ""
                          }`}
                        >
                          <img src="/img/architect/mobile/rightMob.svg" alt="rightMob.svg" />
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className={styles.archDetailSecMainMob}>
                    <div className={styles.archDetailSecMob}>
                      <img src="/img/architect/mobile/locationMob.svg" alt="locationMob" />
                      <span>Pallikunnu, Kannur, Kerala, 670005</span>
                    </div>
                    <div className={styles.archReadmoreMob}>
                      An experienced interior designer can transform your place in designer can transform your place
                    </div>
                    <div className={styles.archReadmoreBtnMob}>
                      <Link href="/user-architect-about" passHref>
                        <div className={` ${router.pathname == "/user-architect-about" ? styles.active : ""}`}>
                          Read more
                          <span>
                            <img src="/img/architect/mobile/downMob.svg" alt="downMob" />
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>
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
