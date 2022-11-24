/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useRouter } from "next/router";

import styles from "./main.module.css";
import api_url from "../../src/utils/url";
import { useContext } from "react";
import { StoreContext } from "../StoreContext";

export default function AgrihaProjectDetailsMainMobileTop() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [projectDetails, setProjectDetails] = useState([]);

  const [Store] = useContext(StoreContext);
  const setBidArchitectId = Store.setBidArchitectId;
  const setBid = Store.setBid;

  const router = useRouter();
  const { id } = router.query;
  const projectId = id;

  /* GET PROJECT DETAILS */
  async function getProjects() {
    const res = await fetch(
      `${api_url}/projects/arcprojectsingle/${projectId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data[0]);
    setProjectDetails(data[0]);
  }

  useEffect(() => {
    if (projectId !== "") {
      getProjects();
    }
  }, [projectId]);

  const sentRequirement = (id) => {
    setBidArchitectId(id);
    setBid(false);
    window.location.href = "/requirement/basic-details";
  };

  const sentRequirementBid = () => {
    setBidArchitectId(null);
    setBid(true);
    window.location.href = "/requirement/basic-details";
  };

  return (
    <>
      <div
        id="agriha_mobile_section_outer"
        className={styles.mobile_section_outer}
      >
        <div className={styles.sone_outer}>
          <div className={`container ${styles.container} ${styles.sone}`}>
            <div className={styles.sone_inner}>
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
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={3.2}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
              >
                {projectDetails.Image?.map((item, index) => {
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

        <div className={styles.stwo_outer}>
          <div className={`container ${styles.container} ${styles.stwo}`}>
            <div className={styles.stwo_inner}>
              <div className="landing_stwo_inner">
                <div className={styles.stwo_max}>
                  <div className={styles.heading}>
                    {projectDetails.projectname}
                  </div>
                  <div className={styles.content}>
                    {`${projectDetails?.location} | ${projectDetails?.projectarea}q.ft`}
                  </div>
                  <div className={styles.profile}>
                    <div className={styles.left}>
                      <img
                        src={projectDetails?.architect_id?.profilepic}
                        alt="profile"
                      />
                      <span>
                        {projectDetails?.architect_id?.firstname +
                          " " +
                          projectDetails?.architect_id?.lastname}
                      </span>
                    </div>
                    <div className={styles.right}>
                      <div
                        className={styles.send}
                        onClick={() =>
                          sentRequirement(projectDetails?.architect_id?._id)
                        }
                      >
                        Send requirment
                      </div>
                      <div className={styles.bid} onClick={sentRequirementBid}>
                        Bid
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.border_mstwo_msthree}></div>
        <div className={styles.msthree_outer}>
          <div className={`container ${styles.container} ${styles.msthree}`}>
            <div className={styles.msthree_inner}>
              <div className={styles.heading}>Similar items</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
