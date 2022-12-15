/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import api_url from "../../src/utils/url";
import windowSize from "../windowRes";

import styles from "./architect-select-popup.module.css";

export default function BidArchitectSelectPopup() {
  const windowRes = windowSize();

  const [Store] = useContext(StoreContext);
  const setBidArchitectSelectPopup = Store.setBidArchitectSelectPopup;

  return (
    <>
      <div id="ArchitectSelectPopupOuter" className={styles.ArchitectSelectPopupOuter}>
        <div onClick={() => setBidArchitectSelectPopup(false)} className={styles.ArchitectSelectPopupClose}></div>
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
  const setBidArchitectSelectPopup = Store.setBidArchitectSelectPopup;
  const displayBidItems = Store.displayBidItems;
  const displayBidArchitet = Store.displayBidArchitet;

  // console.log(displayBidArchitet);

  const router = useRouter();

  /* ACCEPT REQUEST */
  async function acceptRequest(id, archid) {
    var token = localStorage.getItem("userToken");

    const res = await fetch(`${api_url}/projects/accept/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        architect_id: archid,
        status: "ongoing",
      }),
    });

    const data = await res.json();
    console.log(data);
    if (data.projectdata.status === "ongoing") {
      router.push("/my-bid");
    }
  }

  // SELECT ARCHITECT BID
  async function selectArchitcect(id, archid, projectId) {
    const response = await fetch(`${api_url}/quotation/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        architect_id: archid,
        status: "ongoing",
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.status === "ongoing") {
      acceptRequest(projectId, archid);
    }
  }

  return (
    <>
      <div className={styles.popupouter}>
        <div className={styles.profiles}>
          <img
            src={displayBidArchitet?.profilepic ? displayBidArchitet?.profilepic : "/img/landing/profile_img.svg"}
            onError={(e) => (e.target.src = "/img/landing/profile_img.svg")}
            alt="profile"
          />
          <div className={styles.content}>
            <div className={styles.name}>{displayBidArchitet?.firstname + " " + displayBidArchitet?.lastname}</div>
            <div className={styles.msg}>You have now selected this architect and you want to continue</div>
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.buttons}>
          <div className={styles.back} onClick={() => setBidArchitectSelectPopup(false)}>
            Go to back
          </div>
          <div
            className={styles.continue}
            onClick={() =>
              selectArchitcect(displayBidItems._id, displayBidItems.architect_id, displayBidItems.project_id)
            }
          >
            Continue
          </div>
        </div>
      </div>
    </>
  );
};
