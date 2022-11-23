import Head from "next/head";
import React, { useState, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import AgrihaLandingHeader from "../../components/user-common/header";
import AgrihaMyBidMain from "../../components/my-bid/main";
import LandingFooter from "../../components/user-common/footer";
import LoginPopup from "../../components/user-common/login-popup";
import RegisterPopup from "../../components/user-common/register-popup";
import OtpPopup from "../../components/user-common/otp-popup";

import styles from "./index.module.css";

export default function AgrihaProjectDetails() {
  const [Store] = useContext(StoreContext);

  const loginPopup = Store.loginPopup;
  const registerPopup = Store.registerPopup;
  const otpPopup = Store.otpPopup;
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
              <AgrihaLandingHeader />
            </div>
            <div className={styles.main}>
              <AgrihaMyBidMain />
            </div>
            <div className={styles.footer}>
              <LandingFooter />
            </div>
          </div>
        </div>
        {loginPopup ? <LoginPopup /> : ""}
        {registerPopup ? <RegisterPopup /> : ""}
        {otpPopup ? <OtpPopup /> : ""}
      </div>
    </>
  );
}
