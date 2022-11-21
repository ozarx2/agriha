/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState, useEffect, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import styles from "./logout-popup.module.css";

export default function LogoutPopup() {
  const [Store] = useContext(StoreContext);

  const setLogout = Store.setLogout;

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      <div className={styles.LogoutPopupOuter}>
        <div className={styles.LogoutPopupInner}>
          <div onClick={() => setLogout(false)} className={styles.closeimg}>
            <img src="/img/architect-dashboard/logout-close.svg" alt="logout" />
          </div>
          <div className={styles.img}>
            <img src="/img/architect-dashboard/power.svg" alt="logout" />
          </div>
          <div className={styles.heading}>
            Are you sure you want to log out!
          </div>
          <div className={styles.content}>
            <div className={styles.text}>
              You are also logged out from your personal cloud and any local
              data apps open in this browser.
            </div>
            <div className={styles.footer}>
              <div onClick={() => setLogout(false)} className={styles.cancel}>
                Cancel
              </div>
              <div className={styles.logout} onClick={logout}>
                Log out
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() => setLogout(false)}
          className={styles.LogoutPopupClose}
        ></div>
      </div>
    </>
  );
}
