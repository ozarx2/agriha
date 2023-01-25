/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import windowSize from "../windowRes";
import ZonePopupForm from "./ZoneForm";

import styles from "./UpdateZonePopUp.module.css";

export default function UpdateZonePopUp() {
  const [Store] = useContext(StoreContext);
  const setUpdateZonePopUp = Store.setUpdateZonePopUp;

  const windowRes = windowSize();

  return (
    <>
      <div id="zonePopupOuter" className={styles.RegisterPopupOuter}>
        <div onClick={() => setUpdateZonePopUp(false)} className={styles.RegisterPopupClose}></div>
        <div className={styles.RegisterPopupInner}>
          {windowRes.innerWidth >= 767 ? (
            <div className={styles.desktop_header}>
              <div className={styles.header_inner}>
                <div onClick={() => setUpdateZonePopUp(false)} className={styles.left}>
                  <picture>
                    <img src="/img/landing/header-close.svg" alt="close" />
                  </picture>
                </div>
                <div className={styles.center}>
                  <span>Welcome to</span>
                  <picture>
                    <img src="/img/landing/logo.svg" alt="logo" />
                  </picture>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.header}>
              <div className={`container ${styles.container} ${styles.header_container}`}>
                <div className={styles.header_inner}>
                  <div className={styles.left}>
                    <picture>
                      <img src="/img/landing/logo.svg" alt="logo" />
                    </picture>
                  </div>
                  <div className={styles.right}></div>
                </div>
              </div>
            </div>
          )}

          {windowRes.innerWidth >= 767 ? (
            <>
              <div className={styles.desktop_content_outer}>
                <div className={styles.content_inner}>
                  <div className={styles.sone}>
                    <div className={styles.text}>
                      <div className={styles.textone}>Zone Selection</div>
                      <div className={styles.texttwo}>Select your Zone to continue</div>
                    </div>
                  </div>
                  <ZonePopupForm />
                </div>
              </div>
            </>
          ) : (
            <div className={styles.content_outer}>
              <div className={`container ${styles.container} ${styles.content}`}>
                <div className={styles.content_inner}>
                  <div className={styles.sone}>
                    <div onClick={() => setUpdateZonePopUp(false)} className={styles.back}>
                      <img src="/img/project-details/back.svg" alt="back" />
                    </div>
                    <div className={styles.text}>
                      <div className={styles.textone}>Zone Selection</div>
                      <div className={styles.texttwo}>Select your Zone to continue</div>
                    </div>
                  </div>
                  <ZonePopupForm />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
