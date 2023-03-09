import moment from "moment/moment";
import { useContext, useEffect, useState } from "react";
import api_url from "../../src/utils/url";
import { StoreContext } from "../StoreContext";
import styles from "./PaymentUserMyproject.module.css";

const PaymentUserMyprojectCurrent = ({ item, key }) => {
  const [Store] = useContext(StoreContext);

  const setPaymentDetailsPopUp = Store.setPaymentDetailsPopUp;
  const setUserPaymentPopup = Store.setUserPaymentPopup;

  const paymentDetailsClick = () => {
    setPaymentDetailsPopUp(true);
    setUserPaymentPopup("paymentDetails");
  };

  const paymentConfirmClick = () => {
    setPaymentDetailsPopUp(true);
    setUserPaymentPopup("paymentConfirm");
  };

  const [getAllBidResult, setGetAllBidResult] = useState([]);
  async function getAllBidResults(id) {
    const response = await fetch(`${api_url}/quotation/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const data = await response.json();
    if (data) {
      const temp = data.data;
      setGetAllBidResult(temp);
    }
  }

  return (
    <div className={styles.payment_card}>
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
            <h5>{item.project_id.architect_id.registered_id.name}</h5>
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
            <div className={styles.main_payment_card_left_row_end}>
              <p>Payment stage:</p>
              <p>{item.stage}</p>
            </div>
          </div>
          <div className={styles.main_payment_card_right}>
            <div className={styles.main_payment_card_left_row}>
              <p>Pay amount:</p>
              <h4>₹10,000,00.00</h4>
            </div>
            <div className={styles.main_payment_card_left_row}>
              <p>Balance:</p>
              <p>₹19,000,00.01</p>
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
  );
};

export default PaymentUserMyprojectCurrent;
