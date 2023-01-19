/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import { useRouter } from "next/router";
import api_url from "../../src/utils/url";
import windowSize from "../windowRes";

import styles from "./architect-select-popup.module.css";

export default function ArchitectSelectPopup() {
  const windowRes = windowSize();

  const [Store] = useContext(StoreContext);
  const setArchitectSelectPopup = Store.setArchitectSelectPopup;

  return (
    <>
      <div id="ArchitectSelectPopupOuter" className={styles.ArchitectSelectPopupOuter}>
        <div onClick={() => setArchitectSelectPopup(false)} className={styles.ArchitectSelectPopupClose}></div>
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
  const setArchitectSelectPopup = Store.setArchitectSelectPopup;

  const router = useRouter();
  const { id } = router.query;

  const [projectId, setProjectId] = useState("");

  /* GET ARCHITECT ID */
  function getParameters() {
    let urlString = window.location.href;
    let paramString = urlString.split("/")[4];
    let queryString = new URLSearchParams(paramString);
    for (let pair of queryString.entries()) {
      setProjectId(pair[0]);
    }
  }

  useEffect(() => {
    getParameters();
  }, [id]);

  /* GET PROJECT DETAILS */
  const [projectDetails, setProjectDetails] = useState([]);
  async function getProjects() {
    const res = await fetch(`${api_url}/projects/arcprojectsingle/${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // console.log(data[0]);
    setProjectDetails(data[0]);
  }

  useEffect(() => {
    if (projectId !== "") {
      getProjects();
    }
  }, [projectId]);

  const sentRequirement = (id) => {
    setBidArchitectId(id);
    setBid(false);

    router.push("/requirement/basic-details");
  };

  return (
    <>
      <div className={styles.popupouter}>
        <div className={styles.profiles}>
          <img
            src={
              projectDetails?.architect_id?.profilepic
                ? projectDetails?.architect_id?.profilepic
                : "/img/landing/profile_img.svg"
            }
            onError={(e) => (e.target.src = "/img/landing/profile_img.svg")}
            alt="profile"
          />
          <div className={styles.content}>
            <div className={styles.name}>
              {projectDetails?.architect_id?.firstname !== undefined
                ? projectDetails?.architect_id?.firstname + " " + projectDetails?.architect_id?.lastname
                : projectDetails?.architect_id?.registered_id?.name}
            </div>
            <div className={styles.msg}>You have now selected this architect and you want to continue</div>
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.buttons}>
          <div className={styles.back} onClick={() => setArchitectSelectPopup(false)}>
            Go to back
          </div>
          <div className={styles.continue} onClick={() => sentRequirement(projectDetails?.architect_id?._id)}>
            Continue
          </div>
        </div>
      </div>
    </>
  );
};
