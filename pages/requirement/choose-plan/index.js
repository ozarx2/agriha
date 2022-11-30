import React from "react";
import Head from "next/head";
import ChoosePlanMain from "../../../components/requirements/ChoosePlanMain";
import AgrihaLandingHeaderNoSearch from "../../../components/user-common/header-ns";

import styles from "./index.module.css";

const ChoosePlan = () => {
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
              <ChoosePlanMain />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChoosePlan;
