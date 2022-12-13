import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Head from "next/head";
import SecondaryDetailsMain from "../../../components/requirements/SecondaryDetailsMain";
import AgrihaLandingHeaderNoSearch from "../../../components/user-common/header-ns";

import styles from "./index.module.css";

const SecondaryDetails = () => {
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
        <title>Secondary-details - Agriha</title>
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
              <SecondaryDetailsMain />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecondaryDetails;
