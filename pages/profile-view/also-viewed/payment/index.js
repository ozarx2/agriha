/* eslint-disable @next/next/no-img-element */
import styles from "./index.module.css";

export default function PaymentNotificationItems() {
  return (
    <div className={styles.notification_items_outer}>
      <div>
        <img src="/img/payment.svg" alt="Review Notification" />
      </div>
      <div>
        <h3>
          You have a new project from <b>Althaf</b>
        </h3>
        <h5>10 min ago</h5>
      </div>
    </div>
  );
}
