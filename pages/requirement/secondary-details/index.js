import React from "react";
import Head from "next/head";
import styles from "./index.module.css";
import SecondaryDetailsMain from "../../../components/requirements/SecondaryDetailsMain";
import Header from "../../../components/requirements/Header";

const SecondaryDetails = () => {
  return (
    <>
      <Head>
        <title>Secondary-details - Agriha</title>
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
              <SecondaryDetailsMain />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecondaryDetails;
