/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { StoreContext } from "../../components/StoreContext";
import windowSize from "../windowRes";

import styles from "./share-popup.module.css";

export default function SharePopup() {
  const windowRes = windowSize();

  const [Store] = useContext(StoreContext);
  const setSharePopup = Store.setSharePopup;

  const [url, setUrl] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  return (
    <>
      <div id="ArchitectSelectPopupOuter" className={styles.ArchitectSelectPopupOuter}>
        <div onClick={() => setSharePopup(false)} className={styles.ArchitectSelectPopupClose}></div>
        <div className={styles.ArchitectSelectPopupInner}>
          {windowRes.innerWidth >= 767 ? (
            <div className={styles.desktop}>{ArchitectSelectPopupContent({ url })}</div>
          ) : (
            <div className={styles.mobile}>{ArchitectSelectPopupContent({ url })}</div>
          )}
        </div>
      </div>
    </>
  );
}

const ArchitectSelectPopupContent = ({ url }) => {
  const [Store] = useContext(StoreContext);
  const setSharePopup = Store.setSharePopup;

  const [copy, setCopy] = useState(false);

  const copiedlink = () => {
    setCopy(true);
    setInterval(function () {
      setSharePopup(false);
    }, 1000);
  };

  return (
    <>
      <div className={styles.popupouter}>
        <div className={styles.popupinner}>
          <h4>Share to social media platform</h4>
          <div className={styles.social}>
            <a target="_blank" href={`https://web.whatsapp.com/send?text=${url}`}>
              <img src="/img/icons/w.svg" alt="WhatsApp" />
              <span>WhatsApp</span>
            </a>
            <a target="_blank" href={`https://twitter.com/share?text=&url=${url}`}>
              <img src="/img/icons/t.svg" alt="WhatsApp" />
              <span>Twitter</span>
            </a>
            <a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}>
              <img src="/img/icons/f.svg" alt="WhatsApp" />
              <span>Facebook</span>
            </a>
          </div>
          <div className={styles.url}>
            <input id="urlInput" type="text" value={url} readonly />
            <CopyToClipboard text={url} onCopy={() => copiedlink()}>
              <a>Copy link</a>
            </CopyToClipboard>
          </div>
          {copy ? <div className={styles.copy}>Link copied to clipboard</div> : ""}
        </div>
        <div className={styles.close} onClick={() => setSharePopup(false)}>
          <img src="/img/architect-dashboard/modal/close.svg" alt="Close" />
        </div>
      </div>
    </>
  );
};
