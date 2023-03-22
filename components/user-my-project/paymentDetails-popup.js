/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useContext } from "react";
import { StoreContext } from "../StoreContext";
import api_url from "../../src/utils/url";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";
var randomstring = require("randomstring");

import styles from "./paymentDetails-popup.module.css";

export default function PaymentDetailsPopup() {
  const [Store] = useContext(StoreContext);

  const setPaymentDetailsPopUp = Store.setPaymentDetailsPopUp;
  const userPaymentPopup = Store.userPaymentPopup;
  const paidConfirmData = Store.paidConfirmData;

  const [paymentId, setPaymentId] = useState("");
  const [payDate, setPayDate] = useState("");
  const [payPlatform, setPayPlatform] = useState("GooglePay");
  const [payImage, setPayImage] = useState("");
  const [error, setError] = useState(false);

  /* Upload payment image to firebase */
  const [percent, setPercent] = useState(0);

  function handleUploadImage(img) {
    if (!img) {
      alert("Please choose a file first!");
    }

    const randomString = randomstring.generate({
      length: 12,
      charset: "alphabetic",
    });

    const storageRef = ref(
      storage,
      `/files/paymentScreenshots/${randomString}${img.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log("oldurl", url);
          const us = url.split("/files")[1].split("?")[0].split("%2F")[2];
          const substr = us.substring(us.lastIndexOf("."));
          const replaceurl = url.replace(substr, "_400x400.webp");
          console.log("newurl", replaceurl);
          setPayImage(replaceurl);
        });
      }
    );
  }

  const uploadImage = (event) => {
    if (!event.target.files[0]) {
      alert("Please choose a file first!");
    } else {
      handleUploadImage(event.target.files[0]);
    }
  };

  // PAYMENT DETAILS UPLOAD
  async function userPayment() {
    const userId = localStorage.getItem("userId");

    if (
      paymentId !== "" &&
      payDate !== "" &&
      payPlatform !== "" &&
      payImage !== ""
    ) {
      setError(false);
      const res = await fetch(`${api_url}/user-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          project_id: paidConfirmData.project_id._id,
          payment_id: paidConfirmData.payment_id,
          creator: userId,
          status: paidConfirmData.status,
          total_amount: 0,
          balance: 0,
          amount_tobe_paid: paidConfirmData.amount,
          transaction_image: payImage,
          due_date: "",
          bill_date: payDate,
          transaction_id: paymentId,
          stage: paidConfirmData.stage,
        }),
      });

      const data = await res.json();
      console.log(data);
    } else {
      setError(true);
    }
  }

  return (
    <>
      <div id="paymentPopupOuter" className={styles.paymentPopupOuter}>
        <div
          onClick={() => setPaymentDetailsPopUp(false)}
          className={styles.paymentPopupClose}
        ></div>
        <div className={styles.paymentPopupInner}>
          {userPaymentPopup === "paymentConfirm" ? (
            <>
              <div className={styles.header}>
                Payment details
                <img
                  onClick={() => setPaymentDetailsPopUp(false)}
                  src="/img/user-my-project/close.svg"
                />
              </div>
              <div className={styles.content}>
                <p>Enter payment id</p>
                <input
                  type="text"
                  placeholder="#2123123333354666"
                  onChange={(e) => setPaymentId(e.target.value)}
                />
                <div className={styles.paymentInfo}>
                  <div className={styles.paymentDate}>
                    <p>Payment date</p>
                    <div className={styles.paymentDate_input}>
                      <img src="/img/user-my-project/dateIcon.svg" />
                      <input
                        type="date"
                        onChange={(e) => setPayDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={styles.paymentPlatform}>
                    <p>Payment platform</p>
                    <select onChange={(e) => setPayPlatform(e.target.value)}>
                      <option value="GooglePay">GooglePay</option>
                      <option value="PhonePay">PhonePay</option>
                      <option value="Paytm">Paytm</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* <div className={styles.or_container}>
                <p>OR</p>
                <span></span>
              </div> */}
              <div className={styles.content}>
                {/* <p>Payment platform</p>
                <select>
                  <option value="googlePay">GooglePay</option>
                  <option value="phonePay">PhonePay</option>
                  <option value="payTm">Paytm</option>
                </select> */}
                <p>Upload payment screenshot</p>
                <div className={styles.fileUploadContainer}>
                  <p>Upload file: jpeg, png, jpg</p>
                  <div className={styles.inputFile}>
                    Choose file
                    <input
                      type="file"
                      accept="image/*"
                      className={styles.file_upload}
                      onChange={uploadImage}
                    />
                  </div>
                </div>
                <div className={styles.submitButton} onClick={userPayment}>
                  Submit details
                </div>
                {error ? <span>Must fill all fields</span> : ""}
              </div>
            </>
          ) : userPaymentPopup === "paymentDetails" ? (
            <>
              <div className={styles.header}>
                Account details
                <img
                  onClick={() => setPaymentDetailsPopUp(false)}
                  src="/img/user-my-project/close.svg"
                />
              </div>
              <div className={styles.content}>
                <div className={styles.content_top}>
                  <div className={styles.content_top_row}>
                    <p>Account number:</p>
                    <p>99902459876112</p>
                  </div>
                  <div className={styles.content_top_rowB}>
                    <p>Account holder:</p>
                    <p>ALTHAF RAHMAN</p>
                  </div>
                  <div className={styles.content_top_row}>
                    <p>Branch name: </p>
                    <p>SBI bank kozhikode</p>
                  </div>
                  <div className={styles.content_top_rowB}>
                    <p>Branch IFSC:</p>
                    <p>SBI256987001</p>
                  </div>
                </div>
                <div className={styles.content_bottom}>
                  <div className={styles.content_bottom_header}>
                    <p>UPI payment details</p>
                  </div>
                  <div className={styles.content_bottom_row}>
                    <p>Mobile number:</p>
                    <p> +91 8456 121 212</p>
                  </div>
                  <div className={styles.content_bottom_row}>
                    <p>Holder name:</p>
                    <p>ALTHAF RAHMAN</p>
                  </div>
                  <div className={styles.content_bottom_row}>
                    <p>UPI IDs:</p>
                    <p>althafar212@oksbi</p>
                  </div>
                </div>
                <div className={styles.button_container}>
                  <div className={styles.contactUs_button}>Contact us</div>
                  <div
                    className={styles.doneButton}
                    onClick={() => setPaymentDetailsPopUp(false)}
                  >
                    Done
                  </div>
                </div>
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
