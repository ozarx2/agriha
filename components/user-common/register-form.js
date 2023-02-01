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
  const [showOtpText, setShowOtpText] = useState(false);
  const [resentLoading, setResentLoading] = useState(false);

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
      var email = event.target.value;
      var validMail = email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      if (validMail?.[0] !== undefined) {
        setEmail(validMail?.[0]);
      }
    }
  };

  /* REGISTER API */
  async function handleSubmit() {
    // console.log(phone);
    const rc = localStorage.getItem("rc");
    const ru = localStorage.getItem("ru");
    axios
      .post(`${endpoint}/auth/register`, {
        name: name,
        phone: `+${code}${phone}`,
        email: email,
        role: userRole,
      })
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        if (response.data.status === 200) {
          setFromLoginOrRegister("register");
          setOtpPopup(true);
          setRegisterPopup(false);
          localStorage.setItem("token", response.data.otpToken);
        } else if (response.data.message === "Please try resent otp option") {
          setShowOtpText(true);
          setError(false);
        } else {
          setIsError(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const sendOTPClick = () => {
    if (!name == "" && !email == "" && phone.length == 10) {
      handleSubmit();
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    if (document.getElementById("name")) {
      document.getElementById("name").focus();
    }
  }, []);

  async function resentOTP() {
    const res = await fetch(`${endpoint}/auth/resent_otp`, {
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
    console.log(data);
    if (data.status === 200) {
      setFromLoginOrRegister("register");
      setOtpPopup(true);
      setRegisterPopup(false);
      localStorage.setItem("token", response.data.otpToken);
    }
  }

  const registerClick = () => {
    setResentLoading(true);
    resentOTP();
  };

  return (
    <>
      <div className={styles.stwo}>
        <input type="text" onChange={storeValues} id="name" name="name" maxLength={40} placeholder="Enter Full name" />
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
        {showOtpText ? (
          <h5>
            OTP verification not completed on Register!{" "}
            {resentLoading ? <PulseLoader size={7} color="#4c0ad6" /> : <span onClick={registerClick}>Resent OTP</span>}
          </h5>
        ) : (
          ""
        )}
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
