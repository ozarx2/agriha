/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useState, useEffect, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import { useRouter } from "next/router";
import Link from "next/link";
import windowSize from "../windowRes";
import api_url from "../../src/utils/url";

import styles from "./header.module.css";

export default function AgrihaLandingHeader() {
  const windowRes = windowSize();

  // if (typeof window !== "undefined") {
  //   if (windowRes.innerWidth <= 1100) {
  //     window.addEventListener("wheel", function (event) {
  //       if (event.deltaY < 0) {
  //         // console.log("scrolling up");
  //         if (document.getElementById("search_outer")) {
  //           document.getElementById("search_outer").style.top = "57px";
  //         }
  //         if (document.getElementById("menu_mobile_outer")) {
  //           document.getElementById("menu_mobile_outer").style.marginTop = "111px";
  //         }
  //       } else if (event.deltaY > 0) {
  //         // console.log("scrolling down");
  //         if (document.getElementById("search_outer")) {
  //           document.getElementById("search_outer").style.top = "3px";
  //         }
  //         if (document.getElementById("menu_mobile_outer")) {
  //           document.getElementById("menu_mobile_outer").style.marginTop = "57px";
  //         }
  //       }
  //     });

  //     if (typeof document !== "undefined") {
  //       var touchPos;
  //       document.body.ontouchstart = function (e) {
  //         touchPos = e.changedTouches[0].clientY;
  //       };
  //       document.body.ontouchmove = function (e) {
  //         let newTouchPos = e.changedTouches[0].clientY;
  //         if (newTouchPos > touchPos) {
  //           // console.log("finger moving down");
  //           if (document.getElementById("search_outer")) {
  //             document.getElementById("search_outer").style.top = "57px";
  //           }
  //           if (document.getElementById("menu_mobile_outer")) {
  //             document.getElementById("menu_mobile_outer").style.marginTop = "111px";
  //           }
  //         }
  //         if (newTouchPos < touchPos) {
  //           // console.log("finger moving up");
  //           if (document.getElementById("search_outer")) {
  //             document.getElementById("search_outer").style.top = "3px";
  //           }
  //           if (document.getElementById("menu_mobile_outer")) {
  //             document.getElementById("menu_mobile_outer").style.marginTop = "57px";
  //           }
  //         }
  //       };
  //     }
  //   }
  // }

  const router = useRouter();
  const { id } = router.query;

  const [Store] = useContext(StoreContext);
  const setLoginPopup = Store.setLoginPopup;
  const loginActive = Store.loginActive;
  const setProfilePopup = Store.setProfilePopup;
  const setLoginActive = Store.setLoginActive;
  const userId = Store.userId;
  const setUserId = Store.setUserId;
  const userRole = Store.userRole;
  const setUserRole = Store.setUserRole;
  const setProjectResponse = Store.setProjectResponse;
  const setAllArchitects = Store.setAllArchitects;
  const setZonePopUp = Store.setZonePopUp;
  const setUpdateZonePopUp = Store.setUpdateZonePopUp;

  const [archIdHeader, setArchIdHeader] = useState("");
  const [homeSeekerDetails, setHomeSeekerDetails] = useState([]);

  async function getHomeSeekerDetails() {
    const token = localStorage.getItem("userToken");
    // console.log(token);
    const res = await fetch(`${api_url}/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setHomeSeekerDetails(data.userData);
    if (data.userData.zone === null) {
      setZonePopUp(true);
      setUpdateZonePopUp(true);
    }
  }

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("userToken");
    useEffect(() => {
      if (userId !== "" && token) {
        getHomeSeekerDetails();
      }
    }, [userId, token]);
  }

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const userRole = localStorage.getItem("role");
    if (token) {
      if (userRole === "user") {
        setLoginActive(true);
      }
    }
    const userId = localStorage.getItem("userId");
    if (userId) {
      if (userRole === "user") {
        setUserId(userId);
      }
    }
    const architectId = localStorage.getItem("architectId");
    if (architectId) {
      if (userRole === "architect") {
        setArchIdHeader(architectId);
      }
    }
  }, []);

  async function getAllSearchResults(val) {
    let archOnly = [];
    const response = await fetch(`${api_url}/search?key=${val}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const data = await response.json();
    // console.log(data.data);
    archOnly = data.data?.filter((res) => res?.phone);
    setAllArchitects(archOnly);
    setProjectResponse(data.data?.filter((res) => res?.projectname && res?.architect_id));
    // console.log(data.data?.filter((res) => res?.projectname));
  }

  const allSearch = (query) => {
    // console.log(query);
    getAllSearchResults(query);
  };

  return (
    <>
      <div className={styles.header_outer}>
        <div className={styles.header_inner}>
          <div className={styles.main}>
            <div className={`container ${styles.container} ${styles.header}`}>
              <div className={styles.header_main_inner}>
                <div className={styles.left}>
                  <Link href="/" passHref>
                    <picture>
                      <img src="/img/landing/logo.svg" alt="logo" />
                    </picture>
                  </Link>
                </div>
                {windowRes.innerWidth >= 1100 ? (
                  <div id="menu_desktop_outer" className={styles.menu_desktop_outer}>
                    <div className={styles.menu}>
                      <Link href="/" passHref>
                        <div
                          className={
                            router.pathname == "/"
                              ? styles.active
                              : router.pathname == "/project-details/[id]"
                              ? styles.active
                              : ""
                          }
                        >
                          For You
                        </div>
                      </Link>
                      {loginActive ? (
                        <Link href="/user-my-project" passHref>
                          <div>My Projects</div>
                        </Link>
                      ) : (
                        ""
                      )}
                      <Link href="/my-bid" passHref>
                        <div>My bid</div>
                      </Link>
                      <Link href="/user-my-architect" passHref>
                        <div>Architects</div>
                      </Link>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {/* {windowRes.innerWidth >= 1100 ? (
                  <>
                    <div>contact</div>
                    <div>notification</div>
                  </>
                ) : (
                  ""
                )} */}

                {windowRes.innerWidth >= 1100 ? (
                  <div className={styles.right}>
                    {loginActive ? (
                      <>
                        <div onClick={() => setProfilePopup(true)} className={styles.profile}>
                          <span>{homeSeekerDetails?.registered_id?.name}</span>
                          <img
                            src={
                              homeSeekerDetails?.profile_pic
                                ? homeSeekerDetails?.profile_pic
                                : "/img/landing/profile_img.svg"
                            }
                            onError={(e) => (e.target.src = "/img/landing/profile_img.svg")}
                            alt="profile"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        {/* <div
                          onClick={() => (setUserRole("architect"), setLoginPopup(true))}
                          className={styles.architect}
                        >
                          Architect Login
                        </div> */}
                        {archIdHeader !== "" ? (
                          <div
                            onClick={() => router.push(`/architect-dashboard/${archIdHeader}`)}
                            className={styles.logins}
                          >
                            Architect Dashboard
                          </div>
                        ) : (
                          <div
                            onClick={() => (setUserRole("architect"), setLoginPopup(true))}
                            className={styles.logins}
                          >
                            Architect Login
                          </div>
                        )}
                        &nbsp;
                        {archIdHeader !== "" ? (
                          ""
                        ) : (
                          <div onClick={() => (setUserRole("user"), setLoginPopup(true))} className={styles.login}>
                            HomeSeeker Login
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ) : (
                  <div className={styles.right}>
                    {loginActive ? (
                      <>
                        <div onClick={() => setProfilePopup(true)} className={styles.profile}>
                          <span>{homeSeekerDetails?.registered_id?.name}</span>
                          <img
                            src={
                              homeSeekerDetails?.profile_pic
                                ? homeSeekerDetails?.profile_pic
                                : "/img/landing/profile_img.svg"
                            }
                            onError={(e) => (e.target.src = "/img/landing/profile_img.svg")}
                            alt="profile"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        {/* <div
                          onClick={() => (setUserRole("architect"), setLoginPopup(true))}
                          className={styles.architect}
                        >
                          Architect Login
                        </div> */}
                        {archIdHeader !== "" ? (
                          <div
                            onClick={() => router.push(`/architect-dashboard/${archIdHeader}`)}
                            className={styles.logins}
                          >
                            Architect Dashboard
                          </div>
                        ) : (
                          <div
                            onClick={() => (setUserRole("architect"), setLoginPopup(true))}
                            className={styles.logins}
                          >
                            Architect Login
                          </div>
                        )}
                        &nbsp;
                        {archIdHeader !== "" ? (
                          ""
                        ) : (
                          <div onClick={() => (setUserRole("user"), setLoginPopup(true))} className={styles.login}>
                            HomeSeeker Login
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {windowRes.innerWidth >= 1100 ? (
            ""
          ) : (
            <div className={`container ${styles.container} ${styles.container_menu_mobile_outer}`}>
              {/* <div id="menu_mobile_outer" className={styles.menu_mobile_outer} style={{ marginTop: "57px" }}> */}
              <div id="menu_mobile_outer" className={styles.menu_mobile_outer} style={{ marginTop: "111px" }}>
                <div className={styles.menu}>
                  {router.pathname == "/project-details/[id]" ? (
                    <div onClick={() => router.back()} className={styles.back}>
                      <img src="/img/project-details/back.svg" alt="back" />
                    </div>
                  ) : (
                    ""
                  )}
                  <Link href="/" passHref>
                    <div
                      className={
                        router.pathname == "/"
                          ? styles.active
                          : router.pathname == "/project-details/[id]"
                          ? styles.active
                          : ""
                      }
                    >
                      For You
                    </div>
                  </Link>
                  {loginActive ? (
                    <Link href="/user-my-project" passHref>
                      <div>Projects</div>
                    </Link>
                  ) : (
                    ""
                  )}
                  <Link href="/my-bid" passHref>
                    <div>My bid</div>
                  </Link>
                  <Link href="/user-my-architect" passHref>
                    <div>Architects</div>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {windowRes.innerWidth >= 1100 ? (
            ""
          ) : (
            <div id="search_outer" className={`search_outer ${styles.search_outer}`} style={{ top: "57px" }}>
              {/* <div id="search_outer" className={`search_outer ${styles.search_outer}`} style={{ top: "3px" }}> */}
              <div className={styles.search_out}>
                <img src="/img/landing/search.svg" alt="search" />
                <input type="text" onChange={(e) => allSearch(e.target.value)} placeholder="Search here..." />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
