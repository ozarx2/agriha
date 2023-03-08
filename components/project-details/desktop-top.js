/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { StoreContext } from "../StoreContext";
import Link from "next/link";
import api_url from "../../src/utils/url";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import styles from "./main.module.css";

export default function AgrihaProjectDetailsMainDesktopTop() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [Store] = useContext(StoreContext);
  const setArchitectSelectPopup = Store.setArchitectSelectPopup;
  const setArchitectBidtPopup = Store.setArchitectBidtPopup;
  const loginActive = Store.loginActive;
  const setLoginPopup = Store.setLoginPopup;

  const router = useRouter();
  const { id } = router.query;

  const [projectId, setProjectId] = useState("");

  /* GET ARCHITECT ID */
  function getParameters() {
    let urlString = window.location.href;
    let paramString = urlString.split("/")[4];
    let queryString = new URLSearchParams(paramString);
    for (let pair of queryString.entries()) {
      setProjectId(pair[0]);
    }
  }

  useEffect(() => {
    getParameters();
  }, [id]);

  /* GET PROJECT DETAILS */
  const [projectDetails, setProjectDetails] = useState([]);
  async function getProjects() {
    // setProjectDetails([]);
    const res = await fetch(`${api_url}/projects/arcprojectsingle/${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const data = await res.json();
    if (data.length > 0) {
      setProjectDetails(data[0]);
    }
    // console.log(data[0]);
  }
  // console.log(projectDetails);
  useEffect(() => {
    if (projectId !== "") {
      getProjects();
    }
  }, [projectId]);

  return (
    <>
      <div id="AgrihaProjectDetail_desktop_section_outer" className={styles.desktop_section_outer}>
        {/* <div className={styles.sone_outer}>
          <div className={`container ${styles.container} ${styles.sone}`}>
            <div className={styles.sone_inner}>
              <div className={styles.search}>
                <img src="/img/landing/search.svg" alt="search" />
                <input type="text" placeholder="Search Favorite Design" />
              </div>
              <div className={styles.filters}>
                <img src="/img/landing/filter.svg" alt="filter" />
                <span>All filters</span>
              </div>
              <div className={styles.sort}>
                <img src="/img/landing/sort.svg" alt="sort" />
                <span>Sort list</span>
              </div>
            </div>
          </div>
        </div> */}
        {projectDetails.length !== 0 ? (
          <>
            <div className={styles.stwo_outer}>
              <div className={`container ${styles.container} ${styles.stwo}`}>
                <div className={styles.stwo_inner}>
                  <div className={styles.left}>
                    <div onClick={() => router.back()} className={styles.back}>
                      <img src="/img/project-details/back.svg" alt="back" />
                    </div>
                    <Swiper
                      style={{
                        "--swiper-navigation-color": "#fff",
                        "--swiper-pagination-color": "#fff",
                      }}
                      spaceBetween={10}
                      // navigation={true}
                      thumbs={{ swiper: thumbsSwiper }}
                      modules={[FreeMode, Navigation, Thumbs]}
                      className="mySwiper2"
                    >
                      {projectDetails.thumbnail ? (
                        <SwiperSlide>
                          <img
                            src={projectDetails.thumbnail}
                            onError={(e) => (e.target.src = "/img/landing/nophoto.jpg")}
                            alt=""
                          />
                        </SwiperSlide>
                      ) : (
                        ""
                      )}
                      {projectDetails?.Image?.map((item, index) => {
                        return (
                          <SwiperSlide key={index}>
                            <img src={item} onError={(e) => (e.target.src = "/img/landing/nophoto.jpg")} alt="" />
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>
                  <div className={styles.right}>
                    <div className={styles.title}>{projectDetails?.projectname}</div>
                    <div className={styles.content}>
                      <span>{projectDetails?.location}</span> | <span>{projectDetails?.projectarea} sq.ft</span>
                    </div>
                    <div className={styles.contentsub}>{projectDetails?.description}</div>
                    <div
                      onClick={() => router.push(`/user-architect-about/${projectDetails?.architect_id?._id}`)}
                      className={styles.profile}
                    >
                      <img
                        src={
                          projectDetails?.architect_id?.profilepic
                            ? projectDetails?.architect_id?.profilepic
                            : "/img/landing/profile_img.svg"
                        }
                        onError={(e) => (e.target.src = "/img/landing/profile_img.svg")}
                        alt="profile"
                      />
                      <span>
                        {projectDetails?.architect_id?.firstname !== undefined
                          ? projectDetails?.architect_id?.firstname + " " + projectDetails?.architect_id?.lastname
                          : projectDetails?.architect_id?.registered_id?.name}
                      </span>
                    </div>
                    <div
                      onClick={() => router.push(`/user-architect-about/${projectDetails?.architect_id?._id}`)}
                      className={styles.archcontent}
                    >
                      {projectDetails?.architect_id?.bio}
                    </div>
                    {loginActive ? (
                      <div className={styles.buttons}>
                        <div className={styles.send} onClick={() => setArchitectSelectPopup(true)}>
                          Send requirment
                        </div>
                        <div className={styles.bid} onClick={() => setArchitectBidtPopup(true)}>
                          Invite Quote
                        </div>
                      </div>
                    ) : (
                      <div className={styles.buttons}>
                        <div className={styles.send} onClick={() => setLoginPopup(true)}>
                          Send requirment
                        </div>
                        <div className={styles.bid} onClick={() => setLoginPopup(true)}>
                          Invite Quote
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.sthree_outer}>
              <div className={`container ${styles.container} ${styles.sthree}`}>
                <div className={styles.sthree_inner}>
                  <div className={styles.slider_outer}>
                    <Swiper
                      onSwiper={setThumbsSwiper}
                      spaceBetween={38.74}
                      slidesPerView={4.2}
                      freeMode={true}
                      // navigation={true}
                      watchSlidesProgress={true}
                      modules={[FreeMode, Navigation, Thumbs]}
                      className="mySwiper"
                    >
                      {projectDetails.thumbnail ? (
                        <SwiperSlide>
                          <img
                            src={projectDetails.thumbnail}
                            onError={(e) => (e.target.src = "/img/landing/nophoto.jpg")}
                            alt=""
                          />
                        </SwiperSlide>
                      ) : (
                        ""
                      )}
                      {projectDetails?.Image?.map((item, index) => {
                        return (
                          <SwiperSlide key={index}>
                            <img src={item} onError={(e) => (e.target.src = "/img/landing/nophoto.jpg")} alt="" />
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.loading}>
            <img src="/img/landing/loading.svg" alt="Loading..." />
          </div>
        )}
        <div className={styles.border_dsthree_dsfour}></div>
        <div className={styles.dsfour_outer}>
          <div className={`container ${styles.container} ${styles.dsfour}`}>
            <div className={styles.dsfour_inner}>
              <div className={styles.heading}>Similar items</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
