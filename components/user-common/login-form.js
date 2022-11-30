import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import endpoint from "../../src/utils/endpoint";

import styles from "./login-popup.module.css";

export default function LoginPopupForm() {
  const [Store] = useContext(StoreContext);

  const setOtpPopup = Store.setOtpPopup;
  const setLoginActive = Store.setLoginActive;

  const [phone, setphone] = useState("");

  const storeValues = (e) => {
    setphone(e.target.value);
  };

  async function handleSubmit() {
    const res = await fetch(`${endpoint}/auth/mobile_login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        phone: `+91${phone}`,
        role: "user",
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data.status === 200) {
      localStorage.setItem("token", data.token);
      setLoginActive(true);
      setOtpPopup(true);
    }
  }

  function showOtp() {
    handleSubmit();
  }

  return (
    <>
      <div className={styles.stwo}>
        <input type="tel" onChange={storeValues} placeholder="Enter Mobile Number" />
        <div onClick={() => showOtp()} className={styles.submit}>
          Send OTP
        </div>
      </div>
    </>
  );
}
