/* eslint-disable @next/next/no-img-element */
import styles from "./index.module.css";

export default function ProjectNotificationItems({ activity, time, user }) {
  return (
    <div className={styles.notification_items_outer}>
      <div>
        <img src="/img/tick.svg" alt="Review Notification" />
      </div>
      <div>
        <h3>
          <b>{user}</b> {activity}
        </h3>
        <h5>{time}</h5>
      </div>
    </div>
  );
}
