/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import React, { useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import styles from "./notification-popup.module.css";

export default function NotificationPopup() {
  const [Store] = useContext(StoreContext);

  const setNotificationPopup = Store.setNotificationPopup;
  const dataActivity = Store.activityLog;
  const temp = dataActivity.slice(0).reverse();
  const activityLog = temp.slice(0, 10);
  // console.log(activityLog);

  return (
    <>
      <div className={styles.notificationMaxPopupOuter}>
        <div className={styles.notificationPopupOuter}>
          <div className={styles.notificationPopupInner}>
            <div className={styles.heading}>
              <div className={styles.left}>Notification</div>
              <div className={styles.right}>
                <div>
                  <div onClick={() => setNotificationPopup(false)} className={styles.close}>
                    <img src="/img/architect-dashboard/close-round.svg" alt="alt" />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.content}>
              {activityLog?.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <div className={styles.notifi_outer} key={index}>
                      <div className={styles.left}>
                        <img
                          src={
                            item?.user?.profile_pic
                              ? item?.user?.profile_pic
                              : "/img/architect-dashboard/profile_img.svg"
                          }
                          onError={(e) => (e.target.src = "/img/landing/profile_img.svg")}
                          alt="alt"
                        />
                        <div className={styles.title}>
                          <div className={styles.main}>{item?.user?.name}</div>
                          <div className={styles.sub}>
                            {item?.user?.name}
                            {item?.activity === "project added for you" ? " added a project for you" : ""}
                          </div>
                        </div>
                      </div>
                      <div className={styles.right}>
                        <div>{moment(item?.createdAt).startOf("day").fromNow()}</div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
            <div className={styles.arrow_top}></div>
            {/* <img
            className={styles.arrow_top}
            src="/img/architect-dashboard/Polygon.svg"
            alt="alt"
          /> */}
          </div>
        </div>
        <div onClick={() => setNotificationPopup(false)} className={styles.notificationPopupClose}></div>
      </div>
    </>
  );
}
