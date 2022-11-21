/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import PaymentNotificationItems from "./payment";
import ProjectNotificationItems from "./project";
import ReviewNotificationItems from "./review";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import styles from "./index.module.css";
import { useEffect, useState } from "react";

export default function AlsoViewed(id) {
  const [activityLog, setActivityLog] = useState([]);

  async function getActivityLog() {
    try {
      if (id) {
        const response = await fetch(
          `https://agriha.herokuapp.com/activitylog/${id.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer " +
                `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMmViMWZkYjVkOGEyYmFjMjNjMjBlZCIsImlhdCI6MTY2NDk0NDgyMn0.-g6oh4ZEa7mjyJb2rGYCug07eCX6XLE-CeUsxjPlzAM`,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setActivityLog(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getActivityLog();
  }, []);

  return (
    <div className={styles.also_viewed_outer}>
      <div className={`${styles.first} ${styles.desktop}`}>
        <div className={styles.heading}>
          <h4>
            <img src="/img/bell.svg" alt="Notification" />
            <span>Notification center</span>
            <span className={styles.round}>
              {activityLog?.length ? activityLog?.length : 0}
            </span>
          </h4>
        </div>
        {/* <ReviewNotificationItems /> */}
        {activityLog?.map((item, index) => {
          return (
            <div key={index}>
              <ProjectNotificationItems
                activity={item.activity}
                time={item.createdAt}
                user={item.user.name}
              />
            </div>
          );
        })}
        {/*  <PaymentNotificationItems /> */}
      </div>
      {/* <Popup
        trigger={
          <button className={styles.notification_button}>
            <img src="/img/notification.svg" alt="notification" />
          </button>
        }
        position="right center"
      >
        <div className={`${styles.also_viewed_outer} ${styles.az_popup}`}>
          <div className={styles.first}>
            <div className={styles.heading}>
              <h4>
                <img src="/img/bell.svg" alt="Notification" />
                <span>Notification center</span>
                <span className={styles.round}>3</span>
              </h4>
            </div>
            <ReviewNotificationItems />
            <ProjectNotificationItems />
            <PaymentNotificationItems />
          </div>
        </div>
      </Popup> */}
    </div>
  );
}
