import React, { useRef, useState, useEffect, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";

import styles from "./login-popup.module.css";

export default function LoginPopupForm() {
  const [Store] = useContext(StoreContext);

  const setOtpPopup = Store.setOtpPopup;

  function showOtp() {
    setOtpPopup(true);
  }
  return (
    <>
      <div className={styles.stwo}>
        <input type="text" placeholder="Enter Mobile Number" />
        <div onClick={() => showOtp()} className={styles.submit}>
          Send OTP
        </div>
      </div>
    </>
  );
}
