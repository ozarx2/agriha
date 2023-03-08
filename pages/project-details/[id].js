import Head from "next/head";
import React, { useState, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import api_url from "../../src/utils/url";
import AgrihaLandingHeaderNoSearch from "../../components/user-common/header-ns";
import AgrihaProjectDetailsMain from "../../components/project-details/main";
import LandingFooter from "../../components/user-common/footer";
import LoginPopup from "../../components/user-common/login-popup";
import RegisterPopup from "../../components/user-common/register-popup";
import OtpPopup from "../../components/user-common/otp-popup";
import ArchitectSelectPopup from "../../components/user-common/architect-select-popup";
import ArchitectBidPopup from "../../components/user-common/architect-bid-popup";
import ProfilePopup from "../../components/user-common/profile-popup";

import styles from "./index.module.css";

const AgrihaProjectDetails = (props) => {
  // export default function AgrihaProjectDetails() {
  const [Store] = useContext(StoreContext);

  const loginPopup = Store.loginPopup;
  const registerPopup = Store.registerPopup;
  const otpPopup = Store.otpPopup;
  const architectSelectPopup = Store.architectSelectPopup;
  const architectBidPopup = Store.architectBidPopup;
  const profilePopup = Store.profilePopup;

  const data = props.data[0];

  return (
    <>
      <Head>
        <title>{data?.projectname} | Agriha</title>
        <meta
          name="description"
          content={`Agriha ${data?.project_type} project at ${data?.location} with ${data?.projectarea}sq.ft | Agriha`}
        />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={`${data?.projectname} | Agriha`} />
        <meta
          property="og:description"
          content={`Agriha ${data?.project_type} project at ${data?.location} with ${data?.projectarea}sq.ft | Agriha`}
        />
        <meta property="og:image" content={data?.thumbnail} />
      </Head>
      <div>
        <div className={styles.container_outer}>
          <div className={styles.container_inner}>
            <div className={styles.header}>
              <AgrihaLandingHeaderNoSearch />
            </div>
            <div className={styles.main}>
              <AgrihaProjectDetailsMain />
            </div>
            <div className={styles.footer}>
              <LandingFooter />
            </div>
          </div>
        </div>
        {loginPopup ? <LoginPopup /> : ""}
        {registerPopup ? <RegisterPopup /> : ""}
        {otpPopup ? <OtpPopup /> : ""}
        {architectSelectPopup ? <ArchitectSelectPopup /> : ""}
        {architectBidPopup ? <ArchitectBidPopup /> : ""}
        {profilePopup ? <ProfilePopup /> : ""}
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const id = params.id;

  // Fetch data from external API
  const res = await fetch(`${api_url}/projects/arcprojectsingle/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  const data = await res.json();

  return { props: { data } };
}

export default AgrihaProjectDetails;
