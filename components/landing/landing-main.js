/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useState, useEffect, useContext } from "react";
import api_url from "../../src/utils/url";
import AgrihaImageGrid from "../user-common/image-grid";
import { StoreContext } from "../../components/StoreContext";
import Link from "next/link";
import windowSize from "../windowRes";

import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Keyboard, Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles from "./landing-main.module.css";

export default function AgrihaLandingMain() {
  const windowRes = windowSize();

  const [filter, setFilter] = useState("All");

  const [Store] = useContext(StoreContext);
  const setRegisterPopup = Store.setRegisterPopup;
  const loginActive = Store.loginActive;
  const projectResponse = Store.projectResponse;
  const setProjectResponse = Store.setProjectResponse;
  const setAllArchitects = Store.setAllArchitects;
  const setArchitectBidtPopup = Store.setArchitectBidtPopup;

  /* GET PROJECT TYPES */
  const [projectTypes, setProjectTypes] = useState([]);
  async function getProjects() {
    const token = localStorage.getItem("userToken");
    const res = await fetch(`${api_url}/search/architect/company_names`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setProjectTypes(data);
  }

  useEffect(() => {
    getProjects();
  }, []);

  const [allProjectSliced, setAllProjectSliced] = useState([]);

  function groupN(array, num) {
    const group = [];
    for (let i = 0; i < array?.length; i += num) {
      group.push(array.slice(i, i + num));
    }
    setAllProjectSliced(group);
  }

  async function getAllProjects() {
    const response = await fetch(`${api_url}/projects/getallprojects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data) {
      const withArchitect = data.data.filter((res) => res?.architect_id);
      if (filter === "All") {
        setProjectResponse(withArchitect);
      } else {
        let filtered = withArchitect.filter((res) => res?.architect_id?.companyname === filter);
        setProjectResponse(filtered);
      }
    }
  }

  useEffect(() => {
    getAllProjects();
  }, [filter]);

  useEffect(() => {
    groupN(projectResponse, 4);
  }, [projectResponse]);

  async function getAllSearchResults(val) {
    let archOnly = [];
    const response = await fetch(`${api_url}/search?key=${val}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    archOnly = data.data?.filter((res) => res?.phone);
    setAllArchitects(archOnly);
    setProjectResponse(data.data?.filter((res) => res?.projectname && res?.architect_id));
  }

  const allSearch = (query) => {
    getAllSearchResults(query);
  };

  return (
    <>
      <div className={styles.main_outer}>
        <div className={styles.main_inner}>
          {windowRes.innerWidth >= 1100 ? (
            <div className={styles.desktop_section_outer}>
              <div className={styles.sone_outer}>
                <div className={`container ${styles.container} ${styles.sone}`}>
                  <div className={styles.sone_inner}>
                    <div className={styles.search}>
                      <img src="/img/landing/search.svg" alt="search" />
                      <input
                        type="text"
                        onChange={(e) => allSearch(e.target.value)}
                        placeholder="Search Favorite Design"
                      />
                    </div>
                    {/* <div className={styles.filters}>
                      <img src="/img/landing/filter.svg" alt="filter" />
                      <span>All filters</span>
                    </div>
                    <div className={styles.sort}>
                      <img src="/img/landing/sort.svg" alt="sort" />
                      <span>Sort list</span>
                    </div> */}
                  </div>
                </div>
              </div>

              <div className={styles.stwo_outer}>
                <div className={`container ${styles.container} ${styles.stwo}`}>
                  <div className={styles.stwo_inner}>
                    <div className={styles.left}>
                      <img src="/img/landing/banner-left.png" alt="left banner" />
                    </div>
                    <div className={styles.center}>
                      <div className={styles.title}>
                        Leading Architects for you to <span>design your space</span>
                      </div>
                      <div className={styles.content}>
                        connect and get best bedroom, kitchen, bathroom, livingroom, dining, interior, landscape,
                        furniture, electrical designs
                      </div>
                      <div className={styles.buttons}>
                        {loginActive ? (
                          <div className={styles.start} onClick={() => setArchitectBidtPopup(true)}>
                            <img src="/img/landing/plus.svg" alt="plus" />
                            <span>Invite Quote</span>
                          </div>
                        ) : (
                          <div className={styles.start} onClick={() => setRegisterPopup(true)}>
                            Get Started
                          </div>
                        )}

                        <div className={styles.contact}>Contact us</div>
                      </div>
                    </div>
                    <div className={styles.right}>
                      <img src="/img/landing/banner-right.png" alt="right banner" />
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.sthree_outer}>
                <div className={`container ${styles.container} ${styles.sthree}`}>
                  <div className={styles.sthree_inner}>
                    <div className={styles.active} onClick={() => setFilter("All")}>
                      All
                    </div>
                    {projectTypes?.map((item, index) => {
                      return (
                        <>
                          {item?.companyname ? (
                            <div onClick={() => setFilter(item?.companyname)} key={index}>
                              {item?.companyname}
                            </div>
                          ) : (
                            ""
                          )}
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className={styles.mobile_section_outer}>
                <div className={styles.sone_outer}>
                  <div
                    className={styles.sone_bgone}
                    style={{
                      backgroundImage: "url(/img/landing/sone-left.svg)",
                    }}
                  >
                    <div
                      className={styles.sone_bgtwo}
                      style={{
                        backgroundImage: "url(/img/landing/sone-right.svg)",
                      }}
                    >
                      <div className={`container ${styles.container} ${styles.sone}`}>
                        <div className={styles.sone_inner}>
                          <div className={styles.heading}>
                            Leading Architects for you to <span>Design your space</span>
                          </div>
                          <div className={styles.buttons}>
                            {loginActive ? (
                              <div className={styles.started} onClick={() => setArchitectBidtPopup(true)}>
                                <img src="/img/landing/plus.svg" alt="plus" />
                                <span>Invite Quote</span>
                              </div>
                            ) : (
                              <div onClick={() => setRegisterPopup(true)} className={styles.started}>
                                Get Started
                              </div>
                            )}
                            <div className={styles.contact}> Contact us</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.stwo_outer}>
                  <div className={`container ${styles.container} ${styles.stwo}`}>
                    <div className={styles.stwo_inner}>
                      <div className="landing_stwo_inner">
                        <Swiper
                          spaceBetween={30}
                          centeredSlides={true}
                          autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                          }}
                          mousewheel={true}
                          keyboard={{
                            enabled: true,
                          }}
                          pagination={{
                            clickable: true,
                          }}
                          modules={[Mousewheel, Keyboard, Autoplay, Pagination, Navigation]}
                          className="mySwiper"
                        >
                          <SwiperSlide>
                            <Link href="https://www.arclif.com/" passHref>
                              <img src="/img/landing/s1.JPEG" alt="s1" />
                            </Link>
                          </SwiperSlide>
                          <SwiperSlide>
                            <Link href="/my-bid" passHref>
                              <img src="/img/landing/s3.JPEG" alt="s3" />
                            </Link>
                          </SwiperSlide>
                        </Swiper>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className={styles.sthree_outer}>
            <div className={`container ${styles.container} ${styles.sthree}`}>
              <div className={styles.sthree_inner}>
                {projectResponse?.length !== 0 ? (
                  <AgrihaImageGrid allProjectSliced={allProjectSliced} />
                ) : (
                  <div className={styles.loading}>
                    <img src="/img/landing/loading.svg" alt="Loading..." />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
