/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import { useRef, useState, useEffect, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

import styles from "./navbar.module.css";

const NavbarUserDesktop = () => {
  const router = useRouter();
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

    if (windowRes.innerWidth <= 1100) {
      if (typeof window !== "undefined") {
        window.addEventListener("wheel", function (event) {
          if (event.deltaY < 0) {
            // console.log("scrolling up");
            if (document.getElementById("search_outer")) {
              document.getElementById("search_outer").style.top = "57px";
            }
            if (document.getElementById("menu_mobile_outer")) {
              document.getElementById("menu_mobile_outer").style.marginTop = "111px";
            }
          } else if (event.deltaY > 0) {
            // console.log("scrolling down");
            if (document.getElementById("search_outer")) {
              document.getElementById("search_outer").style.top = "3px";
            }
            if (document.getElementById("menu_mobile_outer")) {
              document.getElementById("menu_mobile_outer").style.marginTop = "57px";
            }
          }
        });
      }

      // if (typeof document !== "undefined") {
      //   var touchPos;
      //   document.body.ontouchstart = function (e) {
      //     touchPos = e.changedTouches[0].clientY;
      //   };
      //   document.body.ontouchmove = function (e) {
      //     let newTouchPos = e.changedTouches[0].clientY;
      //     if (newTouchPos > touchPos) {
      //       // console.log("finger moving down");
      //       if (document.getElementById("search_outer")) {
      //         document.getElementById("search_outer").style.top = "57px";
      //       }
      //       if (document.getElementById("menu_mobile_outer")) {
      //         document.getElementById("menu_mobile_outer").style.marginTop =
      //           "111px";
      //       }
      //     }
      //     if (newTouchPos < touchPos) {
      //       // console.log("finger moving up");
      //       if (document.getElementById("search_outer")) {
      //         document.getElementById("search_outer").style.top = "3px";
      //       }
      //       if (document.getElementById("menu_mobile_outer")) {
      //         document.getElementById("menu_mobile_outer").style.marginTop =
      //           "57px";
      //       }
      //     }
      //   };
      // }
    }
  }
  return (
    <>
      <div className={styles.header_outer}>
        <div className={styles.header_inner}>
          <div className={styles.main}>
            <div className={`container ${styles.container} ${styles.header}`}>
              <div className={styles.header_main_inner}>
                <div className={styles.navLeft}>
                  <Link href="/" passHref>
                    <Image src="/img/landing/logo.svg" alt="logo" width={125} height={31} />
                  </Link>
                  {windowRes.innerWidth >= 1100 ? (
                    <>
                      {/* <Link href="/dashboard-user">
                    <div
                      className={`${styles.navLeftTitle} ${
                        router.pathname == "/dashboard-user"
                          ? styles.active
                          : ""
                      }`}
                    >
                      Home
                    </div>
                  </Link> */}

                      <Link href="/" passHref>
                        <div
                          className={`${styles.navLeftTitle} ${router.pathname == "/" ? styles.active : ""} ${
                            router.pathname == "/project-details/[id]" ? styles.active : ""
                          }`}
                        >
                          For You
                        </div>
                      </Link>

                      <Link href="/user-my-project" passHref>
                        <div
                          className={`${styles.navLeftTitle} ${
                            router.pathname == "/user-my-project" ? styles.active : ""
                          }`}
                        >
                          My Projects
                        </div>
                      </Link>

                      <Link href="/my-bid" passHref>
                        <div
                          className={`${styles.navLeftTitle} ${router.pathname == "/my-bid" ? styles.active : ""} ${
                            router.pathname == "/display-bid" ? styles.active : ""
                          }`}
                        >
                          My bid
                        </div>
                      </Link>

                      <Link href="/user-my-architect" passHref>
                        <div
                          className={`${styles.navLeftTitle} ${
                            router.pathname == "/user-my-architect" ? styles.active : ""
                          } ${router.pathname == "/user-architect-about" ? styles.active : ""}`}
                        >
                          Architects
                        </div>
                      </Link>
                      {/* <div className={styles.navLeftTitle}>Shared Project</div>
                  <div className={styles.navLeftTitle}>Products</div>
                  <div className={styles.navLeftTitle}>Cart</div> */}
                    </>
                  ) : (
                    ""
                  )}
                </div>

                {windowRes.innerWidth >= 1100 ? (
                  <>
                    <div className={styles.navRight}>
                      <div className={styles.navRightDiv}>
                        <img src="/img/navbarone/bell.svg" alt="bell.svg" />
                      </div>
                      <div className={styles.navRightDiv}>
                        <img src="/img/navbarone/livechat.svg" alt="contact.svg" className={styles.navContact} />
                        <div className={styles.navRightTitle}>Contact</div>
                      </div>
                      {/* <div className={styles.navRightDiv}>
                    <img
                      src="/img/navbarone/call.svg"
                      alt="contact.svg"
                      className={styles.navLivechat}
                    />
                    <div className={styles.navRightTitle}>Livechat</div>
                  </div> */}
                      <div className={styles.addProject}>
                        <button className={styles.addProjectBtn}>
                          <img src="/img/navbarone/add.svg" alt="add.svg" className={styles.addProjectIcon} />
                          Add Project
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className={styles.navRightMobile}>
                    <div className={styles.navRightMobileProfile}>
                      <div>Althaf Rahman</div>
                      <img src="/img/navbarone/profilemobile.svg" alt="profilemobile.svg" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {windowRes.innerWidth >= 1100 ? (
            ""
          ) : (
            <div className={`container ${styles.container} ${styles.container_menu_mobile_outer}`}>
              <div
                className={styles.menu_mobile_outer}
                // id="menu_mobile_outer"
                // className={styles.menu_mobile_outer}
                // style={{ marginTop: "57px" }}
              >
                <div className={styles.navMobile}>
                  <Link href="/" passHref>
                    <div
                      className={`${styles.navsMobile} ${router.pathname == "/" ? styles.actives : ""} ${
                        router.pathname == "/project-details/[id]" ? styles.actives : ""
                      }`}
                    >
                      For you
                    </div>
                  </Link>
                  <Link href="/user-my-project" passHref>
                    <div
                      className={`${styles.navsMobile} ${router.pathname == "/user-my-project" ? styles.actives : ""}`}
                    >
                      Projects
                    </div>
                  </Link>

                  <Link href="/my-bid" passHref>
                    <div
                      className={`${styles.navsMobile} ${router.pathname == "/my-bid" ? styles.actives : ""} ${
                        router.pathname == "/display-bid" ? styles.actives : ""
                      }`}
                    >
                      My bid
                    </div>
                  </Link>
                  <Link href="/user-my-architect" passHref>
                    <div
                      className={`${styles.navsMobile} ${
                        router.pathname == "/user-my-architect" ? styles.actives : ""
                      } ${router.pathname == "/user-architect-about" ? styles.actives : ""}`}
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
};

export default NavbarUserDesktop;
