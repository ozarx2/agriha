/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useState, useEffect, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import OtpPopupForm from "./otp-form";
import styles from "./otp-popup.module.css";

export default function OtpPopup() {
  const [Store] = useContext(StoreContext);

  const loginPopup = Store.loginPopup;
  const registerPopup = Store.registerPopup;
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

  function showLoginOrRegister() {
    setOtpPopup(false);
  }

  return (
    <>
      <div id="OtpPopupOuter" className={styles.OtpPopupOuter}>
        <div onClick={() => setOtpPopup(false)} className={styles.OtpPopupClose}></div>
        <div className={styles.OtpPopupInner}>
          {windowRes.innerWidth >= 767 ? (
            <div className={styles.desktop_header}>
              <div className={styles.header_inner}>
                <div onClick={() => setOtpPopup(false)} className={styles.left}>
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
                      <div className={styles.textone}>Verification</div>
                      <div className={styles.texttwo}>OTP code we just send to your mobile number</div>
                    </div>
                  </div>
                  <OtpPopupForm />
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
                      {loginPopup ? (
                        <div className={styles.signup}>
                          Not on Agriha services yet? <span onClick={() => showLoginOrRegister()}>Sign up</span>
                        </div>
                      ) : registerPopup ? (
                        <div className={styles.signup}>
                          Already a member? <span onClick={() => showLoginOrRegister()}>Login</span>
                        </div>
                      ) : (
                        <div className={styles.signup}>
                          Already a member? <span onClick={() => showLoginOrRegister()}>Login</span>
                        </div>
                      )}
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
                    <div onClick={() => setOtpPopup(false)} className={styles.back}>
                      <img src="/img/project-details/back.svg" alt="back" />
                    </div>
                    <div className={styles.text}>
                      <div className={styles.textone}>Verification</div>
                      <div className={styles.texttwo}>OTP code we just send to your mobile number</div>
                    </div>
                  </div>
                  <OtpPopupForm />
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
                    {loginPopup ? (
                      <div className={styles.signup}>
                        Not on Agriha services yet? <span onClick={() => showLoginOrRegister()}>Sign up</span>
                      </div>
                    ) : registerPopup ? (
                      <div className={styles.signup}>
                        Already a member? <span onClick={() => showLoginOrRegister()}>Login</span>
                      </div>
                    ) : (
                      <div className={styles.signup}>
                        Already a member? <span onClick={() => showLoginOrRegister()}>Login</span>
                      </div>
                    )}
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
