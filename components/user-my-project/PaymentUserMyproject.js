import { useContext, useEffect, useState } from "react";
import api_url from "../../src/utils/url";
import { StoreContext } from "../StoreContext";
import styles from "./PaymentUserMyproject.module.css";

const PaymentUserMyproject = () => {
  const [Store] = useContext(StoreContext);

  const setPaymentDetailsPopUp = Store.setPaymentDetailsPopUp;
  const setUserPaymentPopup = Store.setUserPaymentPopup;

  const [navActive, setNavActive] = useState("currentPayment");

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
    let userId = localStorage.getItem("userId");
    const response = await fetch(`${api_url}/product/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  }

  useEffect(() => {
    getPaymentHistory();
  }, []);

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
            <div className={styles.history_card}>
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
                    <div className={styles.main_payment_card_left_row}>
                      <p>Payment stage:</p>
                      <p>Stage 01</p>
                    </div>
                    <div className={styles.main_payment_card_left_row_end}>
                      <p>Payment status</p>
                      <p>
                        <img src="/img/user-my-project/completed.svg " />
                        Payment status
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
                      <h4>₹10,000,00.00</h4>
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
                      <p>30 Mar 2021</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default PaymentUserMyproject;
