/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import React, { useState, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import endpoint from "../../src/utils/endpoint";
import styles from "./register-popup.module.css";

export default function RegisterPopupForm() {
  const [Store] = useContext(StoreContext);

  const setOtpPopup = Store.setOtpPopup;

  const termsClick = () => {
    window.location.href = "/terms";
  };

  const policyClick = () => {
    window.location.href = "/privacypolicy";
  };

  function showOtp() {
    sendOTPClick();
  }

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

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

  async function handleSubmit() {
    console.log(phone);
    axios
      .post(`${endpoint}/auth/register`, {
        name: name,
        phone: `+91${phone}`,
        email: email,
        role: "user",
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === 200) {
          localStorage.setItem("token", response.data.token);
          /* window.location.href = "/verifyotp"; */
          setOtpPopup(true);
          // setRegisterPopup(false);
        }
        if (response.data.status === 409) {
          /* document.getElementById("loaderSentOtpRegister").style.display =
            "none";
          document.getElementById("sentOTPRegister").style.display = "block";
          document.getElementById("errorMobile").style.display = "block"; */
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <div className={styles.stwo}>
        <input
          type="text"
          onChange={storeValues}
          id="name"
          name="name"
          maxLength={24}
          placeholder="Enter Full name"
        />
        <input
          type="tel"
          onChange={storeValues}
          id="phone"
          name="phone"
          maxLength={10}
          placeholder="Enter Mobile number"
        />
        <input
          type="email"
          onChange={storeValues}
          id="email"
          name="email"
          maxLength={40}
          placeholder="Email address"
        />
        <div className={styles.privacy}>
          By continuing you agree to Arclifs{" "}
          <span onClick={termsClick}>Terms of Service</span> and{" "}
          <span onClick={policyClick}>Privacy policy</span>.
        </div>
        <div onClick={() => showOtp()} className={styles.submit}>
          Send OTP
        </div>
      </div>
    </>
  );
}
