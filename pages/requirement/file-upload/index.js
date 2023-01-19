import { useRouter } from "next/router";
import React, { useEffect, useContext } from "react";
import { StoreContext } from "../../../components/StoreContext";
import Head from "next/head";
import FileUploadMain from "../../../components/requirements/FileUploadMain";
import AgrihaLandingHeaderNoSearch from "../../../components/user-common/header-ns";
import ProfilePopup from "../../../components/user-common/profile-popup";
import SentRequirementPopup from "../../../components/requirements/sent-requirement-popup";

import styles from "./index.module.css";

const FileUpload = () => {
  const [Store] = useContext(StoreContext);

  const profilePopup = Store.profilePopup;
  const requirementPopup = Store.requirementPopup;

  const router = useRouter();
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
    } else {
      router.push("/");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Choose-Plan - Agriha</title>
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
              <FileUploadMain />
            </div>
          </div>
        </div>
      </div>
      {requirementPopup ? <SentRequirementPopup /> : ""}
      {profilePopup ? <ProfilePopup /> : ""}
    </>
  );
};

export default FileUpload;
