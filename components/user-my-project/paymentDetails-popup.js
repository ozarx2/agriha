/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from "react";
import { StoreContext } from "../StoreContext";

import styles from "./paymentDetails-popup.module.css";

export default function PaymentDetailsPopup() {
  const [Store] = useContext(StoreContext);

  const setPaymentDetailsPopUp = Store.setPaymentDetailsPopUp;
  const userPaymentPopup = Store.userPaymentPopup;

  return (
    <>
      <div id="paymentPopupOuter" className={styles.paymentPopupOuter}>
        <div onClick={() => setPaymentDetailsPopUp(false)} className={styles.paymentPopupClose}></div>
        <div className={styles.paymentPopupInner}>
          {userPaymentPopup === "paymentConfirm" ? (
            <>
              <div className={styles.header}>
                Payment details
                <img onClick={() => setPaymentDetailsPopUp(false)} src="/img/user-my-project/close.svg" />
              </div>
              <div className={styles.content}>
                <p>Enter payment id</p>
                <input type="text" placeholder="#2123123333354666" />
                <div className={styles.paymentInfo}>
                  <div className={styles.paymentDate}>
                    <p>Payment date</p>
                    <div className={styles.paymentDate_input}>
                      <img src="/img/user-my-project/dateIcon.svg" />
                      <input type="date" />
                    </div>
                  </div>
                  <div className={styles.paymentPlatform}>
                    <p>Payment platform</p>
                    <select>
                      <option value="googlePay">GooglePay</option>
                      <option value="phonePay">PhonePay</option>
                      <option value="payTm">Paytm</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className={styles.or_container}>
                <p>OR</p>
                <span></span>
              </div>
              <div className={styles.content}>
                <p>Payment platform</p>
                <select>
                  <option value="googlePay">GooglePay</option>
                  <option value="phonePay">PhonePay</option>
                  <option value="payTm">Paytm</option>
                </select>
                <p>Upload payment screenshot</p>
                <div className={styles.fileUploadContainer}>
                  <p>Upload file: jpeg, png, jpg</p>
                  <div className={styles.inputFile}>
                    Choose file
                    <input type="file" accept="image/*" className={styles.file_upload} />
                  </div>
                </div>
                <div className={styles.submitButton}>Submit details</div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
