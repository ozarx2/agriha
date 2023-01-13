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
  const [online, setOnline] = useState(false);
  const [account, setAccount] = useState(false);
  const [onlineChange, setOnlineChange] = useState(false);
  const [accountChange, setAccountChange] = useState(false);

  const onlinToggleSec = () => {
    setOnline((prevState) => !prevState);
    setOnlineChange();
  };
  const accountToggle = () => {
    setAccount((prevState) => !prevState);
    setAccountChange();
  };
  return (
    <>
      <div className={styles.main_outer}>
        <div className={styles.main_inner}>
          <div className={styles.paymentsectionMain}>Mode of Payment</div>
          <div className={styles.paymentMode}>
            <div className={styles.modeInput}>
              <input onClick={() => onlinToggleSec()} type="radio" id="" name="online" value="online" />
              online
            </div>
            <div className={styles.modeInput}>
              <input onClick={() => accountToggle()} type="radio" id="" name="online" value="online" />
              account transfer
            </div>
          </div>

          <div className={styles.transactionTypeTitle}>Type of transactions :</div>
          {online ? (
            <div className={styles.typesOfTransactionUpi}>
              <table className={styles.table_out}>
                <tbody>
                  <tr>
                    <td>
                      {/* <img src="/img/gpay.png" alt="google-pay.svg" className={styles.gpayIcon} /> */}
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
                    <td>
                      <img src="/img/upi.svg" alt="upi.svg" className={styles.upiIcon} />
                      UPI
                      {/* <td>
                      <Dropdown
                        className={styles.dropdown}
                        options={options}
                        // onChange={this._onSelect}
                        value={defaultOption}
                        placeholder="Select an option"
                      />
                    </td> */}
                    </td>

                    {/* <td>
                    :
                    <Dropdown
                      className={styles.dropdown}
                      options={options}
                      // onChange={this._onSelect}
                      value={defaultOption}
                      placeholder="Select an option"
                    />
                  </td> */}

                    {/* <select>
                      <option value="fruit">
                        <img src="/img/gpay.png" alt="google-pay.svg" className={styles.gpayIcon} />
                        Fruit
                      </option>

                      <option value="vegetable">Vegetable</option>

                      <option value="meat">Meat</option>
                    </select> */}

                    <td>
                      : <input type="text" />
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
            ""
          )}
          {account ? (
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
          ) : (
            ""
          )}
          <div className={styles.addBtn}>Add</div>
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
