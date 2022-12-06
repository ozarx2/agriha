/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useState, useEffect, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./header.module.css";
import windowSize from "../windowRes";
import api_url from "../../src/utils/url";

export default function AgrihaLandingHeaderNoSearch() {
  const router = useRouter();
  const { id } = router.query;

  const windowRes = windowSize();

  const [Store] = useContext(StoreContext);
  const setLoginPopup = Store.setLoginPopup;
  const loginActive = Store.loginActive;
  const setProfilePopup = Store.setProfilePopup;
  const setLoginActive = Store.setLoginActive;
  const userId = Store.userId;
  const setUserId = Store.setUserId;
  const setUserRole = Store.setUserRole;

  const [homeSeekerDetails, setHomeSeekerDetails] = useState([]);
  async function getHomeSeekerDetails() {
    const token = localStorage.getItem("userToken");
    const res = await fetch(`${api_url}/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setHomeSeekerDetails(data.userData);
  }

  useEffect(() => {
    if (userId !== "") {
      setLoginActive(true);
      getHomeSeekerDetails();
    }
  }, [userId]);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setLoginActive(true);
    } else {
      window.location.href = "/";
    }
    const userId = localStorage.getItem("userId");
    if (userId) {
      setUserId(userId);
    }
  }, []);

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
                          <div
                            className={
                              router.pathname == "/user-my-project"
                                ? styles.active
                                : // : router.pathname == "/user-architect-about/[id]"
                                  // ? styles.active
                                  ""
                            }
                          >
                            My Projects
                          </div>
                        </Link>
                      ) : (
                        ""
                      )}
                      <Link href="/my-bid" passHref>
                        <div
                          className={
                            router.pathname == "/my-bid"
                              ? styles.active
                              : router.pathname == "/display-bid"
                              ? styles.active
                              : ""
                          }
                        >
                          My bid
                        </div>
                      </Link>
                      <Link href="/user-my-architect" passHref>
                        <div
                          className={
                            router.pathname == "/user-my-architect"
                              ? styles.active
                              : router.pathname == "/user-architect-about/[id]"
                              ? styles.active
                              : ""
                          }
                        >
                          Architects
                        </div>
                      </Link>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {windowRes.innerWidth >= 1100 ? (
                  <div className={styles.right}>
                    {loginActive ? (
                      <>
                        <div onClick={() => setProfilePopup(true)} className={styles.profile}>
                          <span>{homeSeekerDetails?.name}</span>
                          <img
                            src={
                              homeSeekerDetails?.profile_pic
                                ? homeSeekerDetails?.profile_pic
                                : "/img/landing/profile_img.svg"
                            }
                            alt="profile"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          onClick={() => (setUserRole("architect"), setLoginPopup(true))}
                          className={styles.architect}
                        >
                          Are you an Architect ?
                        </div>
                        <div onClick={() => (setUserRole("user"), setLoginPopup(true))} className={styles.login}>
                          User Login
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className={styles.right}>
                    {loginActive ? (
                      <>
                        <div onClick={() => setProfilePopup(true)} className={styles.profile}>
                          <span>{homeSeekerDetails?.name}</span>
                          <img
                            src={
                              homeSeekerDetails?.profile_pic
                                ? homeSeekerDetails?.profile_pic
                                : "/img/landing/profile_img.svg"
                            }
                            alt="profile"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          onClick={() => (setUserRole("architect"), setLoginPopup(true))}
                          className={styles.architect}
                        >
                          Architect Login
                        </div>
                        <div onClick={() => (setUserRole("user"), setLoginPopup(true))} className={styles.login}>
                          Login
                        </div>
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
              <div id="menu_mobile_outer" className={`${styles.menu_mobile_outer} ${styles.menu_mobile_outer_ns}`}>
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
                      <div
                        className={
                          router.pathname == "/user-my-project"
                            ? styles.active
                            : // : router.pathname == "/user-architect-about/[id]"
                              // ? styles.active
                              ""
                        }
                      >
                        Projects
                      </div>
                    </Link>
                  ) : (
                    ""
                  )}
                  <Link href="/my-bid" passHref>
                    <div
                      className={
                        router.pathname == "/my-bid"
                          ? styles.active
                          : router.pathname == "/display-bid"
                          ? styles.active
                          : ""
                      }
                    >
                      My bid
                    </div>
                  </Link>
                  <Link href="/user-my-architect" passHref>
                    <div
                      className={
                        router.pathname == "/user-my-architect"
                          ? styles.active
                          : router.pathname == "/user-architect-about/[id]"
                          ? styles.active
                          : ""
                      }
                    >
                      Architects
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
