/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { StoreContext } from "../../components/StoreContext";
import windowSize from "../windowRes";

import styles from "./share-popup.module.css";

export default function ShareProjectPopup({ id }) {
  const windowRes = windowSize();

  const [Store] = useContext(StoreContext);
  const setSharePopup = Store.setSharePopup;

  const [url, setUrl] = useState("");
  useEffect(() => {
    setUrl(`https://agriha.com/project-details/${id}`);
  }, []);

  // console.log(id);

  return (
    <>
      <div id="ArchitectSelectPopupOuter" className={styles.ArchitectSelectPopupOuter}>
        <div onClick={() => setSharePopup(false)} className={styles.ArchitectSelectPopupClose}></div>
        <div className={styles.ArchitectSelectPopupInner}>
          <div className={windowRes.innerWidth >= 767 ? styles.desktop : styles.mobile}>
            {ArchitectSelectPopupContentOne({ url })}
          </div>
        </div>
      </div>
    </>
  );
}

const ArchitectSelectPopupContentOne = ({ url }) => {
  const [Store] = useContext(StoreContext);
  const setSharePopup = Store.setSharePopup;
  const sharePopup = Store.sharePopup;

  const [copy, setCopy] = useState(false);

  const copiedlink = () => {
    setCopy(true);
    setTimeout(function () {
      setSharePopup(false);
      setCopy(false);
    }, 1000);
    clearTimeout();
  };

  return (
    <>
      <div className={styles.popupouter}>
        <div className={styles.popupinner}>
          <h4>Share to social media platform</h4>
          <div className={styles.social}>
            <WhatsappShareButton url={url}>
              <img src="/img/icons/w.svg" alt="WhatsApp" />
              <span>WhatsApp</span>
            </WhatsappShareButton>
            <TwitterShareButton url={url}>
              <img src="/img/icons/t.svg" alt="Twitter" />
              <span>Twitter</span>
            </TwitterShareButton>
            <FacebookShareButton url={url}>
              <img src="/img/icons/f.svg" alt="Facebook" />
              <span>Facebook</span>
            </FacebookShareButton>
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
