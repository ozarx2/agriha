/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useState, useEffect, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import { useRouter } from "next/router";
import windowSize from "../windowRes";

import styles from "./architect-bid-popup.module.css";

export default function ArchitectBidPopup() {
  const windowRes = windowSize();

  const [Store] = useContext(StoreContext);
  const setArchitectBidtPopup = Store.setArchitectBidtPopup;

  return (
    <>
      <div id="ArchitectSelectPopupOuter" className={styles.ArchitectSelectPopupOuter}>
        <div onClick={() => setArchitectBidtPopup(false)} className={styles.ArchitectSelectPopupClose}></div>
        <div className={styles.ArchitectSelectPopupInner}>
          {windowRes.innerWidth >= 767 ? (
            <div className={styles.desktop}>{ArchitectSelectPopupContent()}</div>
          ) : (
            <div className={styles.mobile}>{ArchitectSelectPopupContent()}</div>
          )}
        </div>
      </div>
    </>
  );
}

const ArchitectSelectPopupContent = () => {
  const [Store] = useContext(StoreContext);
  const setBidArchitectId = Store.setBidArchitectId;
  const setBid = Store.setBid;
  const setArchitectBidtPopup = Store.setArchitectBidtPopup;

  const router = useRouter();

  const sentRequirementBid = () => {
    setBidArchitectId(null);
    setBid(true);
    router.push("/requirement/basic-details");
  };

  return (
    <>
      <div className={styles.popupouter}>
        <div className={styles.profiles}>
          {/* <img
            src={
              projectDetails?.architect_id?.profilepic
                ? projectDetails?.architect_id?.profilepic
                : "/img/landing/profile_img.svg"
            }
            alt="profile"
          /> */}
          <div className={styles.content}>
            <div className={styles.name}>invite for quote</div>
            <br />
            <div className={styles.msg}>
              share your requirements to all architects and get quotes for your project.
              <br />
              {/* <br /> Do you want to continue ? */}
            </div>
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.buttons}>
          <div className={styles.back} onClick={() => setArchitectBidtPopup(false)}>
            Go to back
          </div>
          <div className={styles.continue} onClick={sentRequirementBid}>
            Continue
          </div>
        </div>
      </div>
    </>
  );
};
