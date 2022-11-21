import React, { useState, useEffect } from "react";
import registerstyles from "../styles/BodyRegister.module.css";
import styles from "../styles/Header.module.css";
import Image from "next/image";
import Link from "next/link";
import PulseLoader from "react-spinners/PulseLoader";
import axios from "axios";
import endpoint from "../src/utils/endpoint";

const BodySendOtp = () => {
  const initialState = {
    name: "",
    email: "",
    phone: "",
    all: "",
  };
  const [userDta, setUserdta] = useState(initialState);
  const [isdetails, setIsdetails] = useState(false);
  const [error, setError] = useState(initialState);

  const storeValues = (event) => {
    if (event.target.name === "name") {
      const result = event.target.value.replace(/[^a-z\s]/gi, "");
      setUserdta({ ...userDta, [event.target.name]: result });
    }
    if (event.target.name === "phone") {
      const phone = event.target.value.replace(/\D/g, "");
      setUserdta({ ...userDta, [event.target.name]: phone });
    }
    if (event.target.name === "email") {
      setUserdta({ ...userDta, [event.target.name]: event.target.value });
    }
  };

  const sendOTPClick = () => {
    if (
      !userDta.name == "" &&
      !userDta.email == "" &&
      userDta.phone.length == 10
    ) {
      handleSubmit();
    } else {
      setError({ ...error, all: "Fill *all fields" });
    }
  };

  async function handleSubmit() {
    const userData = userDta;
    userData.phone = `+91${userData.phone}`;
    document.getElementById("loaderSentOtpRegister").style.display = "block";
    document.getElementById("sentOTPRegister").style.display = "none";
    axios
      .post(`${endpoint}/auth/register`, userData)
      .then((response) => {
        console.log(response.data);
        if (response.data.status === 200) {
          localStorage.setItem("token", response.data.token);
          window.location.href = "/verifyotp";
        }
        if (response.data.status === 409) {
          document.getElementById("loaderSentOtpRegister").style.display =
            "none";
          document.getElementById("sentOTPRegister").style.display = "block";
          document.getElementById("errorMobile").style.display = "block";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    var input = document.getElementById("phone");
    input.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("submitButton").click();
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
          <Link href="/login" passHref>
            <p className={styles.loginButton__header}>LOGIN</p>
          </Link>
        </div>
      </div>
      <div className={registerstyles.content__bodyRegister}>
        <div className={registerstyles.image__container__bodyRegister}></div>
        <div className={registerstyles.inputs__container__bodyRegister}>
          <h2>Register</h2>
          <p>Enter your Name, Email & Mobile Number</p>
          <form autoComplete="off" className={registerstyles.form}>
            <fieldset className={registerstyles.input__container}>
              <legend>Name*</legend>
              <div className={registerstyles.input__box}>
                <input
                  type="text"
                  onChange={storeValues}
                  id="name"
                  name="name"
                  maxLength={24}
                />
              </div>
            </fieldset>

            <fieldset className={registerstyles.input__container}>
              <legend>Email*</legend>
              <div className={registerstyles.input__box}>
                <input
                  type="email"
                  onChange={storeValues}
                  id="email"
                  name="email"
                  maxLength={40}
                />
              </div>
            </fieldset>
            <fieldset className={registerstyles.input__container}>
              <legend>Mobile Number*</legend>
              <div className={registerstyles.input__box}>
                <input
                  type="tel"
                  onChange={storeValues}
                  id="phone"
                  name="phone"
                  maxLength={10}
                />
              </div>
            </fieldset>
            <p className={registerstyles.errorText} id="errorMobile">
              Mobile or Email already exist
            </p>
            <div
              id="submitButton"
              onClick={sendOTPClick}
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
            <p className={registerstyles.alreadyRegisterd}>
              already registered ?{" "}
            </p>
            <Link href="/login" passHref>
              <p className={registerstyles.login__AlreadyRegisterd}>Login</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodySendOtp;
