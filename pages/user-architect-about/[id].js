import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { StoreContext } from "../../components/StoreContext";
import LandingFooter from "../../components/user-common/footer";
import AgrihaLandingHeaderNoSearch from "../../components/user-common/header-ns";
import Head from "next/head";
import api_url from "../../src/utils/url";
import dummy_token from "../../src/utils/dummy_token";
import ProfilePopup from "../../components/user-common/profile-popup";
import OtpPopup from "../../components/user-common/otp-popup";
import RegisterPopup from "../../components/user-common/register-popup";
import LoginPopup from "../../components/user-common/login-popup";
import ArchitectSelectProfilePopup from "../../components/user-common/architect-profile-select-popup";
import UserArchitectAbout from "../../components/user-architect-about/main";
import SharePopup from "../../components/user-common/share-popup";

import styles from "./index.module.css";

const UserArchitectAboutMain = (props) => {
  const [Store] = useContext(StoreContext);

  const loginPopup = Store.loginPopup;
  const registerPopup = Store.registerPopup;
  const otpPopup = Store.otpPopup;
  const profilePopup = Store.profilePopup;
  const architectProfileSelectPopup = Store.architectProfileSelectPopup;
  const sharePopup = Store.sharePopup;
  // console.log(props);

  return (
    <>
      <Head>
        <title>
          {props?.data?.registered_id?.name
            ? props?.data?.registered_id?.name
            : props?.data?.firstname + " " + props?.data?.lastname}{" "}
          | Agriha
        </title>
        <meta name="description" content={`Architect at ${props?.data?.companyname}  | Agriha`} />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:title"
          content={`${
            props?.data?.registered_id?.name
              ? props?.data?.registered_id?.name
              : props?.data?.firstname + " " + props?.data?.lastname
          } | Agriha`}
        />
        <meta property="og:description" content={`Architect at ${props?.data?.companyname}  | Agriha`} />
        <meta property="og:image" content={props?.data?.profilepic} />
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

export async function getServerSideProps(context) {
  const { params } = context;
  const id = params.id;

  // Fetch data from external API
  const res = await fetch(`${api_url}/architects/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${dummy_token}`,
    },
  });
  const data = await res.json();

  return { props: { data } };
}

export default UserArchitectAboutMain;
