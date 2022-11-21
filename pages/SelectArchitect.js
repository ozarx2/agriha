import React from "react";
import Head from "next/head";
import styles from "../styles/pages.module.css";
import ChooseArchitect from "../components/ChooseArchitect";

function SelectArchitect() {
  /* if (typeof window !== "undefined") {
    console.log(typeof window);
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
      history.go(1);
    };
  } */

  return (
    <div className={styles.mainContainer}>
      <Head>
        <title>Choose Architect</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChooseArchitect />
    </div>
  );
}

export default SelectArchitect;
