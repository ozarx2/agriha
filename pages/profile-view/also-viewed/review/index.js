/* eslint-disable @next/next/no-img-element */
import styles from "./index.module.css";

export default function ReviewNotificationItems() {
  return (
    <div className={styles.notification_items_outer}>
      <div>
        <img src="/img/star.svg" alt="Review Notification" />
      </div>
      <div>
        <h3>
          You have a new review from <b>Home interor project</b> by{" "}
          <b>Shijin Arclif</b>
        </h3>
        <h5>10 min ago</h5>
      </div>
    </div>
  );
}
