/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useState, useEffect, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import { useRouter } from "next/router";
import Link from "next/link";

import styles from "./profile-popup.module.css";

export default function ProfilePopup() {
  const router = useRouter();

  const [Store] = useContext(StoreContext);

  const setProfilePopup = Store.setProfilePopup;

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

  return (
    <>
      <div id="ProfilePopupOuter" className={styles.ProfilePopupOuter}>
        <div onClick={() => setProfilePopup(false)} className={styles.ProfilePopupClose}></div>
        <div className={styles.ProfilePopupInner}>
          {windowRes.innerWidth >= 767 ? (
            <div className={styles.content_outer}>
              <div className={`container ${styles.container} ${styles.content}`}>
                <div className={styles.desktop_header}>
                  <div className={styles.userProfilePicDesktopMain}>
                    <div className={styles.userProfilePicDesktop}>
                      <div className={styles.userProfileDpDesk}>
                        <img
                          src="/img/user-profile/profileMob.svg"
                          alt="profileMob.svg"
                          className={styles.profileDpDesktop}
                        />
                      </div>
                      <div className={styles.userProfileNameDeskSection}>
                        <div className={styles.profileName}>Althaf Rahman</div>
                        <div className={styles.subHead}> althaf.arclif@gmail.com</div>
                        <div className={styles.subHead}>7736214585</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.profileTabsDeskMainSection}>
                    <div className={styles.profileTabsDeskMain}>
                      <Link href="/user-my-project" passHref>
                        <div
                          className={`${styles.profileDeskTabs} ${
                            router.pathname == "/user-my-project" ? styles.active : ""
                          }`}
                        >
                          Ongoing Project
                        </div>
                      </Link>
                      <div className={styles.profileDeskTabs}>Saved items</div>
                      <div className={styles.profileDeskTabs}>Shared projects</div>
                      <div className={styles.profileDeskTabs}>Project history</div>
                      <div className={styles.profileDeskTabs}>Products</div>
                      <div className={styles.profileDeskTabs}>Cart</div>
                      <div className={styles.profileDeskTabs}>Privacy & policy</div>
                    </div>
                  </div>
                  <div className={styles.desktopProfileLogoutSection}>Logout</div>
                </div>
                <div className={styles.content_inner}></div>
              </div>
            </div>
          ) : (
            <div className={styles.header}></div>
          )}
        </div>
      </div>
    </>
  );
}
