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
  const loginDetails = Store.loginDetails;
  const setLoginPopup = Store.setLoginPopup;

  const router = useRouter();
  const { id } = router.query;
  const projectId = id;

  /* GET PROJECT DETAILS */
  const [projectDetails, setProjectDetails] = useState([]);
  async function getProjects() {
    const res = await fetch(`${api_url}/projects/arcprojectsingle/${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data[0]);
    setProjectDetails(data[0]);
  }

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

        <div className={styles.stwo_outer}>
          <div className={`container ${styles.container} ${styles.stwo}`}>
            <div className={styles.stwo_inner}>
              <div className={styles.left}>
                <Link href="/" passHref>
                  <div className={styles.back}>
                    <img src="/img/project-details/back.svg" alt="back" />
                  </div>
                </Link>
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
                  {projectDetails?.Image?.map((item, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <img src={item} alt="" />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
              <div className={styles.right}>
                <div className={styles.title}>{projectDetails?.projectname}</div>
                <div className={styles.content}>
                  {`${projectDetails?.location} | ${projectDetails?.projectarea}q.ft`}
                </div>
                <div className={styles.profile}>
                  <img
                    src={
                      projectDetails?.architect_id?.profilepic
                        ? projectDetails?.architect_id?.profilepic
                        : "/img/landing/profile_img.svg"
                    }
                    alt="profile"
                  />
                  <span>{projectDetails?.architect_id?.firstname + " " + projectDetails?.architect_id?.lastname}</span>
                </div>
                {loginDetails ? (
                  <div className={styles.buttons}>
                    <div className={styles.send} onClick={() => setArchitectSelectPopup(true)}>
                      Send requirment
                    </div>
                    <div className={styles.bid} onClick={() => setArchitectBidtPopup(true)}>
                      Bid
                    </div>
                  </div>
                ) : (
                  <div className={styles.buttons}>
                    <div className={styles.send} onClick={() => setLoginPopup(true)}>
                      Send requirment
                    </div>
                    <div className={styles.bid} onClick={() => setLoginPopup(true)}>
                      Bid
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
                  {projectDetails?.Image?.map((item, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <img src={item} alt="" />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </div>
        </div>

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
