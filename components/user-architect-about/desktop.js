/* eslint-disable @next/next/no-img-element */
import React from "react";
import StarRatings from "react-star-ratings";
import Progress from "../../components/progress-bar/index";

import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import styles from "./main.module.css";
import FnAbout from "./about/about";
import FnProject from "./project/project";
import FnAward from "./award/award";
import FnReview from "./review/review";

const UserArchitectAboutDesktop = () => {
  const [tab, setTab] = useState("aboutus");
  const router = useRouter();
  return (
    <>
      <div className={styles.sthree_outer}>
        <div className={`container ${styles.container} ${styles.sthree}`}>
          <div className={styles.sthree_inner}>
            <div className={styles.agrihaUserProDeskMain}>
              <div className={styles.sone_outer}>
                <div className={`container ${styles.container} ${styles.sone}`}>
                  <div className={styles.main}>
                    <div className={styles.container_inner}>
                      <div className={styles.archAboutMainLeftSection}>
                        <div className={styles.archCover}>
                          <img
                            src="/img/architect-about/coverpic.svg"
                            alt="coverpic.svg"
                            className={styles.archCoverPic}
                          />
                          <Link href="/user-my-architect" passHref>
                            <div className={`${styles.backIcon} ${router.pathname == "/user-my-architect"}`}>
                              <img src="/img/architect-about/back.svg" alt="back.svg" className={styles.backImg} />
                            </div>
                          </Link>
                        </div>
                        <div className={styles.archProfileArea}>
                          <div className={styles.archProfileSectionMain}>
                            <img src="/img/architect-about/leftdp.svg" alt="leftdp.svg" className={styles.arcLeftPic} />
                            <div className={styles.archProfileSection}>
                              <div className={styles.archProfileName}>Amour Decor</div>
                              <div className={styles.archProfileRating}>
                                <div className={styles.ratingNumber}>4.6</div>
                                <div className={styles.ratingNumber}>
                                  <StarRatings
                                    rating={4}
                                    starRatedColor="#edbc3b"
                                    numberOfStars={5}
                                    starDimension="14px"
                                    starSpacing="1.5px"
                                    name="rating"
                                  />
                                </div>
                                <div className={styles.ratingReviews}>2 Reviews</div>
                              </div>
                              <div className={styles.profileSubHead}>Interior Designers & Decorators</div>
                            </div>
                          </div>
                          <div className={styles.archProfileSectionMainRight}>
                            <div className={styles.archOptionsIcons}>
                              <img
                                src="/img/architect-about/contact.svg"
                                alt="contact.svg"
                                className={styles.contactIcon}
                              />
                              Contact
                            </div>
                            <div className={styles.archOptionsIcons}>
                              <img src="/img/architect-about/share.svg" alt="share.svg" className={styles.shareIcon} />
                              Share
                            </div>
                            <div className={styles.archOptionsIcons}>
                              <img src="/img/architect-about/heart.svg" alt="heart.svg" className={styles.heartIcon} />
                              Saved
                            </div>
                            <div className={styles.archOptionsSelect}>
                              <div className={styles.archOptionsSelectBtn}>Select</div>
                            </div>
                          </div>
                        </div>

                        {/*-----ARCHITECT TAB  SECTION-------*/}

                        <div className={styles.archAboutTabSection}>
                          <div className={styles.archTabTitles}>
                            <div onClick={() => setTab("aboutus")} className={tab == "aboutus" ? styles.tabActive : ""}>
                              About us
                            </div>
                            <div
                              onClick={() => setTab("projects")}
                              className={tab == "projects" ? styles.tabActive : ""}
                            >
                              Projects
                            </div>
                            <div onClick={() => setTab("awards")} className={tab == "awards" ? styles.tabActive : ""}>
                              Awards
                            </div>
                            <div onClick={() => setTab("review")} className={tab == "review" ? styles.tabActive : ""}>
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

                    {/*-----ARCHITECT ABOUT  RIGHT SIDE-------*/}

                    <div className={styles.archAboutMainRightSection}>
                      <div className={styles.archViewedSection}>
                        <div className={styles.archViewed}>People also viewed</div>
                        <div className={styles.archViewAll}>view all</div>
                      </div>
                      <div className={styles.archViewedProfileSection}>
                        <img src="/img/architect-about/rightpic.svg" alt="" />
                        <div className={styles.archViewedProfile}>
                          <div className={styles.archViewedTitle}>Amour Decor</div>
                          <div className={styles.archViewedRating}>
                            <div className={styles.viewedRatingNumber}>4.5</div>
                            <StarRatings
                              rating={4.5}
                              starRatedColor="#edbc3b"
                              numberOfStars={5}
                              starDimension="14px"
                              starSpacing="1.5px"
                              name="rating"
                            />
                            <div className={styles.viewedRatingReviews}>2 Reviews</div>
                          </div>
                          <div className={styles.archViewedSubhead}>Interior Designers & Decorators</div>
                          <div className={styles.archViewProfileSection}>
                            <a href="" className={styles.archViewProfile}>
                              View profile
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className={styles.archViewedProfileSection}>
                        <img src="/img/architect-about/rightpic.svg" alt="" />
                        <div className={styles.archViewedProfile}>
                          <div className={styles.archViewedTitle}>Amour Decor</div>
                          <div className={styles.archViewedRating}>
                            <div className={styles.viewedRatingNumber}>4.5</div>
                            <StarRatings
                              rating={4.5}
                              starRatedColor="#edbc3b"
                              numberOfStars={5}
                              starDimension="14px"
                              starSpacing="1.5px"
                              name="rating"
                            />
                            <div className={styles.viewedRatingReviews}>2 Reviews</div>
                          </div>
                          <div className={styles.archViewedSubhead}>Interior Designers & Decorators</div>
                          <div className={styles.archViewProfileSection}>
                            <a href="" className={styles.archViewProfile}>
                              View profile
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className={styles.archViewedProfileSection}>
                        <img src="/img/architect-about/rightpic.svg" alt="" />
                        <div className={styles.archViewedProfile}>
                          <div className={styles.archViewedTitle}>Amour Decor</div>
                          <div className={styles.archViewedRating}>
                            <div className={styles.viewedRatingNumber}>4.5</div>
                            <StarRatings
                              rating={4.5}
                              starRatedColor="#edbc3b"
                              numberOfStars={5}
                              starDimension="14px"
                              starSpacing="1.5px"
                              name="rating"
                            />
                            <div className={styles.viewedRatingReviews}>2 Reviews</div>
                          </div>
                          <div className={styles.archViewedSubhead}>Interior Designers & Decorators</div>
                          <div className={styles.archViewProfileSection}>
                            <a href="" className={styles.archViewProfile}>
                              View profile
                            </a>
                          </div>
                        </div>
                      </div>
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

export default UserArchitectAboutDesktop;
