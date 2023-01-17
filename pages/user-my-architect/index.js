/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import Head from "next/head";
import LandingFooter from "../../components/user-common/footer";
import AgrihaLandingHeaderNoSearch from "../../components/user-common/header-ns";
import ProfilePopup from "../../components/user-common/profile-popup";
import OtpPopup from "../../components/user-common/otp-popup";
import RegisterPopup from "../../components/user-common/register-popup";
import LoginPopup from "../../components/user-common/login-popup";
import UserMyArchitects from "../../components/user-my-architect/main";

import styles from "./index.module.css";

const UserMyProjectMain = () => {
  const [Store] = useContext(StoreContext);

  const loginPopup = Store.loginPopup;
  const registerPopup = Store.registerPopup;
  const otpPopup = Store.otpPopup;
  const profilePopup = Store.profilePopup;
  const searchQueryArchitect = Store.searchQueryArchitect;

  return (
    <>
      {searchQueryArchitect ? (
        <Head>
          <title>{searchQueryArchitect}</title>
          <meta name="description" content="Agriha Landing page" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      ) : (
        ""
      )}
      <div>
        <div className={styles.container_outer}>
          <div className={styles.container_inner}>
            <div className={styles.header}>
              <AgrihaLandingHeaderNoSearch />
            </div>
            <div className={styles.main}>
              <UserMyArchitects />
            </div>
            <div className={styles.footer}>
              <LandingFooter />
            </div>
          </div>
        </div>
        {loginPopup ? <LoginPopup /> : ""}
        {registerPopup ? <RegisterPopup /> : ""}
        {otpPopup ? <OtpPopup /> : ""}
        {profilePopup ? <ProfilePopup /> : ""}
      </div>
    </>
  );
};

export default UserMyProjectMain;
