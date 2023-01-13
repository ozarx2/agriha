/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useState, useEffect, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import endpoint from "../../src/utils/endpoint";
import LoginPopupForm from "./login-form";
import AgrihaGoogleLogin from "./google-login";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import axios from "axios";
import windowSize from "../windowRes";

import styles from "./login-popup.module.css";

export default function LoginPopup() {
  const [Store] = useContext(StoreContext);

  const setLoginPopup = Store.setLoginPopup;
  const setRegisterPopup = Store.setRegisterPopup;
  const otpPopup = Store.otpPopup;
  const userRole = Store.userRole;

  const windowRes = windowSize();

  function showSignup() {
    setRegisterPopup(true);
    setLoginPopup(false);
  }

  useEffect(() => {
    if (otpPopup) {
      document.getElementById("LoginPopupOuter").style.display = "none";
    } else {
      document.getElementById("LoginPopupOuter").style.display = "flex";
    }
  }, [otpPopup]);

  /* GOOGLE AUTH */
  async function handleSubmit(name, email, profile) {
    axios
      .post(`${endpoint}/auth/google/Login`, {
        name: name,
        email: email,
        profilePic: profile,
        role: "user",
      })
      .then((response) => {
        // console.log(response.data);
        localStorage.setItem("token", response.data.token);
        if (response.data.message === "user login successfully") {
          window.location.href = "/dashboard";
        }
        if (response.data.message === "user registeration successfully") {
          window.location.href = "/requirement/basic-details";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div id="LoginPopupOuter" className={styles.LoginPopupOuter}>
        <div onClick={() => setLoginPopup(false)} className={styles.LoginPopupClose}></div>
        <div className={styles.LoginPopupInner}>
          {windowRes.innerWidth >= 767 ? (
            <div className={styles.desktop_header}>
              <div className={styles.header_inner}>
                <div onClick={() => setLoginPopup(false)} className={styles.left}>
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
              <div className={`container ${styles.container} ${styles.header_container}`}>
                <div className={styles.header_inner}>
                  <div className={styles.left}>
                    <picture>
                      <img src="/img/landing/logo.svg" alt="logo" />
                    </picture>
                  </div>
                  <div className={styles.right}>{/* <div>Architect Sign in/up</div> */}</div>
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
                      <div className={styles.textone}>{userRole === "user" ? "HomeSeeker" : "Architect"} Log in</div>
                      <div className={styles.texttwo}>OTP will be sent via sms to your Mobile Number</div>
                    </div>
                  </div>
                  <LoginPopupForm />
                </div>
              </div>
              <div className={styles.sthree_full}>
                <div className={styles.line}></div>
                <div className={styles.or}>OR</div>
              </div>
              <div className={styles.desktop_content_outer}>
                <div className={styles.content_inner}>
                  <div className={styles.sfour}>
                    <GoogleLogin
                      width="340px"
                      onSuccess={(credentialResponse) => {
                        console.log(credentialResponse);
                        var decoded = jwt_decode(credentialResponse.credential);
                        console.log(decoded);
                        handleSubmit(decoded.name, decoded.email, decoded.picture);
                      }}
                      onError={() => {
                        console.log("Login Failed");
                      }}
                      useOneTap
                    />
                  </div>
                  <div className={styles.sfive}>
                    <div className={styles.signup}>
                      Not on Agriha services yet?{" "}
                      <span onClick={() => showSignup()}>
                        {userRole === "user" ? "HomeSeeker" : "Architect"} Sign up
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.content_outer}>
              <div className={`container ${styles.container} ${styles.content}`}>
                <div className={styles.content_inner}>
                  <div className={styles.sone}>
                    <div onClick={() => setLoginPopup(false)} className={styles.back}>
                      <img src="/img/project-details/back.svg" alt="back" />
                    </div>
                    <div className={styles.text}>
                      <div className={styles.textone}>{userRole === "user" ? "HomeSeeker" : "Architect"} Log in</div>
                      <div className={styles.texttwo}>OTP will be sent via sms to your Mobile Number</div>
                    </div>
                  </div>
                  <LoginPopupForm />
                  <div className={styles.sthree}>
                    <div className={styles.line}></div>
                    <div className={styles.or}>OR</div>
                  </div>
                  <div className={styles.sfour}>
                    {/* <div className={styles.google}>
                      <img src="/img/landing/google.svg" alt="google" />
                      <span>Continue with Google</span>
                    </div> */}
                    <GoogleLogin
                      onSuccess={(credentialResponse) => {
                        // console.log(credentialResponse);
                        var decoded = jwt_decode(credentialResponse.credential);
                        // console.log(decoded);
                        handleSubmit(decoded.name, decoded.email, decoded.picture);
                      }}
                      onError={() => {
                        console.log("Login Failed");
                      }}
                    />
                    {/* <AgrihaGoogleLogin onClick={() => OurGoogleLogin()} /> */}
                  </div>
                  <div className={styles.sfive}>
                    <div className={styles.signup}>
                      Not on Agriha services yet?{" "}
                      <span onClick={() => showSignup()}>
                        {userRole === "user" ? "HomeSeeker" : "Architect"} Sign up
                      </span>
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
