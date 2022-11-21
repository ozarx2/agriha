/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useState, useEffect, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";

import styles from "./login-popup.module.css";

export default function LoginPopup() {
  const [Store] = useContext(StoreContext);

  const setLoginPopup = Store.setLoginPopup;
  const setRegisterPopup = Store.setRegisterPopup;
  const otpPopup = Store.otpPopup;
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

  function showSignup() {
    setRegisterPopup(true);
    setLoginPopup(false);
  }
  function showOtp() {
    setOtpPopup(true);
    // setLoginPopup(false);
  }

  useEffect(() => {
    if (otpPopup) {
      document.getElementById("LoginPopupOuter").style.display = "none";
    } else {
      document.getElementById("LoginPopupOuter").style.display = "flex";
    }
  }, [otpPopup]);

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
                      <div className={styles.textone}>Log in</div>
                      <div className={styles.texttwo}>OTP will be sent via sms to your Mobile Number</div>
                    </div>
                  </div>
                  <div className={styles.stwo}>
                    <input type="text" placeholder="Enter Mobile Number" />
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
                      Not on Agriha services yet? <span onClick={() => showSignup()}>Sign up</span>
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
                      <div className={styles.textone}>Log in</div>
                      <div className={styles.texttwo}>OTP will be sent via sms to your Mobile Number</div>
                    </div>
                  </div>
                  <div className={styles.stwo}>
                    <input type="text" placeholder="Enter Mobile Number" />
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
                      Not on Agriha services yet? <span onClick={() => showSignup()}>Sign up</span>
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
