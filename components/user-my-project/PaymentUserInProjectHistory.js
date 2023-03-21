import moment from "moment/moment";

import styles from "./PaymentUserMyproject.module.css";

const PaymentUserMyprojectHistory = ({ item }) => {
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
};

export default PaymentUserMyprojectHistory;
