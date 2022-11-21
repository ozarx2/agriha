import React, { useRef, useState, useEffect, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";

import styles from "./otp-popup.module.css";

export default function OtpPopupForm() {
  // const [Store] = useContext(StoreContext);

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

  return (
    <>
      <div className={styles.stwo}>
        <div className={styles.sixOtp}>
          <input id="a" type="text" maxLength="1" onChange={() => OtpNextActive(a, a, b)} />
          <input id="b" type="text" maxLength="1" onChange={() => OtpNextActive(a, b, c)} />
          <input id="c" type="text" maxLength="1" onChange={() => OtpNextActive(b, c, d)} />
          <input id="d" type="text" maxLength="1" onChange={() => OtpNextActive(c, d, e)} />
          <input id="e" type="text" maxLength="1" onChange={() => OtpNextActive(d, e, f)} />
          <input id="f" type="text" maxLength="1" onChange={() => OtpNextActive(e, f, f)} />
        </div>
        <div className={styles.additional}>
          <div className={styles.resend}>
            Don&apos;t receive the code ? <span>Resend</span>
          </div>
          <div className={styles.time}>{time}</div>
        </div>
        <div className={styles.submit}>Verify</div>
      </div>
    </>
  );
}
