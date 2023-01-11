import Head from "next/head";
import React, { useState, useContext, useEffect } from "react";
import { StoreContext } from "../../components/StoreContext";
import AgrihaLandingHeaderNoSearch from "../../components/user-common/header-ns";
import AgrihaMyBidSingleMain from "../../components/my-bid/single";
import LandingFooter from "../../components/user-common/footer";
import LoginPopup from "../../components/user-common/login-popup";
import RegisterPopup from "../../components/user-common/register-popup";
import OtpPopup from "../../components/user-common/otp-popup";
import ProfilePopup from "../../components/user-common/profile-popup";
import ArchitectBidPopupidPopup from "../../components/user-common/architect-bid-popup";

import styles from "./index.module.css";

export default function AgrihaProjectDetails() {
  const [Store] = useContext(StoreContext);

  const loginPopup = Store.loginPopup;
  const registerPopup = Store.registerPopup;
  const otpPopup = Store.otpPopup;
  const profilePopup = Store.profilePopup;
  const architectBidPopup = Store.architectBidPopup;
  return (
    <>
      <Head>
        <title>Agriha Landing page</title>
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
              <AgrihaMyBidSingleMain />
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
        {architectBidPopup ? <ArchitectBidPopupidPopup /> : ""}
      </div>
    </>
  );
}
