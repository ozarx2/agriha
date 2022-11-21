/* eslint-disable @next/next/no-img-element */
import React, { useState, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";

import styles from "./ongoing-popup.module.css";

export default function OngoingPopup() {
  const [Store] = useContext(StoreContext);

  const setOngoingPopup = Store.setOngoingPopup;
  const ongoingData = Store.ongoingId;

  console.log(ongoingData);

  return (
    <>
      <div className={styles.OngoingPopupOuter}>
        <div
          onClick={() => setOngoingPopup(false)}
          className={styles.OngoingPopupClose}
        ></div>
        <div className={styles.OngoingPopupInner}>
          <div className={styles.heading}>
            <div className={styles.headingLeft}>
              <img src="/img/ongoing-project/profile.jpg" alt="profile" />
              <div className={styles.imageRight}>
                <div className={styles.main}>{ongoingData?.project_name}</div>
                <div className={styles.sub}>{ongoingData?.creator?.name}</div>
              </div>
            </div>
            <div className={styles.headingRight}>
              <button>{ongoingData?.project_type}</button>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.sone}>
              <div className={styles.left}>
                <div className={styles.main}>Project starting</div>
                <div className={styles.sub}>{ongoingData?.starting_date}</div>
              </div>
              <div className={styles.right}>
                {/*  <div className={styles.send}>
                  <img src="/img/ongoing-project/send-d.svg" alt="send" />
                  <span>Send product</span>
                </div> */}
                <div className={styles.files}>
                  <img src="/img/ongoing-project/file-d.svg" alt="file" />
                  <span>Files</span>
                </div>
              </div>
            </div>
            <div className={styles.stwo}>
              <div className={styles.label}>Total area</div>
              <div className={styles.feildValue}>2500 sqft</div>
              <div className={styles.label}>Total budget</div>
              <div className={styles.feildValue}>50,00000</div>
              {/* <div className={styles.label}>label</div>
              <div className={styles.feildValue}>2</div>
              <div className={styles.label}>label</div>
              <div className={styles.feildValue}>4</div>
              <div className={styles.label}>label</div>
              <div className={styles.feildValue}>4</div> */}
            </div>
            <div className={styles.sthree}>
              <div
                onClick={() => setOngoingPopup(false)}
                className={styles.back}
              >
                Back
              </div>
              <div className={styles.send}>Send documents</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
