import React, { useEffect, useState } from "react";
import registerstyles from "../styles/BodyRegister.module.css";
import styles from "../styles/Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { PulseLoader } from "react-spinners";
import endpoint from "../src/utils/endpoint";

const BodyLogin = () => {
  const [isdetails, setIsdetails] = useState(false);
  const [phone, setphone] = useState("");

  async function handleSubmit() {
    document.getElementById("loaderSentOtpRegister").style.display = "block";
    document.getElementById("sentOTPRegister").style.display = "none";

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
      document.getElementById("loaderSentOtpRegister").style.display = "none";
      document.getElementById("sentOTPRegister").style.display = "block";
      window.location.href = "/verifyotplogin";
    }
    if (data.status === 409) {
      document.getElementById("loaderSentOtpRegister").style.display = "none";
      document.getElementById("sentOTPRegister").style.display = "block";
      document.getElementById("errorMobile").style.display = "block";
      document.getElementById("errorMobile").innerHTML =
        "OTP session found. Try after 5 minutes.";
    }
    if (data.status === 404) {
      document.getElementById("loaderSentOtpRegister").style.display = "none";
      document.getElementById("sentOTPRegister").style.display = "block";
      document.getElementById("errorMobile").style.display = "block";
    }
  }

  useEffect(() => {
    if (phone !== "") {
      let isnum = /^\d+$/.test(phone);
      if (phone.length == 10) {
        if (isnum) {
          setIsdetails(true);
        } else {
          setIsdetails(false);
        }
      } else {
        setIsdetails(false);
      }
    }
  }, [phone]);

  const storeValues = () => {
    setphone(document.getElementById("phone").value);
  };

  const loginClick = () => {
    if (phone === "") {
      setIsdetails(false);
      document.getElementById("errorMobile").style.display = "block";
      document.getElementById("errorMobile").innerHTML =
        "Mobile phone required";
    } else {
      let isnum = /^\d+$/.test(phone);
      if (phone.length == 10) {
        if (isnum) {
          document.getElementById("errorMobile").style.display = "none";
        } else {
          document.getElementById("errorMobile").style.display = "block";
          document.getElementById("errorMobile").innerHTML =
            "Enter a valid Mobile phone";
        }
      } else {
        document.getElementById("errorMobile").style.display = "block";
        document.getElementById("errorMobile").innerHTML =
          "Enter a valid Mobile phone";
      }
      if (isdetails) {
        handleSubmit();
      }
    }
  };

  useEffect(() => {
    var input = document.getElementById("phone");
    input.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("loginButton").click();
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
          <Link href="/register" passHref>
            <p className={styles.loginButton__header}>REGISTER</p>
          </Link>
          {/* <div className={styles.header__menu__container}>
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
          <h2>Login</h2>
          <p>Login to find your home Plan</p>
          <div className={registerstyles.loginArchitect}>
            <Link href="/architect/login">LOGIN AS ARCHITECT</Link>
          </div>
          <form autoComplete="off" className={registerstyles.form} action="">
            <fieldset className={registerstyles.input__container}>
              <legend>Mobile phone*</legend>
              <div className={registerstyles.input__box}>
                <input onChange={storeValues} id="phone" type="text" />
              </div>
            </fieldset>
            <p id="errorMobile" className={registerstyles.error__varifyOtp}>
              Mobile Number not registered.
            </p>
            <div
              id="loginButton"
              onClick={loginClick}
              className={registerstyles.register__button__form}
            >
              <div
                className={registerstyles.loader__container__register}
                id="loaderSentOtpRegister"
              >
                <PulseLoader color="#ffffff" />
              </div>
              <p id="sentOTPRegister">SEND OTP</p>
            </div>
          </form>
          <div className={registerstyles.alreadyRegistered__container}>
            <p className={registerstyles.alreadyRegisterd}>not registered ? </p>
            <Link href="/register" passHref>
              <p className={registerstyles.login__AlreadyRegisterd}>Register</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyLogin;
