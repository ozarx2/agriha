/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import StarRatings from "react-star-ratings";
import Progress from "../../components/progress-bar/index";
import FnAbout from "./about/about";
import FnProject from "./project/project";
import FnAward from "./award/award";
import FnReview from "./review/review";
import api_url from "../../src/utils/url";
import dummy_token from "../../src/utils/dummy_token";

import styles from "./main.module.css";

const UserArchitectAboutDesktop = () => {
  const [tab, setTab] = useState("aboutus");

  const router = useRouter();
  const { id } = router.query;

  // function getIdParameters() {
  //   let urlString = window.location.href;
  //   let paramString = urlString.split("/")[4];
  //   let queryString = new URLSearchParams(paramString);
  //   for (let pair of queryString.entries()) {
  //     console.log(pair[0]);
  //   }
  // }

  /* GET Single Architect details */
  const [singleArchitect, setSingleArchitect] = useState([]);
  async function getSingleArchitect() {
    const token = localStorage.getItem("userToken");
    const res = await fetch(`${api_url}/architects/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer ${dummy_token}`,
      },
    });
    const data = await res.json();
    setSingleArchitect(data);
  }

  /* GET PROJECT of a architect */
  const [projects, setProjects] = useState([]);

  async function getProjectOfArchitect() {
    const token = localStorage.getItem("userToken");
    const res = await fetch(`${api_url}/projects/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer ${dummy_token}`,
      },
    });
    const data = await res.json();
    setProjects(data);
  }

  useEffect(() => {
    if (id !== "") {
      getSingleArchitect();
      getProjectOfArchitect();
    }
  }, [id]);

  /* GET ALL ARCHITECT */
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

  useEffect(() => {
    getallArchitects();
  }, []);

  return (
    <>
      <div className={styles.agrihaUserProDeskMain}>
        <div className={styles.sone_outer}>
          <div className={`container ${styles.container} ${styles.sone}`}>
            <div className={styles.main}>
              <div className={styles.container_inner}>
                <div className={styles.archAboutMainLeftSection}>
                  <div className={styles.archCover}>
                    <img
                      src={singleArchitect?.coverpic ? singleArchitect?.coverpic : "/img/landing/nophoto.jpg"}
                      onError={(e) => (e.target.src = "/img/landing/nophoto.jpg")}
                      alt="coverpic.svg"
                      className={styles.archCoverPic}
                    />
                    <div onClick={() => router.back()} className={`${styles.backIcon}`}>
                      <img src="/img/architect-about/back.svg" alt="back.svg" className={styles.backImg} />
                    </div>
                  </div>
                  <div className={styles.archProfileArea}>
                    <div className={styles.archProfileSectionMain}>
                      <img
                        src={singleArchitect?.profilepic ? singleArchitect?.profilepic : "/img/landing/profile_img.svg"}
                        onError={(e) => (e.target.src = "/img/landing/profile_img.svg")}
                        alt="leftdp.svg"
                        className={styles.arcLeftPic}
                      />
                      <div className={styles.archProfileSection}>
                        <div className={styles.archProfileName}>
                          {singleArchitect?.registered_id?.name
                            ? singleArchitect?.registered_id?.name
                            : singleArchitect.firstname + " " + singleArchitect.lastname}
                        </div>
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
                        <div className={styles.profileSubHead}>Architects</div>
                      </div>
                    </div>
                    <div
                      className={styles.archProfileSectionMainRight}
                      onClick={() => router.push(`tel:${singleArchitect?.phone}`)}
                    >
                      <div className={styles.archOptionsIcons}>
                        <img src="/img/architect-about/contact.svg" alt="contact.svg" className={styles.contactIcon} />
                        Contact
                      </div>
                      <div className={styles.archOptionsIcons}>
                        <img src="/img/architect-about/share.svg" alt="share.svg" className={styles.shareIcon} />
                        Share
                      </div>
                      {/* <div className={styles.archOptionsIcons}>
                        <img src="/img/architect-about/heart.svg" alt="heart.svg" className={styles.heartIcon} />
                        Saved
                      </div>
                      <div className={styles.archOptionsSelect}>
                        <div className={styles.archOptionsSelectBtn}>Select</div>
                      </div> */}
                    </div>
                  </div>

                  {/*-----ARCHITECT TAB  SECTION-------*/}

                  <div className={styles.archAboutTabSection}>
                    <div className={styles.archTabTitles}>
                      <div onClick={() => setTab("aboutus")} className={tab == "aboutus" ? styles.tabActive : ""}>
                        About us
                      </div>
                      <div onClick={() => setTab("projects")} className={tab == "projects" ? styles.tabActive : ""}>
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
                  {tab == "aboutus" ? <FnAbout singleArchitect={singleArchitect} /> : ""}
                  {/*-----ARCHITECT PROJECT  SECTION-------*/}
                  {tab == "projects" ? <FnProject singleArchitect={singleArchitect} projects={projects} /> : ""}
                  {/*-----ARCHITECT AWARDS SECTION-------*/}
                  {tab == "awards" ? <FnAward singleArchitect={singleArchitect} /> : ""}
                  {/*-----ARCHITECT REVIEW SECTION-------*/}
                  {tab == "review" ? <FnReview singleArchitect={singleArchitect} /> : ""}
                </div>
              </div>

              {/*-----ARCHITECT ABOUT  RIGHT SIDE-------*/}

              <div className={styles.archAboutMainRightSection}>
                <div className={styles.archViewedSection}>
                  <div className={styles.archViewed}>People also viewed</div>
                  <div onClick={() => router.push("/user-my-architect")} className={styles.archViewAll}>
                    view all
                  </div>
                </div>

                {allArchitects?.slice(0, 3)?.map((items, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div className={styles.archViewedProfileSection}>
                        <img
                          src={items?.coverpic ? items?.coverpic : "/img/landing/nophoto.jpg"}
                          onError={(e) => (e.target.src = "/img/landing/nophoto.jpg")}
                          alt=""
                        />
                        <div className={styles.archViewedProfile}>
                          <div className={styles.archViewedTitle}>
                            {items?.registered_id?.name
                              ? items?.registered_id?.name
                              : items.firstname + " " + items.lastname}
                          </div>
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
                          <div className={styles.archViewedSubhead}>Architects</div>
                          <div className={styles.archViewProfileSection}>
                            <Link href={`/user-architect-about/${items._id}`} passHref>
                              <a href="" className={styles.archViewProfile}>
                                View profile
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserArchitectAboutDesktop;
