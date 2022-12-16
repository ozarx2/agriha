/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import { useRouter } from "next/router";
import api_url from "../../src/utils/url";
import windowSize from "../windowRes";

import styles from "./architect-select-popup.module.css";

export default function ArchitectSelectProfilePopup() {
  const windowRes = windowSize();

  const [Store] = useContext(StoreContext);
  const setArchitectProfileSelectPopup = Store.setArchitectProfileSelectPopup;

  return (
    <>
      <div id="ArchitectSelectPopupOuter" className={styles.ArchitectSelectPopupOuter}>
        <div onClick={() => setArchitectProfileSelectPopup(false)} className={styles.ArchitectSelectPopupClose}></div>
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
  const setArchitectProfileSelectPopup = Store.setArchitectProfileSelectPopup;

  const router = useRouter();
  const { id } = router.query;

  const [archId, setArchId] = useState("");

  /* GET ARCHITECT ID */
  function getParameters() {
    let urlString = window.location.href;
    let paramString = urlString.split("/")[4];
    let queryString = new URLSearchParams(paramString);
    for (let pair of queryString.entries()) {
      setArchId(pair[0]);
    }
  }

  useEffect(() => {
    getParameters();
  }, [id]);

  const [singleArchitect, setSingleArchitect] = useState([]);
  async function getSingleArchitect() {
    const token = localStorage.getItem("userToken");
    const res = await fetch(`${api_url}/architects/${archId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer ${dummy_token}`,
      },
    });
    const data = await res.json();
    setSingleArchitect(data);
  }

  useEffect(() => {
    if (archId !== "") {
      getSingleArchitect();
    }
  }, [archId]);

  const sentRequirement = (id) => {
    setBidArchitectId(id);
    setBid(false);

    router.push("/requirement/basic-details");
  };

  console.log(singleArchitect);

  return (
    <>
      <div className={styles.popupouter}>
        <div className={styles.profiles}>
          <img
            src={singleArchitect?.profilepic ? singleArchitect?.profilepic : "/img/landing/profile_img.svg"}
            onError={(e) => (e.target.src = "/img/landing/profile_img.svg")}
            alt="profile"
          />
          <div className={styles.content}>
            <div className={styles.name}>{singleArchitect?.firstname + " " + singleArchitect?.lastname}</div>
            <div className={styles.msg}>You have now selected this architect and you want to continue</div>
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.buttons}>
          <div className={styles.back} onClick={() => setArchitectProfileSelectPopup(false)}>
            Go to back
          </div>
          <div className={styles.continue} onClick={() => sentRequirement(archId)}>
            Continue
          </div>
        </div>
      </div>
    </>
  );
};
