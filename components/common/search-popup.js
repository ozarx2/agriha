/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import { StoreContext } from "../StoreContext";
import styles from "./search-popup.module.css";

export default function SearchPopUp() {
  const [Store] = useContext(StoreContext);

  const setSearchpopup = Store.setSearchpopup;

  return (
    <>
      <div className={styles.notificationMaxPopupOuter}>
        <div className={styles.notificationPopupOuter}>
          <div className={styles.notificationPopupInner}>
            <div className={styles.heading}>
              <div className={styles.left}>Search Results</div>
              <div className={styles.right}>
                <div>
                  <div
                    onClick={() => setSearchpopup(false)}
                    className={styles.close}
                  >
                    <img
                      src="/img/architect-dashboard/close-round.svg"
                      alt="alt"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.content}>
              {Array.apply(null, { length: 5 }).map((e, i) => (
                <>
                  <div className={styles.notifi_outer}>
                    <div className={styles.left}>
                      <img src="/img/althaf.png" alt="alt" />
                      <div className={styles.title}>
                        <div className={styles.main}>test</div>
                        <div className={styles.sub}>test</div>
                      </div>
                    </div>
                    <div className={styles.right}>
                      <div>5 min ago</div>
                    </div>
                  </div>
                </>
              ))}
            </div>
            <div className={styles.arrow_top}></div>
            {/* <img
            className={styles.arrow_top}
            src="/img/architect-dashboard/Polygon.svg"
            alt="alt"
          /> */}
          </div>
        </div>
        <div
          onClick={() => setSearchpopup(false)}
          className={styles.notificationPopupClose}
        ></div>
      </div>
    </>
  );
}
