/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { StoreContext } from "../StoreContext";
import api_url from "../../src/utils/url";

import styles from "./payment.module.css";

export default function SinglePaymentMain({ isQuoted, setIsQuoted }) {
  const [Store] = useContext(StoreContext);

  const setBidDataPopup = Store.setBidDataPopup;

  const router = useRouter();
  const { id } = router.query;
  const projectId = id;

  return (
    <>
      <div className={styles.main_outer}>
        <div className={styles.main_inner}>
          <div className={styles.paymentsectionMain}>Mode of Payment</div>
          <div className={styles.paymentMode}>
            <input className={styles.input} type="radio" id="" name="online" value="online" />
            online
            <input type="radio" id="" name="online" value="online" />
            account transfer
          </div>
          <div className={styles.typesOfTransactionUpi}>
            Type of transaction :
            <div>
              <div>
                gpay
                <input type="text" />
              </div>
              <div>
                upi id
                <input type="text" />
              </div>
              <div>
                QR Code
                <img className={styles.qr} src="/img/qrcode.jpg" alt="qrcode.jpg" />
              </div>
            </div>
          </div>
          <div className={styles.typesOfTransactionAcc}>
            <div>
              account number :
              <span>
                <input type="text" />
              </span>
            </div>
            <div>
              account holder name :
              <span>
                <input type="text" />
              </span>
            </div>
            <div>
              IFSC code :
              <span>
                <input type="text" />
              </span>
            </div>
            <div>
              branch name :
              <span>
                <input type="text" />
              </span>
            </div>
          </div>
        </div>

        {/* {projectDetails?.length !== 0 ? (
          <div className={styles.main_inner}>
           
            
          </div>
        ) : (
          <div className={styles.main_inner}>
            <div className={styles.loading}>
              <img src="/img/landing/loading.svg" alt="Loading..." />
            </div>
          </div>
        )} */}
      </div>
    </>
  );
}
