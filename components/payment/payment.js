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
          <div className={styles.paymentsection}>
            <div className={styles.paymentMode}>
              <div className={styles.modeInput}>
                <input type="radio" id="" name="online" value="online" />
                online
              </div>
              <div className={styles.modeInput}>
                <input type="radio" id="" name="online" value="online" />
                account transfer
              </div>
            </div>
            <div className={styles.transactionTypeTitle}>Type of transactions :</div>
            <div className={styles.typesOfTransactionUpi}>
              {/* <div className={styles.transactions}>
                <div className={styles.gpay}>
                  <img src="/img/gpay.png" alt="google-pay.svg" className={styles.gpayIcon} />
                  <span>Gpay</span>
                  <input type="text" />
                </div>
                <div className={styles.upi}>
                  <img src="/img/upi.svg" alt="upi.svg" className={styles.upiIcon} />
                  <span>UPI id/number</span>
                  <input type="text" />
                </div>
                <div className={styles.qrCode}>
                  QR Code
                  <img className={styles.qr} src="/img/qrcode.jpg" alt="qrcode.jpg" />
                </div>
              </div> */}
              <table className={styles.table_out}>
                <tbody>
                  <tr>
                    <td>
                      <img src="/img/gpay.png" alt="google-pay.svg" className={styles.gpayIcon} />
                      Gpay
                    </td>
                    <td>
                      : <input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img src="/img/upi.svg" alt="upi.svg" className={styles.upiIcon} />
                      UPI id/number
                    </td>
                    <td>
                      : <input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td> QR Code :</td>
                    <td>
                      <img className={styles.qr} src="/img/qrcode.jpg" alt="qrcode.jpg" />
                    </td>
                  </tr>
                </tbody>
              </table>
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
