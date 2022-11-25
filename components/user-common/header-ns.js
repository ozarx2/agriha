/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useState, useEffect, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./header.module.css";

export default function AgrihaLandingHeaderNoSearch() {
  const [windowRes, setWindowRes] = useState([]);
  if (typeof window !== "undefined") {
    const [windowSize, setWindowSize] = useState(getWindowSize());
    function getWindowSize() {
      const innerWidth = window.innerWidth;
      const innerHeight = window.innerHeight;
      return { innerWidth, innerHeight };
    }
    useEffect(() => {
      function handleWindowResize() {
        setWindowSize(getWindowSize());
        setWindowRes(getWindowSize());
      }
      setWindowRes(getWindowSize());
      window.addEventListener("resize", handleWindowResize);
      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    }, []);
  }

  const router = useRouter();
  const { id } = router.query;

  const [Store] = useContext(StoreContext);
  const setLoginPopup = Store.setLoginPopup;
  const loginActive = Store.loginActive;
  return (
    <>
      <div className={styles.header_outer}>
        <div className={styles.header_inner}>
          <div className={styles.main}>
            <div className={`container ${styles.container} ${styles.header}`}>
              <div className={styles.header_main_inner}>
                <div className={styles.left}>
                  <picture>
                    <img src="/img/landing/logo.svg" alt="logo" />
                  </picture>
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
                      <Link href="/" passHref>
                        <div>Projects</div>
                      </Link>
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
                      <Link href="/" passHref>
                        <div>Architects</div>
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
                        <div className={styles.profile}>
                          <span>Althaf Rahman</span>
                          <img src="/img/landing/profile_img.svg" alt="profile" />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={styles.architect}>Are you an Architect ?</div>
                        <div onClick={() => setLoginPopup(true)} className={styles.login}>
                          User Login
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className={styles.right}>
                    {loginActive ? (
                      <>
                        <div className={styles.profile}>
                          <span>Althaf Rahman</span>
                          <img src="/img/landing/profile_img.svg" alt="profile" />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={styles.architect}>Architect Login</div>
                        <div onClick={() => setLoginPopup(true)} className={styles.login}>
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
                    <Link href="/" passHref>
                      <div className={styles.back}>
                        <img src="/img/project-details/back.svg" alt="back" />
                      </div>
                    </Link>
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
                  <Link href="/" passHref>
                    <div>Projects</div>
                  </Link>
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
                  <Link href="/" passHref>
                    <div>Architects</div>
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
