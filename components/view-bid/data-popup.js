import React, { useState } from "react";
import { useContext } from "react";
import api_url from "../../src/utils/url";
import { StoreContext } from "../StoreContext";
import styles from "./data-popup.module.css";
import { useRouter } from "next/router";

export default function DataPopup({ setIsQuoted }) {
  const [Store] = useContext(StoreContext);

  const setBidDataPopup = Store.setBidDataPopup;
  const architectId = Store.architectId;
  const bidUserId = Store.bidUserId;

  const router = useRouter();
  const { bid } = router.query;
  const projectId = bid;

  const [quote, setQuote] = useState("");
  const [emptyQuote, setEmptyQuote] = useState(false);
  const [sendActive, setSendActive] = useState(true);

  const goBackClick = () => {
    setBidDataPopup(false);
    // setIsQuoted(false);
  };

  const termsClick = () => {
    window.location.href = "/terms";
  };

  const privacyPolicyClick = () => {
    window.location.href = "/privacypolicy";
  };

  async function sendClick() {
    if (quote !== "") {
      setSendActive(false);
      const res = await fetch(`${api_url}/quotation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project_id: projectId,
          architect_id: architectId,
          quote: quote,
          user_id: bidUserId,
          status: "quoted",
        }),
      });
      const data = await res.json();
      if (data.status === 200) {
        setIsQuoted(true);
        setBidDataPopup(false);
      } else {
        setSendActive(true);
        setEmptyQuote(false);
      }
    } else {
      setEmptyQuote(true);
    }
  }

  return (
    <>
      <div className={styles.FolderPopupOuter}>
        <div className={styles.FolderPopupInner}>
          <div className={styles.title}>
            Fill data <span>*</span>
          </div>
          <div className={styles.inputContainer}>
            <input type="tel" onChange={(e) => setQuote(e.target.value)} placeholder="Enter your amount per sqft" />
            {emptyQuote ? <p>Please enter amount</p> : ""}
          </div>
          <div className={styles.agreeContainer}>
            <p>
              By continuing, you agree to Arclif&apos;s <span onClick={termsClick}>Terms of Service</span> and{" "}
              <span onClick={privacyPolicyClick}>Privacy policy</span>.
            </p>
          </div>
          <div className={styles.buttonContainer}>
            <div className={styles.goBack_button} onClick={goBackClick}>
              Go back
            </div>
            {sendActive ? (
              <div className={styles.send_button} onClick={sendClick}>
                Send
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}
