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
  const setRegisterPopup = Store.setRegisterPopup;
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
        "Access-Control-Allow-Origin": "*",
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

  const [getAllBid, setGetAllBid] = useState([]);
  async function getAllBidProjects() {
    const response = await fetch(`${api_url}/projects/unauth_bids`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const data = await response.json();
    // console.log(data);
    if (data) {
      // const oldDate = new Date((Math.floor(+new Date() / 1000) - 7 * 24 * 60 * 60) * 1000);
      // const bidData = data.data.filter((res) => new Date(res.createdAt) >= oldDate);
      const bidData = data.data;
      setGetAllBid(bidData);
    }
  }
  useEffect(() => {
    getAllBidProjects();
  }, []);

  // console.log(getAllBid);
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
                <div className={styles.sOneOuter}>
                  <div className={styles.sOneleft}>
                    <img src="/img/bid/gem.gif" alt="bid" />
                    <span>Bid share from arclif</span>
                    <a
                      href={
                        windowRes.innerWidth >= 1100
                          ? "https://web.whatsapp.com/send?phone=918921244492&submit=Continue"
                          : "https://api.whatsapp.com/send?phone=918921244492&submit=Continue"
                      }
                      target="_blank"
                    >
                      <button>Contact us</button>
                    </a>
                  </div>
                  <div className={styles.sOneRight}>
                    <div className={styles.sOneRightDate}>Date :{moment(Date()).format("lll")}</div>
                    <div className={styles.sOneRightBg}>
                      <div className={styles.sOneRightBid}>
                        Now Active bid : <span>{getAllBid.length}</span>
                      </div>
                      <button onClick={() => router.push(`/bid`)}>View all</button>
                    </div>
                  </div>
                </div>
                <div className={styles.sTwoOuter}>
                  <div className={styles.sTwoBid}>Latest bid details</div>
                  <table>
                    <tbody>
                      <tr>
                        <td>Project type</td>
                        <td>{bidData?.project_type}</td>
                      </tr>
                      <tr>
                        <td>Location</td>
                        <td>{bidData?.project_requirements[0].location}</td>
                      </tr>
                      <tr>
                        <td>Budget</td>
                        <td>₹ {bidData?.project_requirements[0]?.budget}</td>
                      </tr>
                      <tr>
                        <td>Area</td>
                        <td>{bidData?.project_requirements[0].area} sq.ft</td>
                      </tr>
                      <tr>
                        <td>Starting date</td>
                        <td>{moment(bidData?.createdAt).format("lll")}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div onClick={() => viewMoreClick()} className={styles.accept}>
                    Accept now
                  </div>
                  <div className={styles.message}>
                    Grow your business as an architect using Arclif Bid . Send your quote for the work mentioned above
                    by clicking the <span onClick={() => viewMoreClick()}>accept now button</span>.{" "}
                    <span onClick={() => setRegisterPopup(true)}>
                      Signup now to get Daily updates on new project leads posted by genuine customers.
                    </span>
                  </div>
                  <div onClick={() => router.push(`/`)} className={styles.about}>
                    Home
                  </div>
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
