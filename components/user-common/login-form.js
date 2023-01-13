import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import { PulseLoader } from "react-spinners";
import endpoint from "../../src/utils/endpoint";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("Please enter Mobile Number");

  const [phone, setphone] = useState("");
  const [code, setCode] = useState("91");

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
        phone: `+${code}${phone}`,
        role: userRole,
      }),
    });
    const data = await res.json();
    // console.log(data);
    setLoading(false);
    if (data.status === 200) {
      setFromLoginOrRegister("login");
      setOtpPopup(true);
      setLoginPopup(false);
      localStorage.setItem("token", data.token);
    } else {
      setIsError(true);
      setError(data.message);
    }
  }

  function showOtp() {
    if (phone !== "") {
      setLoading(true);
      handleSubmit();
    } else {
      setIsError(true);
    }
  }

  useEffect(() => {
    if (document.getElementById("phone_no")) {
      document.getElementById("phone_no").focus();
    }
  }, []);

  return (
    <>
      <div className={styles.stwo}>
        <div className={styles.phone_feild}>
          <PhoneInput country={"in"} value={code} onChange={(phone) => setCode(phone)} />
          <input id="phone_no" type="tel" onChange={storeValues} placeholder="Enter Mobile Number" />
        </div>
        {isError ? <p>{error}</p> : ""}
        {loading ? (
          <div className={styles.submit}>
            <PulseLoader color="#ffffff" />
          </div>
        ) : (
          <div onClick={() => showOtp()} className={styles.submit}>
            Send OTP
          </div>
        )}
      </div>
    </>
  );
}
