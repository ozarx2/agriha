import React, { useState, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import endpoint from "../../src/utils/endpoint";

import styles from "./login-popup.module.css";

export default function LoginPopupForm() {
  const [Store] = useContext(StoreContext);

  const setOtpPopup = Store.setOtpPopup;
  const userRole = Store.userRole;
  const setLoginPopup = Store.setLoginPopup;
  const setFromLoginOrRegister = Store.setFromLoginOrRegister;
  const setLoginActive = Store.setLoginActive;
  const setUserId = Store.setUserId;
  const setRegisterPopup = Store.setRegisterPopup;
  const setBid = Store.setBid;

  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("Please enter Mobile Number");

  const [phone, setphone] = useState("");

  const storeValues = (e) => {
    setphone(e.target.value);
  };

  async function handleSubmit() {
    const res = await fetch(`${endpoint}/auth/mobile_login`, {
      // const res = await fetch(`${endpoint}/auth/test/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        phone: `+91${phone}`,
        role: userRole,
      }),
    });
    const data = await res.json();
    // console.log(data);
    if (data.status === 200) {
      setFromLoginOrRegister("login");
      setOtpPopup(true);
      setLoginPopup(false);
      localStorage.setItem("token", data.token);

      // dummy login start

      // setOtpPopup(false);
      // setLoginPopup(false);
      // setRegisterPopup(false);
      // localStorage.setItem("userToken", data.token);
      // localStorage.setItem("userId", data.id);
      // localStorage.setItem("userRole", data.role);
      // setUserId(data.id);
      // setLoginActive(true);
      // if (data.role === "user") {
      //   setBid(true);
      // } else if (data.role === "architect") {
      //   window.location.href = `/architect-dashboard/${data.id}`;
      // }

      // dummy login end
    } else {
      setIsError(true);
      setError(data.message);
    }
  }

  function showOtp() {
    if (phone !== "") {
      handleSubmit();
    } else {
      setIsError(true);
    }
  }

  return (
    <>
      <div className={styles.stwo}>
        <input type="tel" onChange={storeValues} placeholder="Enter Mobile Number" />
        {isError ? <p>{error}</p> : ""}
        <div onClick={() => showOtp()} className={styles.submit}>
          {/* Send OTP */}
          Login
        </div>
        <div></div>
      </div>
    </>
  );
}
