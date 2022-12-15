/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import StarRatings from "react-star-ratings";
import FnAbout from "./about/about";
import FnProject from "./project/project";
import FnAward from "./award/award";
import FnReview from "./review/review";
import api_url from "../../src/utils/url";
import axios from "axios";
import dummy_token from "../../src/utils/dummy_token";
import AgrihaAlsoViewedSingle from "./also-viewed-single";

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
    // console.log(id);
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

  const [rate, setRate] = useState(0);
  const [count, setCount] = useState(0);
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    if (id !== "") {
      getSingleArchitect();
      getProjectOfArchitect();
    }
    const getRate = async () => {
      const response = await axios.get(`${api_url}/star-rating/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let r = 0;
      response?.data?.data?.map((items) => {
        r += items.rating;
      });
      length = response?.data?.data?.length;
      setCount(length);
      if (length !== 0 && r) {
        let result = Math.round(parseFloat(r / length) * 100) / 100;
        setRate(result);
      } else {
        let result = 0;
        setRate(result);
      }
    };
    getRate();
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
                          <div className={styles.ratingNumber}>{rate}</div>
                          <div className={styles.ratingNumber}>
                            <StarRatings
                              rating={rate}
                              starRatedColor="#edbc3b"
                              numberOfStars={5}
                              starDimension="14px"
                              starSpacing="1.5px"
                              name="rating"
                            />
                          </div>
                          <div className={styles.ratingReviews}>{count} Reviews</div>
                        </div>
                        <div className={styles.profileSubHead}>Architects</div>
                      </div>
                    </div>
                    <div className={styles.archProfileSectionMainRight}>
                      <div
                        className={styles.archOptionsIcons}
                        onClick={() => router.push(`tel:${singleArchitect?.phone}`)}
                      >
                        <img src="/img/architect-about/contact.svg" alt="contact.svg" className={styles.contactIcon} />
                        Contact
                      </div>
                      <div className={styles.archOptionsIcons}>
                        <img src="/img/architect-about/share.svg" alt="share.svg" className={styles.shareIcon} />
                        <span>Share</span>
                      </div>
                      {/* <div className={styles.archOptionsIcons}>
                        <img src="/img/architect-about/heart.svg" alt="heart.svg" className={styles.heartIcon} />
                        Saved
                      </div> */}
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
                  return <AgrihaAlsoViewedSingle key={index} items={items} />;
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
