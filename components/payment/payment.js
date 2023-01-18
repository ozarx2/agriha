/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { StoreContext } from "../StoreContext";
import api_url from "../../src/utils/url";
import styles from "./payment.module.css";

export default function SinglePaymentMain({ isQuoted, setIsQuoted }) {
  let architectId;
  useEffect(() => {
    architectId = window.localStorage.getItem("architectId");
  }, []);

  const [Store] = useContext(StoreContext);
  const router = useRouter();
  const { id } = router.query;
  const projectId = id;
  const initialStateDetails = {
    upi_id: "",
    upi_number: "",
    qr_code: "",
  };
  const initialStateAccount = {
    account_number: "",
    holder_name: "",
    ifsc_code: "",
    branch_name: "",
  };

  const [accountData, setAccountData] = useState([]);
  const [accountDetails, setAccountDetails] = useState(initialStateAccount);
  const [onlineOrAccount, setOnlineOrAccount] = useState("online");
  const [onlineDetails, setOnlineDetails] = useState(initialStateDetails);
  const [transaction, setTransaction] = useState("gpay");
  const handleInput = (e) => {
    if (onlineOrAccount === "online") {
      setOnlineDetails({ ...onlineDetails, [e.target.name]: e.target.value });
    } else {
      setAccountDetails({ ...accountDetails, [e.target.name]: e.target.value });
    }
  };

  const payment = async () => {
    console.log("payment");
    let details;
    if (onlineOrAccount === "online") {
      details = onlineDetails;
    } else {
      details = accountDetails;
    }
    const token = localStorage.getItem("userToken");

    const res = await fetch(`${api_url}/arc-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        architect_id: architectId,
        mode_of_payment: onlineOrAccount,
        type_of_transaction: transaction,
        details: [details],
      }),
    });
    const data = await res.json();
    console.log(data);
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
                      <select
                        className={styles.dropDown}
                        name="typeTransaction"
                        onChange={(e) => setTransaction(e.target.value)}
                      >
                        <option value="gpay">Gpay</option>
                        <option value="phonepay">Phonepay</option>
                        <option value="paytm">Paytm</option>
                      </select>
                    </td>
                    <td>
                      :{" "}
                      <input
                        type="text"
                        onChange={handleInput}
                        name="upi_number"
                        defaultValue={onlineDetails.upi_number}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>UPI id</td>
                    <td>
                      : <input type="text" onChange={handleInput} name="upi_id" />
                    </td>
                  </tr>
                  <tr>
                    <td> QR Code </td>
                    <td>
                      : <input type="file" onChange={handleInput} name="qr_code" />
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
                      : <input type="text" name="account_number" onChange={handleInput} />
                    </td>
                  </tr>
                  <tr>
                    <td>account holder name </td>
                    <td>
                      : <input type="text" name="holder_name" onChange={handleInput} />
                    </td>
                  </tr>
                  <tr>
                    <td> IFSC code </td>
                    <td>
                      : <input type="text" name="ifsc_code" onChange={handleInput} />
                    </td>
                  </tr>
                  <tr>
                    <td> branch name </td>
                    <td>
                      : <input type="text" name="branch_name" onChange={handleInput} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          <div className={styles.paymentMode}>
            <div className={styles.addBtn} onClick={() => payment()}>
              Add account
            </div>
          </div>
          {onlineOrAccount === "online" ? (
            <div className={styles.typesOfTransactionUpi}>
              <table className={styles.table_out}>
                <tbody>
                  <tr>
                    <td>
                      <select
                        className={styles.dropDown}
                        name="typeTransaction"
                        onChange={(e) => setTransaction(e.target.value)}
                      >
                        <option value="gpay">Gpay</option>
                        <option value="phonepay">Phonepay</option>
                        <option value="paytm">Paytm</option>
                      </select>
                    </td>
                    <td>
                      :{" "}
                      <input
                        type="text"
                        onChange={handleInput}
                        name="upi_number"
                        defaultValue={onlineDetails.upi_number}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>UPI id</td>
                    <td>
                      : <input type="text" onChange={handleInput} name="upi_id" />
                    </td>
                  </tr>
                  <tr>
                    <td> QR Code </td>
                    <td>
                      : <input type="file" onChange={handleInput} name="qr_code" />
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
                      : <input type="text" name="account_number" onChange={handleInput} />
                    </td>
                  </tr>
                  <tr>
                    <td>account holder name </td>
                    <td>
                      : <input type="text" name="holder_name" onChange={handleInput} />
                    </td>
                  </tr>
                  <tr>
                    <td> IFSC code </td>
                    <td>
                      : <input type="text" name="ifsc_code" onChange={handleInput} />
                    </td>
                  </tr>
                  <tr>
                    <td> branch name </td>
                    <td>
                      : <input type="text" name="branch_name" onChange={handleInput} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
