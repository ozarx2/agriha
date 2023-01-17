/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { StoreContext } from "../StoreContext";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import api_url from "../../src/utils/url";

import styles from "./payment.module.css";

export default function SinglePaymentMain({ isQuoted, setIsQuoted }) {
  const [Store] = useContext(StoreContext);
  const setBidDataPopup = Store.setBidDataPopup;
  const router = useRouter();
  const { id } = router.query;
  const projectId = id;
  const options = ["Gpay", "Paytm", "Phonepay"];
  const defaultOption = options[0];
  const [onlineOrAccount, setOnlineOrAccount] = useState("online");

  const handleClick = () => {
    setActive(!active);
  };
  return (
    <>
      <div className={styles.main_outer}>
        <div className={styles.main_inner}>
          <div className={styles.paymentsectionMain}>Mode of Payment</div>

          <div className={styles.paymentMode}>
            <div className={styles.mode}>
              <div
                onClick={() => setOnlineOrAccount("online")}
                className={onlineOrAccount === "online" ? styles.modeInputActive : ""}
              >
                Online transfer
              </div>
            </div>
            <div className={styles.mode}>
              <div
                onClick={() => setOnlineOrAccount("account")}
                className={onlineOrAccount === "account" ? styles.modeInputActive : ""}
              >
                Account transfer
              </div>
            </div>
          </div>

          {onlineOrAccount === "online" ? (
            <div className={styles.typesOfTransactionUpi}>
              <table className={styles.table_out}>
                <tbody>
                  <tr>
                    <td>
                      <Dropdown
                        className={styles.dropdown}
                        options={options}
                        // onChange={this._onSelect}
                        value={defaultOption}
                        placeholder="Select an option"
                      />
                    </td>
                    <td>
                      : <input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td>UPI id/number</td>

                    <td>
                      : <input type="tel" />
                    </td>
                  </tr>
                  <tr>
                    <td> QR Code </td>
                    <td>
                      : <input type="file" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className={styles.typesOfTransactionAcc}>
              <table className={styles.table_out}>
                <tbody>
                  <tr>
                    <td>account number </td>
                    <td>
                      : <input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td>account holder name </td>
                    <td>
                      : <input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td> IFSC code </td>
                    <td>
                      : <input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td> branch name </td>
                    <td>
                      : <input type="text" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          <div className={styles.paymentMode}>
            <div className={styles.addBtn}>Add account</div>
          </div>
        </div>
      </div>
    </>
  );
}
