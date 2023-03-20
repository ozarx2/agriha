import Head from "next/head";
import React, { useContext } from "react";
import { StoreContext } from "../components/StoreContext";
import AgrihaLandingHeader from "../components/user-common/header";
import AgrihaLandingHeaderNoSearch from "../components/user-common/header-ns";
import AgrihaLandingMain from "../components/landing/landing-main";
import LandingFooter from "../components/user-common/footer";
import LoginPopup from "../components/user-common/login-popup";
import RegisterPopup from "../components/user-common/register-popup";
import OtpPopup from "../components/user-common/otp-popup";
import ArchitectBidPopupidPopup from "../components/user-common/architect-bid-popup";
import ProfilePopup from "../components/user-common/profile-popup";
import ZonePopup from "../components/user-common/zone-popup";

import styles from "./index.module.css";

export default function AgrihaLanding() {
  const [Store] = useContext(StoreContext);

  const loginPopup = Store.loginPopup;
  const registerPopup = Store.registerPopup;
  const otpPopup = Store.otpPopup;
  const zonePopup = Store.zonePopup;
  const architectBidPopup = Store.architectBidPopup;
  const profilePopup = Store.profilePopup;

  // console.log(registerPopup);

  return (
    <>
      <Head>
        <title>Arclif - Agriha Services</title>
        <meta name="description" content="Arclif - Agriha Services" />
        <meta name="google-site-verification" content="k6V7Y2_tjT8-diSdh9sfyxGjxqF9V8WWLjQULB909p0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className={styles.container_outer}>
          <div className={styles.container_inner}>
            <div className={styles.header}>
              {/* <AgrihaLandingHeader /> */}
              <AgrihaLandingHeaderNoSearch />
            </div>
            <div className={styles.main}>
              <AgrihaLandingMain />
            </div>
            <div className={styles.footer}>
              <LandingFooter />
            </div>
          </div>
        </div>
        {loginPopup ? <LoginPopup /> : ""}
        {registerPopup ? <RegisterPopup /> : ""}
        {otpPopup ? <OtpPopup /> : ""}
        {zonePopup ? <ZonePopup /> : ""}
        {architectBidPopup ? <ArchitectBidPopupidPopup /> : ""}
        {profilePopup ? <ProfilePopup /> : ""}
      </div>
    </>
  );
}
