/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useState, useEffect, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import styles from "./otp-popup.module.css";

export default function OtpPopup() {
  const [Store] = useContext(StoreContext);

  const loginPopup = Store.loginPopup;
  const registerPopup = Store.registerPopup;
  const setLoginPopup = Store.setLoginPopup;
  const setRegisterPopup = Store.setRegisterPopup;
  const setOtpPopup = Store.setOtpPopup;

  const [otpLength, setOtpLength] = useState(6);
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

  var w = document.getElementById("w"),
    x = document.getElementById("x"),
    y = document.getElementById("y"),
    z = document.getElementById("z"),
    a = document.getElementById("a"),
    b = document.getElementById("b"),
    c = document.getElementById("c"),
    d = document.getElementById("d"),
    e = document.getElementById("e"),
    f = document.getElementById("f");
  function OtpNextActive(bid, cid, nid) {
    if (cid.value.length === parseInt(cid.attributes["maxlength"].value)) {
      nid.focus();
    }
    if (cid.value.length === 0) {
      bid.focus();
    }
  }

  const [counter, setCounter] = React.useState(300);
  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);
  const dateObj = new Date(counter * 1000);
  const utcString = dateObj.toUTCString();
  const time = utcString.slice(-11, -4);

  return (
    <>
      <div className={styles.OtpPopupOuter}>
        <div
          onClick={() => setOtpPopup(false)}
          className={styles.OtpPopupClose}
        ></div>
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
                      <div className={styles.textone}>Verification</div>
                      <div className={styles.texttwo}>
                        OTP code we just send to your mobile number
                      </div>
                    </div>
                  </div>
                  <div className={styles.stwo}>
                    {otpLength == 4 ? (
                      <div className={styles.fourOtp}>
                        <input
                          id="w"
                          type="text"
                          maxLength="1"
                          onChange={() => OtpNextActive(w, w, x)}
                        />
                        <input
                          id="x"
                          type="text"
                          maxLength="1"
                          onChange={() => OtpNextActive(w, x, y)}
                        />
                        <input
                          id="y"
                          type="text"
                          maxLength="1"
                          onChange={() => OtpNextActive(x, y, z)}
                        />
                        <input
                          id="z"
                          type="text"
                          maxLength="1"
                          onChange={() => OtpNextActive(y, z, z)}
                        />
                      </div>
                    ) : otpLength == 6 ? (
                      <div className={styles.sixOtp}>
                        <input
                          id="a"
                          type="text"
                          maxLength="1"
                          onChange={() => OtpNextActive(a, a, b)}
                        />
                        <input
                          id="b"
                          type="text"
                          maxLength="1"
                          onChange={() => OtpNextActive(a, b, c)}
                        />
                        <input
                          id="c"
                          type="text"
                          maxLength="1"
                          onChange={() => OtpNextActive(b, c, d)}
                        />
                        <input
                          id="d"
                          type="text"
                          maxLength="1"
                          onChange={() => OtpNextActive(c, d, e)}
                        />
                        <input
                          id="e"
                          type="text"
                          maxLength="1"
                          onChange={() => OtpNextActive(d, e, f)}
                        />
                        <input
                          id="f"
                          type="text"
                          maxLength="1"
                          onChange={() => OtpNextActive(e, f, f)}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    <div className={styles.additional}>
                      <div className={styles.resend}>
                        Dont receive the code ? <span>Resend</span>
                      </div>
                      <div className={styles.time}>{time}</div>
                    </div>
                    <div className={styles.submit}>Verify</div>
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
                      {loginPopup ? (
                        <div className={styles.signup}>
                          Not on Agriha services yet?{" "}
                          <span onClick={() => showLoginOrRegister()}>
                            Sign up
                          </span>
                        </div>
                      ) : registerPopup ? (
                        <div className={styles.signup}>
                          Already a member?{" "}
                          <span onClick={() => showLoginOrRegister()}>
                            Login
                          </span>
                        </div>
                      ) : (
                        <div className={styles.signup}>
                          Already a member?{" "}
                          <span onClick={() => showLoginOrRegister()}>
                            Login
                          </span>
                        </div>
                      )}
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
                      onClick={() => setOtpPopup(false)}
                      className={styles.back}
                    >
                      <img src="/img/project-details/back.svg" alt="back" />
                    </div>
                    <div className={styles.text}>
                      <div className={styles.textone}>Verification</div>
                      <div className={styles.texttwo}>
                        OTP code we just send to your mobile number
                      </div>
                    </div>
                  </div>
                  <div className={styles.stwo}>
                    {otpLength == 4 ? (
                      <div className={styles.fourOtp}>
                        <input
                          id="w"
                          type="text"
                          maxLength="1"
                          onChange={() => OtpNextActive(w, w, x)}
                        />
                        <input
                          id="x"
                          type="text"
                          maxLength="1"
                          onChange={() => OtpNextActive(w, x, y)}
                        />
                        <input
                          id="y"
                          type="text"
                          maxLength="1"
                          onChange={() => OtpNextActive(x, y, z)}
                        />
                        <input
                          id="z"
                          type="text"
                          maxLength="1"
                          onChange={() => OtpNextActive(y, z, z)}
                        />
                      </div>
                    ) : otpLength == 6 ? (
                      <div className={styles.sixOtp}>
                        <input
                          id="a"
                          type="text"
                          maxLength="1"
                          onChange={() => OtpNextActive(a, a, b)}
                        />
                        <input
                          id="b"
                          type="text"
                          maxLength="1"
                          onChange={() => OtpNextActive(a, b, c)}
                        />
                        <input
                          id="c"
                          type="text"
                          maxLength="1"
                          onChange={() => OtpNextActive(b, c, d)}
                        />
                        <input
                          id="d"
                          type="text"
                          maxLength="1"
                          onChange={() => OtpNextActive(c, d, e)}
                        />
                        <input
                          id="e"
                          type="text"
                          maxLength="1"
                          onChange={() => OtpNextActive(d, e, f)}
                        />
                        <input
                          id="f"
                          type="text"
                          maxLength="1"
                          onChange={() => OtpNextActive(e, f, f)}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    <div className={styles.additional}>
                      <div className={styles.resend}>
                        Dont receive the code ? <span>Resend</span>
                      </div>
                      <div className={styles.time}>{time}</div>
                    </div>
                    <div className={styles.submit}>Verify</div>
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
                    {loginPopup ? (
                      <div className={styles.signup}>
                        Not on Agriha services yet?{" "}
                        <span onClick={() => showLoginOrRegister()}>
                          Sign up
                        </span>
                      </div>
                    ) : registerPopup ? (
                      <div className={styles.signup}>
                        Already a member?{" "}
                        <span onClick={() => showLoginOrRegister()}>Login</span>
                      </div>
                    ) : (
                      <div className={styles.signup}>
                        Already a member?{" "}
                        <span onClick={() => showLoginOrRegister()}>Login</span>
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
