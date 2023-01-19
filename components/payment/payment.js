/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { StoreContext } from "../StoreContext";
import api_url from "../../src/utils/url";
import styles from "./payment.module.css";

export default function SinglePaymentMain({ isQuoted, setIsQuoted }) {
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

  const [accountDetails, setAccountDetails] = useState(initialStateAccount);
  const [onlineOrAccount, setOnlineOrAccount] = useState("online");
  const [onlineDetails, setOnlineDetails] = useState(initialStateDetails);
  const [transaction, setTransaction] = useState("gpay");
  const handleInput = (e) => {
    if (onlineOrAccount === "online") {
      setOnlineDetails({ ...onlineDetails, [e.target.name]: e.target.value });
      setOnlineDetails;
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
    const token = localStorage.getItem("architectId");
    let architectId = localStorage.getItem("architectId");
    console.log(architectId);

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

  const [accountData, setAccountData] = useState([]);

  async function getPayment() {
    const token = localStorage.getItem("architectId");
    let architectId = localStorage.getItem("architectId");
    console.log(architectId);
    const response = await fetch(`${api_url}/arc-payment/arcpaymentdetails/${architectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setAccountData(data.data);
    console.log(data);
  }

  useEffect(() => {
    getPayment();
  }, []);

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
                  {/* <tr>
                    <td> QR Code </td>
                    <td>
                      : <input type="file" onChange={handleInput} name="qr_code" />
                    </td>
                  </tr> */}
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
          {/* <=====================output====================> */}
          <>
            {/* <div className={styles.paymentsectionMain}>Mode of Payment</div>
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
                      <td>gpay</td>
                      <td>
                        : <input type="text" />
                      </td>
                    </tr>
                    <tr>
                      <td>UPI id</td>
                      <td>
                        : <input type="text" />
                      </td>
                    </tr>
                    <tr>
                      <td> QR Code </td>
                      <td>
                        : <img className={styles.qrimages} src="/img/qrcode.jpg" alt="qr.jpg" />
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
            )} */}
          </>
          <div className={styles.paymentDetailesMainSec}>
            {/* <div>Transaction mode details</div> */}
            {accountData?.map((datas, index) => {
              return (
                <div key={index} className={styles.paymentDetailesMain}>
                  {datas?.mode_of_payment === "online" ? (
                    <table className={styles.table_outer}>
                      <tbody>
                        <tr>
                          <td>Mode of payment</td>
                          <td className={styles.tableDataResult}>: {datas?.mode_of_payment}</td>
                        </tr>
                        <tr>
                          <td>Type of transaction</td>
                          <td className={styles.tableDataResult}>: {datas?.type_of_transaction}</td>
                        </tr>
                        <tr>
                          <td>UPI number</td>
                          <td className={styles.tableDataResult}>: {datas?.details[0]?.upi_number}</td>
                        </tr>
                        <tr>
                          <td>UPI id</td>
                          <td className={styles.tableDataResult}>: {datas?.details[0]?.upi_id}</td>
                        </tr>
                        {/* <tr>
                        <td>QR code</td>
                        <td className={styles.tableDataResult}>
                          : <img className={styles.qrimages} src={datas?.details[0]?.qr_code} alt="qr.jpg" />
                        </td>
                      </tr> */}
                      </tbody>
                    </table>
                  ) : (
                    <table className={styles.table_outer}>
                      <tbody>
                        <tr>
                          <td>Mode of payment</td>
                          <td className={styles.tableDataResult}>: {datas?.mode_of_payment}</td>
                        </tr>
                        <tr>
                          <td>Account number</td>
                          <td className={styles.tableDataResult}>: {datas?.details[0]?.account_number}</td>
                        </tr>
                        <tr>
                          <td>Account holder name</td>
                          <td className={styles.tableDataResult}>: {datas?.details[0]?.holder_name}</td>
                        </tr>
                        <tr>
                          <td>IFSC code</td>
                          <td className={styles.tableDataResult}>: {datas?.details[0]?.ifsc_code}</td>
                        </tr>
                        <tr>
                          <td>Branch name</td>
                          <td className={styles.tableDataResult}>: {datas?.details[0]?.branch_name}</td>
                        </tr>
                        {/* <tr>
                        <td>QR code</td>
                        <td className={styles.tableDataResult}>
                          : <img className={styles.qrimages} src={datas?.details[0]?.qr_code} alt="qr.jpg" />
                        </td>
                      </tr> */}
                      </tbody>
                    </table>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
