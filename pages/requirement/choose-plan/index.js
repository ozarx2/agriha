import React from "react";
import Head from "next/head";
import styles from "./index.module.css";
import ChoosePlanMain from "../../../components/requirements/ChoosePlanMain";
import Header from "../../../components/requirements/Header";

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
              <Header />
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
