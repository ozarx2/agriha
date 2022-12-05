import React from "react";
import { useContext } from "react";
import { StoreContext } from "../StoreContext";
import styles from "./data-popup.module.css";

export default function DataPopup() {
  const [Store] = useContext(StoreContext);

  const setBidDataPopup = Store.setBidDataPopup;

  const goBackClick = () => {
    setBidDataPopup(false);
  };

  const termsClick = () => {
    window.location.href = "/terms";
  };

  const privacyPolicyClick = () => {
    window.location.href = "/privacypolicy";
  };

  return (
    <>
      <div className={styles.FolderPopupOuter}>
        <div className={styles.FolderPopupInner}>
          <div className={styles.title}>
            Fill data <span>*</span>
          </div>
          <div className={styles.inputContainer}>
            <input type="tel" placeholder="Enter your amount" />
          </div>
          <div className={styles.agreeContainer}>
            <p>
              By continuing, you agree to Arclif&apos;s{" "}
              <span onClick={termsClick}>Terms of Service</span> and{" "}
              <span onClick={privacyPolicyClick}>Privacy policy</span>.
            </p>
          </div>
          <div className={styles.buttonContainer}>
            <div className={styles.goBack_button} onClick={goBackClick}>
              Go back
            </div>
            <div className={styles.send_button}>Send</div>
          </div>
        </div>
      </div>
    </>
  );
}
