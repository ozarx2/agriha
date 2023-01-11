/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import endpoint from "../../src/utils/endpoint";

import styles from "./register-popup.module.css";

export default function RegisterPopupForm() {
  const [Store] = useContext(StoreContext);

  const userRole = Store.userRole;
  const setFromLoginOrRegister = Store.setFromLoginOrRegister;
  const setRegisterPopup = Store.setRegisterPopup;
  const setOtpPopup = Store.setOtpPopup;
  const setBid = Store.setBid;
  const setLoginActive = Store.setLoginActive;
  const setUserId = Store.setUserId;
  const setLoginPopup = Store.setLoginPopup;

  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("Must fill all data");

  const termsClick = () => {
    window.location.href = "/terms";
  };

  const policyClick = () => {
    window.location.href = "/privacypolicy";
  };

  const [name, setName] = useState("");
  const [code, setCode] = useState("91");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  function showOtp() {
    if (name !== "" && phone !== "" && email !== "") {
      setLoading(true);
      sendOTPClick();
    } else {
      setIsError(true);
    }
  }

  const storeValues = (event) => {
    if (event.target.name === "name") {
      const result = event.target.value.replace(/[^a-z\s]/gi, "");
      setName(result);
    }
    if (event.target.name === "phone") {
      const phone = event.target.value.replace(/\D/g, "");
      setPhone(phone);
    }
    if (event.target.name === "email") {
      setEmail(event.target.value);
    }
  };

  const sendOTPClick = () => {
    if (!name == "" && !email == "" && phone.length == 10) {
      handleSubmit();
    } else {
      console.log("error");
    }
  };

  /* REGISTER API */
  async function handleSubmit() {
    // console.log(phone);
    axios
      .post(`${endpoint}/auth/register`, {
        // .post(`${endpoint}/auth/test/register`, {
        name: name,
        phone: `+${code}${phone}`,
        email: email,
        role: userRole,
      })
      .then((response) => {
        // console.log(response.data);
        setLoading(false);
        if (response.data.status === 200) {
          setFromLoginOrRegister("register");
          setOtpPopup(true);
          setRegisterPopup(false);
          localStorage.setItem("token", response.data.token);

          // dummy login start

          // setUserId(response.data.id);
          // setLoginActive(true);
          // setOtpPopup(false);
          // setLoginPopup(false);
          // setRegisterPopup(false);
          // localStorage.setItem("userId", response.data.id);
          // localStorage.setItem("userToken", response.data.token);
          // localStorage.setItem("userRole", response.data.role);
          // if (response.data.role === "user") {
          //   setBid(true);
          //   window.location.href = "/requirement/basic-details";
          // } else if (response.data.role === "architect") {
          //   window.location.href = `/architect-dashboard/${response.data.id}`;
          // }

          // dummy login end
        } else {
          setIsError(true);
          setError(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (document.getElementById("name")) {
      document.getElementById("name").focus();
    }
  }, []);

  return (
    <>
      <div className={styles.stwo}>
        <input type="text" onChange={storeValues} id="name" name="name" maxLength={24} placeholder="Enter Full name" />
        <div className={styles.phone_feild}>
          <PhoneInput country={"in"} value={code} onChange={(phone) => setCode(phone)} />
          <input
            type="tel"
            onChange={storeValues}
            id="phone"
            name="phone"
            maxLength={10}
            placeholder="Enter Mobile number"
          />
        </div>
        <input type="email" onChange={storeValues} id="email" name="email" maxLength={40} placeholder="Email address" />
        {isError ? <p>{error}</p> : ""}
        <div className={styles.privacy}>
          By continuing you agree to Arclif&apos;s <span onClick={termsClick}>Terms of Service</span> and{" "}
          <span onClick={policyClick}>Privacy policy</span>.
        </div>
        {loading ? (
          <div onClick={() => showOtp()} className={styles.submit}>
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
