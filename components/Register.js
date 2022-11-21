/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import registerstyles from "../styles/BodyRegister.module.css";
import styles from "../styles/Header.module.css";
import Image from "next/image";
import Link from "next/link";
import PulseLoader from "react-spinners/PulseLoader";
import endpoint from "../src/utils/endpoint";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  console.log(endpoint);

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
    localStorage.setItem("role", "user");
    handleSubmit("user");
  };

  const sendOTPClickArchitect = () => {
    localStorage.setItem("role", "architect");
    handleSubmit("architect");
  };

  async function handleSubmit(role) {
    if (name !== "" && email != "" && phone.length == 10) {
      if (role === "user") {
        console.log("role is user");

        document.getElementById("loaderSentOtpRegister").style.display =
          "block";
        document.getElementById("sentOTPRegister").style.display = "none";

        const res = await fetch(`${endpoint}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            phone: `+91${phone}`,
            role: role,
          }),
        });
        const data = await res.json();
        console.log(data);
        if (data.status === 200) {
          localStorage.setItem("token", data.token);
          window.location.href = "/verifyotp";
        }
        if (data.status === 409) {
          document.getElementById("loaderSentOtpRegister").style.display =
            "none";
          document.getElementById("sentOTPRegister").style.display = "block";
          document.getElementById("errorMobile").style.display = "block";
        }
      } else if (role === "architect") {
        console.log("role is architect");

        document.getElementById(
          "loaderSentOtpRegisterArchitect"
        ).style.display = "block";
        document.getElementById("sentOTPRegisterArchitect").style.display =
          "none";

        const res = await fetch(`${endpoint}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            phone: `+91${phone}`,
            role: role,
          }),
        });
        const data = await res.json();
        console.log(data);
        if (data.status === 200) {
          localStorage.setItem("token", data.token);
          window.location.href = "/verifyotp";
        }
        if (data.status === 409) {
          document.getElementById(
            "loaderSentOtpRegisterArchitect"
          ).style.display = "none";
          document.getElementById("sentOTPRegisterArchitect").style.display =
            "block";
          document.getElementById("errorMobile").style.display = "block";
        }
      }
    } else {
      alert("must fill all fields");
    }
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
          <h5 className={registerstyles.termsAccept}>
            By signing up, I agree to Agriha's <a href="terms">Terms of Use</a>{" "}
            and <a href="privacypolicy">Privacy Policy.</a>
          </h5>
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
              <p id="sentOTPRegister">Register</p>
            </div>

            <div
              id="submitButton_architect"
              onClick={sendOTPClickArchitect}
              className={registerstyles.register__button__form}
            >
              <div
                className={registerstyles.loader__container__register}
                id="loaderSentOtpRegisterArchitect"
              >
                <PulseLoader color="#ffffff" />
              </div>
              <p id="sentOTPRegisterArchitect">Register as Architect</p>
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

export default Register;
