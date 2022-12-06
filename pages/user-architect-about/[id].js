import React, { useState, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import LandingFooter from "../../components/user-common/footer";
import AgrihaLandingHeaderNoSearch from "../../components/user-common/header-ns";
import Head from "next/head";
import ProfilePopup from "../../components/user-common/profile-popup";
import OtpPopup from "../../components/user-common/otp-popup";
import RegisterPopup from "../../components/user-common/register-popup";
import LoginPopup from "../../components/user-common/login-popup";

import styles from "./index.module.css";
import UserArchitectAbout from "../../components/user-architect-about/main";

const UserArchitectAboutMain = () => {
  const [Store] = useContext(StoreContext);

  const loginPopup = Store.loginPopup;
  const registerPopup = Store.registerPopup;
  const otpPopup = Store.otpPopup;
  const profilePopup = Store.profilePopup;

  return (
    <>
      <Head>
        <title>Agriha User my project</title>
        <meta name="description" content="Agriha Landing page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className={styles.container_outer}>
          <div className={styles.container_inner}>
            <div className={styles.header}>
              <AgrihaLandingHeaderNoSearch />
            </div>
            <div className={styles.main}>
              <UserArchitectAbout />
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

export default UserArchitectAboutMain;
