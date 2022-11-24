/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";

import styles from "./google-login.module.css";

export default function AgrihaGoogleLogin() {
  return (
    <>
      <div className={styles.google}>
        <img src="/img/landing/google.svg" alt="google" />
        <span>Continue with Google</span>
      </div>
    </>
  );
}
