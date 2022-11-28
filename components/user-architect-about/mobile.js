import { useRouter } from "next/router";
import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import FnAbout from "./about/about";
import FnAward from "./award/award";
import Link from "next/link";

import styles from "./main.module.css";
import FnProject from "./project/project";
import FnReview from "./review/review";

const UserArchitectAboutMobile = () => {
  const [tab, setTab] = useState("aboutus");
  const router = useRouter();
  return (
    <>
      <div className={styles.sthree_outer}>
        <div className={styles.coverMob}>
          <img src="/img/architect-about/mobile/covermob.svg" alt="" />

          <Link href="/user-my-architect">
            <div
              className={`${styles.backIcon} ${
                router.pathname == "/user-my-architect"
              }`}
            >
              <img src="/img/architect-about/mobile/backmob.svg" alt="" />
            </div>
          </Link>
        </div>
        <div className={`container ${styles.container} ${styles.sthree}`}>
          <div className={styles.sthree_inner}>
            <div className={styles.agrihaUserProDeskMain}>
              <div className={styles.sone_outer}>
                <div className={`container ${styles.container} ${styles.sone}`}>
                  <div className={styles.archNameSectionMob}>
                    <img
                      src="/img/architect/mobile/profileMob.svg"
                      alt="profileMob.svg"
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
                  <div className={styles.callShareSaveSecMainMob}>
                    <div>
                      <div className={styles.callShareSaveSecMob}>
                        <img
                          src="/img/architect-about/mobile/contactMob.svg"
                          alt="contactMob.svg"
                        />
                        <div>Contact</div>
                      </div>
                    </div>
                    <div>
                      <div className={styles.callShareSaveSecMob}>
                        <img
                          src="/img/architect-about/mobile/shareMob.svg"
                          alt="shareMob.svg"
                        />
                        <div>Share</div>
                      </div>
                    </div>
                    <div>
                      <div className={styles.callShareSaveSecMob}>
                        <img
                          src="/img/architect-about/mobile/saveMob.svg"
                          alt="saveMob.svg"
                        />
                        <div>Save</div>
                      </div>
                    </div>
                  </div>
                  {/*-----ARCHITECT TAB  SECTION-------*/}

                  <div className={styles.archAboutTabSection}>
                    <div className={styles.archTabTitles}>
                      <div
                        onClick={() => setTab("aboutus")}
                        className={tab == "aboutus" ? styles.tabActive : ""}
                      >
                        About us
                      </div>
                      <div
                        onClick={() => setTab("projects")}
                        className={tab == "projects" ? styles.tabActive : ""}
                      >
                        Projects
                      </div>
                      <div
                        onClick={() => setTab("awards")}
                        className={tab == "awards" ? styles.tabActive : ""}
                      >
                        Awards
                      </div>
                      <div
                        onClick={() => setTab("review")}
                        className={tab == "review" ? styles.tabActive : ""}
                      >
                        Review
                      </div>
                    </div>
                  </div>
                  {/*-----ARCHITECT ABOUT  SECTION-------*/}
                  {tab == "aboutus" ? <FnAbout /> : ""}
                  {/*-----ARCHITECT PROJECT  SECTION-------*/}
                  {tab == "projects" ? <FnProject /> : ""}
                  {/*-----ARCHITECT AWARDS SECTION-------*/}
                  {tab == "awards" ? <FnAward /> : ""}
                  {/*-----ARCHITECT REVIEW SECTION-------*/}
                  {tab == "review" ? <FnReview /> : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserArchitectAboutMobile;
