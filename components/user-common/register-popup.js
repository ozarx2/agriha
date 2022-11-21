/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import React, { useRef, useState, useEffect, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import endpoint from "../../src/utils/endpoint";
import styles from "./register-popup.module.css";

export default function RegisterPopup() {
  const [Store] = useContext(StoreContext);

  const setLoginPopup = Store.setLoginPopup;
  const setRegisterPopup = Store.setRegisterPopup;
  const setOtpPopup = Store.setOtpPopup;

  const [windowRes, setWindowRes] = useState([]);
  if (typeof window !== "undefined") {
    const [windowSize, setWindowSize] = useState(getWindowSize());
    function getWindowSize() {
      const innerWidth = window.innerWidth;
      const innerHeight = window.innerHeight;
      return { innerWidth, innerHeight };
    }
    useEffect(() => {
      function handleWindowResize() {
        setWindowSize(getWindowSize());
        setWindowRes(getWindowSize());
      }
      setWindowRes(getWindowSize());
      window.addEventListener("resize", handleWindowResize);
      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    }, []);
  }

  function showLogin() {
    setRegisterPopup(false);
    setLoginPopup(true);
  }
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
    var phone = `+91${phone}`;
    console.log(phone);
    axios
      .post(`${endpoint}/auth/register`, {
        name: name,
        phone: phone,
        email: email,
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

  const termsClick = () => {
    window.location.href = "/terms";
  };

  const policyClick = () => {
    window.location.href = "/privacypolicy";
  };

  return (
    <>
      <div className={styles.RegisterPopupOuter}>
        <div
          onClick={() => setRegisterPopup(false)}
          className={styles.RegisterPopupClose}
        ></div>
        <div className={styles.RegisterPopupInner}>
          {windowRes.innerWidth >= 767 ? (
            <div className={styles.desktop_header}>
              <div className={styles.header_inner}>
                <div
                  onClick={() => setRegisterPopup(false)}
                  className={styles.left}
                >
                  <picture>
                    <img src="/img/landing/header-close.svg" alt="close" />
                  </picture>
                </div>
                <div className={styles.center}>
                  <span>Welcome to</span>
                  <picture>
                    <img src="/img/landing/logo.svg" alt="logo" />
                  </picture>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.header}>
              <div
                className={`container ${styles.container} ${styles.header_container}`}
              >
                <div className={styles.header_inner}>
                  <div className={styles.left}>
                    <picture>
                      <img src="/img/landing/logo.svg" alt="logo" />
                    </picture>
                  </div>
                  <div className={styles.right}>
                    <div>Architect Sign in/up</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {windowRes.innerWidth >= 767 ? (
            <>
              <div className={styles.desktop_content_outer}>
                <div className={styles.content_inner}>
                  <div className={styles.sone}>
                    <div className={styles.text}>
                      <div className={styles.textone}>Registraion</div>
                      <div className={styles.texttwo}>
                        OTP will be sent via sms to your Mobile Number
                      </div>
                    </div>
                  </div>
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
                </div>
              </div>
              <div className={styles.sthree_full}>
                <div className={styles.line}></div>
                <div className={styles.or}>OR</div>
              </div>
              <div className={styles.desktop_content_outer}>
                <div className={styles.content_inner}>
                  <div className={styles.sfour}>
                    <div className={styles.google}>
                      <img src="/img/landing/google.svg" alt="google" />
                      <span>Continue with Google</span>
                    </div>
                  </div>
                  <div className={styles.sfive}>
                    <div className={styles.signup}>
                      Already a member?{" "}
                      <span onClick={() => showLogin()}>Login</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.content_outer}>
              <div
                className={`container ${styles.container} ${styles.content}`}
              >
                <div className={styles.content_inner}>
                  <div className={styles.sone}>
                    <div
                      onClick={() => setRegisterPopup(false)}
                      className={styles.back}
                    >
                      <img src="/img/project-details/back.svg" alt="back" />
                    </div>
                    <div className={styles.text}>
                      <div className={styles.textone}>Registraion</div>
                      <div className={styles.texttwo}>
                        OTP will be sent via sms to your Mobile Number
                      </div>
                    </div>
                  </div>
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
                      <span>Terms of Service</span> and{" "}
                      <span>Privacy policy</span>.
                    </div>
                    <div onClick={() => showOtp()} className={styles.submit}>
                      Send OTP
                    </div>
                  </div>
                  <div className={styles.sthree}>
                    <div className={styles.line}></div>
                    <div className={styles.or}>OR</div>
                  </div>
                  <div className={styles.sfour}>
                    <div className={styles.google}>
                      <img src="/img/landing/google.svg" alt="google" />
                      <span>Continue with Google</span>
                    </div>
                  </div>
                  <div className={styles.sfive}>
                    <div className={styles.signup}>
                      Already a member?{" "}
                      <span onClick={() => showLogin()}>Login</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
