/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { StoreContext } from "../../components/StoreContext";
import api_url from "../../src/utils/url";
import windowSize from "../windowRes";
import moment from "moment/moment";

import styles from "./main.module.css";
export default function AgrihaMyPublicBidMainSingle() {
  const windowRes = windowSize();
  const router = useRouter();
  const { id } = router.query;

  const [Store] = useContext(StoreContext);

  const setLoginPopup = Store.setLoginPopup;
  const setUserRole = Store.setUserRole;

  const [bidId, setBidId] = useState("");
  const [archToken, setArchToken] = useState("");

  /* GET ARCHITECT ID */
  function getParameters() {
    let urlString = window.location.href;
    let paramString = urlString.split("/")[4];
    let queryString = new URLSearchParams(paramString);
    for (let pair of queryString.entries()) {
      setBidId(pair[0]);
    }
  }

  useEffect(() => {
    getParameters();
  }, [id]);

  useEffect(() => {
    if (id !== null) {
      setBidId(id);
    } else {
      getParameters();
    }
  }, []);

  useEffect(() => {
    let token = localStorage.getItem("architectToken");
    setArchToken(token);
  }, []);

  const [bidData, setBidData] = useState([]);
  const [projectType, setProjectType] = useState("");
  const [projectRequirements, setProjectRequirements] = useState();

  async function getAllProjects() {
    // console.log(bidId);
    const response = await fetch(`${api_url}/projects/unauth_bids/${bidId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    // console.log(data);
    if (data.status === 200) {
      setBidData(data.data);
      setProjectType(data.data.project_type);
      setProjectRequirements(data.data.project_requirements);
    }
  }
  useEffect(() => {
    if (bidId) {
      getAllProjects();
    }
  }, [bidId]);

  // console.log(archToken);

  const viewMoreClick = () => {
    if (archToken !== null) {
      router.push(`/view-bid/${bidId}`);
    } else {
      setUserRole("architect");
      setLoginPopup(true);
    }
  };

  return (
    <>
      <div className={styles.main_outer}>
        <div className={`container ${styles.container} ${styles.bidAll}`}>
          {bidData.length !== 0 ? (
            <div className={styles.main_inner}>
              <div className={styles.bid_single_container}>
                <div className={styles.backButton} onClick={() => router.back()}>
                  <img src="/img/architect-dashboard/back.svg" alt="back.jpg" />
                  back
                </div>
                <div className={styles.bid_single_top}>
                  <div className={styles.bid_single_top__left}>
                    <h3>
                      <span>{bidData?.project_type}</span>
                    </h3>
                    <h4>
                      <span>{bidData?.project_name}</span>
                      <span className={styles.space}> | </span>
                      <span>{moment(bidData?.createdAt).format("lll")}</span>
                    </h4>
                  </div>
                  {/* <div className={styles.bid_single_top_right}>
                    <div className={styles.bid_single_ViewMoreButton} onClick={viewMoreClick}>
                      View More
                    </div>
                  </div> */}
                </div>
                <div className={styles.bid_single_bottom}>
                  {bidData?.thumbnail ? (
                    <a href={bidData?.thumbnail} target="_blank">
                      <img
                        src={bidData?.thumbnail}
                        onError={(e) => (e.target.src = "/img/landing/nophoto.jpg")}
                        alt="bid image"
                      />
                    </a>
                  ) : (
                    ""
                  )}
                  {projectRequirements ? (
                    <div className={styles.bid_single_bottom_right}>
                      <p>
                        Project Area: <span>{bidData?.project_requirements[0].area} sq.ft</span>
                      </p>
                      <p>
                        Project Budget: <span>{bidData?.project_requirements[0]?.budget}/-</span>
                      </p>
                      <p>
                        Project Location: <span>{bidData?.project_requirements[0].location}</span>
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className={styles.full_details}>
                  <img
                    src="/img/bid/blur.png"
                    onError={(e) => (e.target.src = "/img/landing/nophoto.jpg")}
                    alt="bid image"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.main_inner}>
              <div className={styles.loading}>
                <img src="/img/landing/loading.svg" alt="Loading..." />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
