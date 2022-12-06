import React, { useState } from "react";
import { useContext } from "react";
import api_url from "../../src/utils/url";
import dummy_token from "../../src/utils/dummy_token";
import { StoreContext } from "../StoreContext";
import styles from "./data-popup.module.css";
import { useRouter } from "next/router";

export default function DataPopup() {
  const [Store] = useContext(StoreContext);

  const setBidDataPopup = Store.setBidDataPopup;
  const architectId = Store.architectId;
  const bidUserId = Store.bidUserId;

  const router = useRouter();
  const { bid } = router.query;
  const projectId = bid;

  const [quote, setQuote] = useState();

  const goBackClick = () => {
    setBidDataPopup(false);
  };

  const termsClick = () => {
    window.location.href = "/terms";
  };

  const privacyPolicyClick = () => {
    window.location.href = "/privacypolicy";
  };

  async function sendClick() {
    console.log(architectId);
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
        status: "started",
      }),
    });
    const data = await res.json();
    console.log(data);
  }

  return (
    <>
      <div className={styles.FolderPopupOuter}>
        <div className={styles.FolderPopupInner}>
          <div className={styles.title}>
            Fill data <span>*</span>
          </div>
          <div className={styles.inputContainer}>
            <input type="tel" onChange={(e) => setQuote(e.target.value)} placeholder="Enter your amount" />
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
            <div className={styles.send_button} onClick={sendClick}>
              Send
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
