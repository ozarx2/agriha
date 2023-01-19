/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../components/StoreContext";
import { useRouter } from "next/router";
import windowSize from "../windowRes";

import styles from "../user-common/architect-bid-popup.module.css";
import api_url from "../../src/utils/url";

export default function SentRequirementPopup() {
  const windowRes = windowSize();

  const [Store] = useContext(StoreContext);
  const setRequirementPopup = Store.setRequirementPopup;
  const bidArchitectId = Store.bidArchitectId;

  const [architect, setArchitect] = useState([]);

  /* GET ARCHITECT DATA */
  async function getArchitect() {
    var token = localStorage.getItem("architectToken");

    const res = await fetch(`${api_url}/architects/${bidArchitectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setArchitect(data);
  }

  const getArchitectBid = () => {
    console.log(bidArchitectId);
    if (bidArchitectId !== null) {
      getArchitect();
    }
  };

  useEffect(() => {
    getArchitectBid();
  }, [bidArchitectId]);

  return (
    <>
      <div id="ArchitectSelectPopupOuter" className={styles.ArchitectSelectPopupOuter}>
        <div onClick={() => setRequirementPopup(false)} className={styles.ArchitectSelectPopupClose}></div>
        <div className={styles.ArchitectSelectPopupInner}>
          {windowRes.innerWidth >= 767 ? (
            <div className={styles.desktop}>{ArchitectSelectPopupContent(architect)}</div>
          ) : (
            <div className={styles.mobile}>{ArchitectSelectPopupContent(architect)}</div>
          )}
        </div>
      </div>
    </>
  );
}

const ArchitectSelectPopupContent = (architect) => {
  const [Store] = useContext(StoreContext);
  const bid = Store.bid;

  console.log(bid);
  const setRequirementPopup = Store.setRequirementPopup;

  const router = useRouter();

  const sentRequirement = () => {
    if (bid) {
      router.push("/my-bid");
    } else {
      router.push("/user-my-project");
    }
  };

  console.log(architect);

  return (
    <>
      <div className={styles.popupouter}>
        <div className={styles.profiles}>
          <div className={styles.content}>
            <div className={styles.name}>Successfully created your Project</div>
            <br />
            {bid ? (
              <div className={styles.msg}>
                Shared your requirements to all architects.
                <br />
              </div>
            ) : (
              <div className={styles.msg}>
                Shared your requirements to <span style={{ color: "#642dda" }}>{architect?.registered_id?.name}</span>
                <br />
              </div>
            )}
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.buttons}>
          {/* <div className={styles.back} onClick={() => setRequirementPopup(false)}>
            Go to back
          </div> */}
          <div className={styles.continue} onClick={sentRequirement}>
            Continue
          </div>
        </div>
      </div>
    </>
  );
};
