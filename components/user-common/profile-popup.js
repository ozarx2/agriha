/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useState, useEffect, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import { useRouter } from "next/router";
import Link from "next/link";
import windowSize from "../windowRes";
import api_url from "../../src/utils/url";

import styles from "./profile-popup.module.css";

export default function ProfilePopup() {
  const router = useRouter();

  const [Store] = useContext(StoreContext);
  const setProfilePopup = Store.setProfilePopup;
  const setLoginActive = Store.setLoginActive;
  const setUserId = Store.setUserId;
  const userId = Store.userId;

  const windowRes = windowSize();

  const logoutFunction = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userToken");
    setLoginActive(false);
    setUserId("");
    setProfilePopup(false);
    router.push("/");
  };

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
      getHomeSeekerDetails();
    }
  }, [userId]);

  return (
    <>
      <div id="ProfilePopupOuter" className={styles.ProfilePopupOuter}>
        <div onClick={() => setProfilePopup(false)} className={styles.ProfilePopupClose}></div>
        <div className={styles.ProfilePopupInner}>
          {windowRes.innerWidth >= 767 ? (
            <div className={styles.desktop}>
              <div className={styles.content_outer}>
                <div className={styles.desktop_header}>
                  <div className={styles.userProfilePicDesktopMain}>
                    <div className={styles.userProfilePicDesktop}>
                      <div className={styles.userProfileDpDesk}>
                        <img
                          src={
                            homeSeekerDetails?.profile_pic
                              ? homeSeekerDetails?.profile_pic
                              : "/img/landing/profile_img.svg"
                          }
                          onError={(e) => (e.target.src = "/img/landing/profile_img.svg")}
                          alt="profile"
                          className={styles.profileDpDesktop}
                        />
                        <img src="/img/profile/edit.svg" alt="profile" className={styles.edit} />
                      </div>
                      <div className={styles.userProfileNameDeskSection}>
                        <div className={styles.profileName}>{homeSeekerDetails?.name}</div>
                        <div className={styles.subHead}>{homeSeekerDetails?.registered_id?.email}</div>
                        <div className={styles.subHead}>{homeSeekerDetails?.registered_id?.phone}</div>
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

                      {/* <div className={styles.profileDeskTabs}>Saved items</div>
                      <div className={styles.profileDeskTabs}>Shared projects</div>
                      <div className={styles.profileDeskTabs}>Project history</div>
                      <div className={styles.profileDeskTabs}>Products</div>
                      <div className={styles.profileDeskTabs}>Cart</div> */}
                      <div className={styles.profileDeskTabs}>Privacy & policy</div>
                    </div>
                  </div>
                  <div onClick={() => logoutFunction()} className={styles.desktopProfileLogoutSection}>
                    Logout
                  </div>
                </div>
                <div className={styles.content_inner}></div>
              </div>
            </div>
          ) : (
            <div className={styles.mobile}>
              <div className={styles.main_header}>
                <div className={`container ${styles.container} ${styles.header}`}>
                  <div className={styles.header_main_inner}>
                    <div className={styles.left}>
                      <picture>
                        <img src="/img/landing/logo.svg" alt="logo" />
                      </picture>
                    </div>
                    <div className={styles.right}>
                      <div className={styles.profile}>
                        <span>Althaf Rahman</span>
                        <img src="/img/landing/profile_img.svg" alt="profile" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`container ${styles.container} ${styles.popup_content}`}>
                <div className={styles.popup_content_outer}>
                  <div className={styles.popup_content_inner}>
                    <div className={styles.first}>
                      <div onClick={() => setProfilePopup(false)} className={styles.back}>
                        <img src="/img/project-details/back.svg" alt="back" />
                      </div>
                      <div>
                        <img
                          className={styles.profile_pic}
                          src={
                            homeSeekerDetails?.profile_pic
                              ? homeSeekerDetails?.profile_pic
                              : "/img/landing/profile_img.svg"
                          }
                          onError={(e) => (e.target.src = "/img/landing/profile_img.svg")}
                          alt="profile"
                        />
                      </div>
                      <div className={styles.name}>{homeSeekerDetails?.name}</div>
                      <div className={styles.details}>
                        <span>{homeSeekerDetails?.registered_id?.email}</span>
                        <span>.</span>
                        <span>{homeSeekerDetails?.registered_id?.phone}</span>
                      </div>
                      <div className={styles.buttons}>
                        <div className={styles.edit}>Edit profile</div>
                        <div onClick={() => logoutFunction()} className={styles.logout}>
                          Log out
                        </div>
                      </div>
                    </div>
                    <div className={styles.second}>
                      <div>Ongoing project</div>
                      {/* <div>Saved item</div>
                      <div>Shared project</div>
                      <div>Project history</div>
                      <div>Product</div>
                      <div>Cart</div> */}
                    </div>
                    <div className={styles.third}>
                      <div>Privacy & policy</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
