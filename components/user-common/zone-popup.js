/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import ZonePopupForm from "./zone-form";
import windowSize from "../windowRes";

import styles from "./zone-popup.module.css";

export default function ZonePopup() {
  const [Store] = useContext(StoreContext);

  const setZonePopUp = Store.setZonePopUp;
  const zonePopup = Store.zonePopup;

  const windowRes = windowSize();

  return (
    <>
      <div id="zonePopupOuter" className={styles.RegisterPopupOuter}>
        <div
          onClick={() => setZonePopUp(false)}
          className={styles.RegisterPopupClose}
        ></div>
        <div className={styles.RegisterPopupInner}>
          {windowRes.innerWidth >= 767 ? (
            <div className={styles.desktop_header}>
              <div className={styles.header_inner}>
                <div
                  onClick={() => setZonePopUp(false)}
                  className={styles.left}
                >
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
              <div
                className={`container ${styles.container} ${styles.header_container}`}
              >
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
                      <div className={styles.texttwo}>
                        Select your Zone to finish Registration
                      </div>
                    </div>
                  </div>
                  <ZonePopupForm />
                </div>
              </div>
            </>
          ) : (
            <div className={styles.content_outer}>
              <div
                className={`container ${styles.container} ${styles.content}`}
              >
                <div className={styles.content_inner}>
                  <div className={styles.sone}>
                    <div
                      onClick={() => setZonePopUp(false)}
                      className={styles.back}
                    >
                      <img src="/img/project-details/back.svg" alt="back" />
                    </div>
                    <div className={styles.text}>
                      <div className={styles.textone}>Zone Selection</div>
                      <div className={styles.texttwo}>
                        Select your Zone to finish Registration
                      </div>
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
