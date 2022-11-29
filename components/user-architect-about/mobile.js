/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
import FnAbout from "./about/about";
import FnAward from "./award/award";
import Link from "next/link";
import FnProject from "./project/project";
import FnReview from "./review/review";
import api_url from "../../src/utils/url";
import dummy_token from "../../src/utils/dummy_token";

import styles from "./main.module.css";

const UserArchitectAboutMobile = () => {
  const [tab, setTab] = useState("aboutus");

  const router = useRouter();
  const { id } = router.query;

  /* GET Single Architect details */
  const [singleArchitect, setSingleArchitect] = useState([]);
  async function getSingleArchitect() {
    const token = localStorage.getItem("userToken");
    const res = await fetch(`${api_url}/architects/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
        Authorization: `Bearer ${dummy_token}`,
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
        // Authorization: `Bearer ${token}`,
        Authorization: `Bearer ${dummy_token}`,
      },
    });
    const data = await res.json();
    setProjects(data);
  }

  useEffect(() => {
    getSingleArchitect();
    getProjectOfArchitect();
  }, [id]);

  return (
    <>
      <div className={styles.sthree_outer}>
        <div className={styles.coverMob}>
          <img
            src={singleArchitect?.coverpic ? singleArchitect?.coverpic : "/img/architect-about/mobile/coverMob.svg"}
            alt=""
          />

          <Link href="/user-my-architect" passHref>
            <div className={`${styles.backIcon} ${router.pathname == "/user-my-architect"}`}>
              <img src="/img/architect-about/mobile/backMob.svg" alt="" />
            </div>
          </Link>
        </div>
        <div className={styles.agrihaUserProDeskMain}>
          <div className={styles.sone_outer}>
            <div className={`container ${styles.container} ${styles.sone}`}>
              <div className={styles.archNameSectionMob}>
                <img
                  src={
                    singleArchitect?.profilepic ? singleArchitect?.profilepic : "/img/architect/mobile/profileMob.svg"
                  }
                  alt="profileMob.svg"
                />
                <div className={styles.archNameStarSectionMob}>
                  <div>
                    {singleArchitect?.registered_id?.name
                      ? singleArchitect?.registered_id?.name
                      : singleArchitect.firstname + " " + singleArchitect.lastname}
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
              <div className={styles.callShareSaveSecMainMob}>
                <div>
                  <div
                    className={styles.callShareSaveSecMob}
                    onClick={() => router.push(`tel:${singleArchitect?.phone}`)}
                  >
                    <img src="/img/architect-about/mobile/contactMob.svg" alt="contactMob.svg" />
                    <div>Contact</div>
                  </div>
                </div>
                <div>
                  <div className={styles.callShareSaveSecMob}>
                    <img src="/img/architect-about/mobile/shareMob.svg" alt="shareMob.svg" />
                    <div>Share</div>
                  </div>
                </div>
                <div>
                  <div className={styles.callShareSaveSecMob}>
                    <img src="/img/architect-about/mobile/saveMob.svg" alt="saveMob.svg" />
                    <div>Save</div>
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
        </div>
      </div>
    </>
  );
};

export default UserArchitectAboutMobile;
