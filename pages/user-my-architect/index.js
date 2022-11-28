/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import LandingFooter from "../../components/user-common/footer";
import NavbarUserDesktop from "../../components/user-common/navbar-user";
import Head from "next/head";
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
  const profilPopup = Store.profilPopup;
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
              <NavbarUserDesktop />
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
        {profilPopup ? <ProfilePopup /> : ""}
      </div>
    </>
  );
};

export default UserMyProjectMain;
