import React, { useEffect } from "react";
import Head from "next/head";
import FileUploadMain from "../../../components/requirements/FileUploadMain";
import AgrihaLandingHeaderNoSearch from "../../../components/user-common/header-ns";

import styles from "./index.module.css";

const ChoosePlan = () => {
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
    } else {
      window.location.href = "/";
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
    </>
  );
};

export default ChoosePlan;
