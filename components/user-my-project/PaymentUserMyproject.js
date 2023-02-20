import moment from "moment/moment";
import { useContext, useEffect, useState } from "react";
import api_url from "../../src/utils/url";
import { StoreContext } from "../StoreContext";
import styles from "./PaymentUserMyproject.module.css";

const PaymentUserMyproject = () => {
  const [Store] = useContext(StoreContext);

  const setPaymentDetailsPopUp = Store.setPaymentDetailsPopUp;
  const setUserPaymentPopup = Store.setUserPaymentPopup;

  const [navActive, setNavActive] = useState("currentPayment");

  const [productId, setProductId] = useState("");

  const [allHistory, setAllHistory] = useState([]);

  /* GET PROJECT ID */
  function getParameters() {
    let urlString = window.location.href;
    let paramString = urlString.split("/")[4];
    let queryString = new URLSearchParams(paramString);
    for (let pair of queryString.entries()) {
      setProductId(pair[0]);
    }
  }

  useEffect(() => {
    getParameters();
  }, []);

  const historyClick = () => {
    setNavActive("history");
  };

  const paymentClick = () => {
    setNavActive("currentPayment");
  };

  const paymentDetailsClick = () => {
    setPaymentDetailsPopUp(true);
    setUserPaymentPopup("paymentDetails");
  };

  const paymentConfirmClick = () => {
    setPaymentDetailsPopUp(true);
    setUserPaymentPopup("paymentConfirm");
  };

  async function getPaymentHistory() {
    const response = await fetch(`${api_url}/user-payment/getbyproject/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setAllHistory(data.data);
  }

  useEffect(() => {
    if (productId !== "") {
      getPaymentHistory();
    }
  }, [productId]);

  return (
    <div className={styles.paymentContainer_main}>
      <div className={styles.options_sidebar_payment}>
        <div className={styles.title_option}>
          {navActive === "currentPayment" ? (
            <>
              <p>Current payment</p>
              <img src="/img/user-my-project/arrow2.svg" />
            </>
          ) : (
            <>
              <h5 onClick={paymentClick}>Current payment</h5>
            </>
          )}
        </div>
        <div className={styles.content_option}>
          {navActive === "history" ? (
            <>
              <p>History</p>
              <img src="/img/user-my-project/arrow2.svg" />
            </>
          ) : (
            <>
              <h5 onClick={historyClick}>History</h5>
            </>
          )}
        </div>
      </div>
      <div className={styles.main_container_payment}>
        {navActive === "currentPayment" ? (
          <div className={styles.payment_card}>
            <div className={styles.title_payment_card}>
              <div className={styles.title_payment_card_left}>
                <p>Billing date - 28 Mar 2022</p>
                <div className={styles.title_payment_card_left_avatar}>
                  <img src="/img/user-my-project/user.svg" />
                  <h5>Muhammed Faisal</h5>
                </div>
              </div>
              <p>Billing number: #23564879</p>
            </div>
            <div className={styles.main_payment_card}>
              <div className={styles.main_payment_card_table}>
                <div className={styles.main_payment_card_left}>
                  <div className={styles.main_payment_card_left_row}>
                    <p>Total amount:</p>
                    <p>₹20,000,00.00</p>
                  </div>
                  <div className={styles.main_payment_card_left_row}>
                    <p>Discount:</p>
                    <p>0.0</p>
                  </div>
                  <div className={styles.main_payment_card_left_row_end}>
                    <p>Payment stage:</p>
                    <p>Stage 01</p>
                  </div>
                  <div className={styles.main_payment_card_left_row_billingNumber}>
                    <p>Billing Number:</p>
                    <p>#23564879</p>
                  </div>
                </div>
                <div className={styles.main_payment_card_right}>
                  <div className={styles.main_payment_card_left_row}>
                    <p>Pay amount:</p>
                    <h4>₹10,000,00.00</h4>
                  </div>
                  <div className={styles.main_payment_card_left_row}>
                    <p>Balance:</p>
                    <p>₹19,000,00.00</p>
                  </div>
                  <div className={styles.main_payment_card_left_row_end_mobile}>
                    <p>Due date:</p>
                    <p>30 Mar 2021</p>
                  </div>
                </div>
              </div>
              <div className={styles.main_payment_card_buttons}>
                <div className={styles.paymentButton} onClick={paymentDetailsClick}>
                  Payment details
                </div>
                <div className={styles.confirmButton} onClick={paymentConfirmClick}>
                  Paid confirmation
                </div>
              </div>
            </div>
          </div>
        ) : navActive === "history" ? (
          <>
            {allHistory.map((item, index) => {
              return (
                <div className={styles.history_card}>
                  <div className={styles.title_payment_card}>
                    <div className={styles.title_payment_card_left}>
                      <p>Billing date - {moment(item.createdAt).format("ll")}</p>
                      <div className={styles.title_payment_card_left_avatar}>
                        <img
                          src={
                            item.project_id.architect_id.profilepic
                              ? item.project_id.architect_id.profilepic
                              : "/img/user-my-project/user.svg"
                          }
                        />
                        <h5>{item.project_id.architect_id.firstname}</h5>
                      </div>
                    </div>
                    <p>Billing number: #{item.project_id.project_name}</p>
                  </div>
                  <div className={styles.main_payment_card}>
                    <div className={styles.main_payment_card_table}>
                      <div className={styles.main_payment_card_left}>
                        <div className={styles.main_payment_card_left_row}>
                          <p>Total amount:</p>
                          <p>₹20,000,00.00</p>
                        </div>
                        <div className={styles.main_payment_card_left_row}>
                          <p>Discount:</p>
                          <p>0.0</p>
                        </div>
                        <div className={styles.main_payment_card_left_row}>
                          <p>Payment stage:</p>
                          <p>{item.stage}</p>
                        </div>
                        <div className={styles.main_payment_card_left_row_end}>
                          <p>Payment status</p>
                          <p>
                            {/* <img src="/img/user-my-project/completed.svg " /> */}
                            {item.status}
                          </p>
                        </div>
                        <div className={styles.main_payment_card_left_row_billingNumber}>
                          <p>Billing Number:</p>
                          <p>#23564879</p>
                        </div>
                      </div>
                      <div className={styles.main_payment_card_right}>
                        <div className={styles.main_payment_card_left_row}>
                          <p>Pay amount:</p>
                          <h4>₹{item?.amount}</h4>
                        </div>
                        <div className={styles.main_payment_card_left_row}>
                          <p>Balance:</p>
                          <p>₹19,000,00.00</p>
                        </div>
                        <div className={styles.main_payment_card_left_row}>
                          <p>Payment platform:</p>
                          <p>Google pay</p>
                        </div>
                        <div className={styles.main_payment_card_left_row_end_mobile}>
                          <p>Paid date</p>
                          <p>{moment(item.updatedAt).format("ll")}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default PaymentUserMyproject;
