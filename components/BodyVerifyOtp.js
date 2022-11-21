import React, { useEffect, useState } from "react";
import registerstyles from "../styles/BodyRegister.module.css";
import styles from "../styles/Header.module.css";
import Image from "next/image";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import endpoint from "../src/utils/endpoint";

axios.defaults.withCredentials = true;

const BodyVerifyOtp = () => {
  const [otp, setOtp] = useState("");

  const handleInput = (event) => {
    const otp = event.target.value.replace(/\D/g, "");
    setOtp(otp);
  };

  async function handleSubmit() {
    if (otp.length != 6) {
      document.getElementById("errorVarifyOtp").innerHTML = "Invalid OTP";
      document.getElementById("errorVarifyOtp").style.display = "block";
    } else {
      document.getElementById("loaderSentOtpRegister").style.display = "block";
      document.getElementById("sentOTPRegister").style.display = "none";
      const token = localStorage.getItem("token");

      const res = await fetch(`${endpoint}/auth/verify_mobile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + `${token}`,
        },
        body: JSON.stringify({
          otp: otp,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.status === 200) {
        if (data.role === "user") {
          localStorage.setItem("userToken", data.token);
          window.location.href = "/Selectproject";
        } else if (data.role === "architect") {
          localStorage.setItem("userToken", data.token);
          window.location.href = `/architect-dashboard#/${data.id}`;
        }
      }
    }
  }

  useEffect(() => {
    var input = document.getElementById("otp");
    input.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("verifyOTPButton").click();
      }
    });
  }, []);

  return (
    <div
      className={registerstyles.bodyRegister}
      style={{ backgroundImage: `url('/registerBg.jpg')` }}
    >
      <div className={registerstyles.header__bodyRegister}>
        <div className={styles.header__left}>
          <Image
            className={styles.header__logo}
            src="/agrihaLogo.svg"
            alt="agriha Logo"
            width={120}
            height={100}
          />
        </div>
        <div className={styles.header__right}>
          {/* <Link href="/sendotp" passHref>
            <p className={styles.registerButton__header}>Register Now</p>
          </Link>
          <Link href="/login" passHref>
            <p className={styles.loginButton__header}>LOGIN</p>
          </Link>
          <div className={styles.header__menu__container}>
            <Image
              className={styles.header__menu}
              src="/menuIcon.svg"
              alt=""
              width={30}
              height={20}
            />
          </div> */}
        </div>
      </div>
      <div className={registerstyles.content__bodyRegister}>
        <div className={registerstyles.image__container__bodyRegister}>
          {/* <Image src="/register.svg" alt="" width={300} height={350} /> */}
        </div>
        <div className={registerstyles.inputs__container__bodyRegister}>
          <h2>Verify OTP</h2>
          {/* <p>Enter OTP from mobile number</p> */}
          <form className={registerstyles.form} action="">
            <fieldset className={registerstyles.input__container}>
              <legend>Enter OTP</legend>
              <div className={registerstyles.input__box}>
                <input
                  onChange={handleInput}
                  id="otp"
                  value={otp}
                  name="otp"
                  maxLength={6}
                  type="text"
                />
              </div>
            </fieldset>
            <p id="errorVarifyOtp" className={registerstyles.error__varifyOtp}>
              Please enter OTP
            </p>
            <div
              id="verifyOTPButton"
              onClick={handleSubmit}
              className={registerstyles.register__button__form}
            >
              <div
                className={registerstyles.loader__container__register}
                id="loaderSentOtpRegister"
              >
                <PulseLoader color="#ffffff" />
              </div>
              <p id="sentOTPRegister">VERIFY & REGISTER</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BodyVerifyOtp;
