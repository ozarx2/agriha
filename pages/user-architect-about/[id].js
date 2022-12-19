import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { StoreContext } from "../../components/StoreContext";
import LandingFooter from "../../components/user-common/footer";
import AgrihaLandingHeaderNoSearch from "../../components/user-common/header-ns";
import Head from "next/head";
import ProfilePopup from "../../components/user-common/profile-popup";
import OtpPopup from "../../components/user-common/otp-popup";
import RegisterPopup from "../../components/user-common/register-popup";
import LoginPopup from "../../components/user-common/login-popup";
import ArchitectSelectProfilePopup from "../../components/user-common/architect-profile-select-popup";
import UserArchitectAbout from "../../components/user-architect-about/main";
import SharePopup from "../../components/user-common/share-popup";

import styles from "./index.module.css";

const UserArchitectAboutMain = () => {
  const [Store] = useContext(StoreContext);

  const loginPopup = Store.loginPopup;
  const registerPopup = Store.registerPopup;
  const otpPopup = Store.otpPopup;
  const profilePopup = Store.profilePopup;
  const architectProfileSelectPopup = Store.architectProfileSelectPopup;
  const sharePopup = Store.sharePopup;

  const router = useRouter();
  const { id } = router.query;

  const [userIdSpl, setUserIdSpl] = useState("");
  /* GET ARCHITECT ID */
  function getParameters() {
    let urlString = window.location.href;
    let paramString = urlString.split("/")[4];
    let queryString = new URLSearchParams(paramString);
    for (let pair of queryString.entries()) {
      setUserIdSpl(pair[0]);
    }
  }

  useEffect(() => {
    getParameters();
  }, [id]);

  /* GET Single Architect details */
  const [singleArchitect, setSingleArchitect] = useState([]);
  async function getSingleArchitect() {
    const token = localStorage.getItem("userToken");
    const res = await fetch(`${api_url}/architects/${userIdSpl}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer ${dummy_token}`,
      },
    });
    const data = await res.json();
    setSingleArchitect(data);
  }

  return (
    <>
      <Head>
        <title>Architect Profile | Agriha</title>
        <meta name="description" content="Architect Profile | Agriha" />
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
        {architectProfileSelectPopup ? <ArchitectSelectProfilePopup /> : ""}
        {sharePopup ? <SharePopup /> : ""}
      </div>
    </>
  );
};

export default UserArchitectAboutMain;
