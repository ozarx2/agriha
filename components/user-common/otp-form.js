import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { StoreContext } from "../../components/StoreContext";
import endpoint from "../../src/utils/endpoint";

import styles from "./otp-popup.module.css";

export default function OtpPopupForm() {
  const router = useRouter();

  const [Store] = useContext(StoreContext);

  const loginActive = Store.loginActive;
  const setBid = Store.setBid;
  const setOtpPopup = Store.setOtpPopup;
  const setLoginPopup = Store.setLoginPopup;
  const setRegisterPopup = Store.setRegisterPopup;
  const setLoginActive = Store.setLoginActive;
  const setUserId = Store.setUserId;
  const fromLoginOrRegister = Store.fromLoginOrRegister;

  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("Please enter Mobile Number");

  var a = document.getElementById("a"),
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

  /* VERIFY OTP Login */
  async function handleSubmitLogin(otp) {
    const token = localStorage.getItem("token");

    const res = await fetch(`${endpoint}/auth/verify_login`, {
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
    // console.log(data);
    if (data.status === 200) {
      setUserId(data.id);
      setLoginActive(true);
      localStorage.setItem("userToken", data.token);
      localStorage.setItem("userId", data.id);
      localStorage.setItem("userRole", data.role);
      if (data.role === "user") {
        setBid(true);
      } else if (data.role === "architect") {
        window.location.href = `/architect-dashboard/${data.id}`;
      }
      setLoginPopup(false);
      setRegisterPopup(false);
      setOtpPopup(false);
    } else {
      setIsError(true);
      setError(data.message);
    }
  }

  /* VERIFY OTP Register */
  async function handleSubmit(otp) {
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
    // console.log(data);
    if (data.status === 200) {
      setUserId(data.id);
      setLoginActive(true);

      localStorage.setItem("userId", data.id);
      localStorage.setItem("userToken", data.token);
      localStorage.setItem("userRole", data.role);
      if (data.role === "user") {
        setBid(true);
        window.location.href = "/requirement/basic-details";
      } else if (data.role === "architect") {
        window.location.href = `/architect-dashboard/${data.id}`;
      }
      setLoginPopup(false);
      setRegisterPopup(false);
      setOtpPopup(false);
    } else {
      setIsError(true);
      setError(data.message);
    }
  }

  const verifyClick = () => {
    if (a.value !== "") {
      handleSubmit(a.value + b.value + c.value + d.value + e.value + f.value);
    }
  };

  const verifyClickLogin = () => {
    if (a.value !== "") {
      handleSubmitLogin(a.value + b.value + c.value + d.value + e.value + f.value);
    }
  };

  return (
    <>
      <div className={styles.stwo}>
        <div className={styles.sixOtp}>
          <input id="a" type="tel" maxLength="1" onChange={() => OtpNextActive(a, a, b)} />
          <input id="b" type="tel" maxLength="1" onChange={() => OtpNextActive(a, b, c)} />
          <input id="c" type="tel" maxLength="1" onChange={() => OtpNextActive(b, c, d)} />
          <input id="d" type="tel" maxLength="1" onChange={() => OtpNextActive(c, d, e)} />
          <input id="e" type="tel" maxLength="1" onChange={() => OtpNextActive(d, e, f)} />
          <input id="f" type="tel" maxLength="1" onChange={() => OtpNextActive(e, f, f)} />
        </div>
        {isError ? <p>{error}</p> : ""}
        <div className={styles.additional}>
          <div className={styles.resend}>
            Don&apos;t receive the code ? <span>Resend</span>
          </div>
          <div className={styles.time}>{time}</div>
        </div>

        {counter === 0 ? (
          <div className={styles.submit} style={{ backgroundColor: "#ccc" }}>
            Time Exceeded
          </div>
        ) : (
          <>
            {fromLoginOrRegister == "login" ? (
              <div className={styles.submit} onClick={verifyClickLogin}>
                Verify
              </div>
            ) : (
              <div className={styles.submit} onClick={verifyClick}>
                Verify
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
