/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import Link from "next/link";

import styles from "./navbar.module.css";
import api_url from "../../src/utils/url";

export default function Navbar() {
  const router = useRouter();

  const [Store] = useContext(StoreContext);

  const setAddProject = Store.setAddProject;
  const setMenu = Store.setMenu;
  const setNotificationPopup = Store.setNotificationPopup;
  /* const setSearchpopup = Store.setSearchpopup; */
  const architectId = Store.architectId;
  const setActivityLog = Store.setActivityLog;
  const setArchitectId = Store.setArchitectId;
  const setUserProjects = Store.setUserProjects;
  const setUserProjectsDetails = Store.setUserProjectsDetails;
  const setProjects = Store.setProjects;
  const setArchitect = Store.setArchitectData;
  const setAllBidArchitect = Store.setAllBidArchitect;

  const [notification, setNotification] = useState(false);
  const [path, setPath] = useState("Overview");

  useEffect(() => {
    if (router.pathname == "/architect-dashboard") {
      setPath("Overview");
    } else if (router.pathname == "/my-projects") {
      setPath("My Projects");
    } else if (router.pathname == "/my-projects/[id]") {
      setPath("My Projects");
    } else if (router.pathname == "/ongoing-project") {
      setPath("Ongoing project");
    } else if (router.pathname == "/project-files") {
      setPath("Project files");
    } else if (router.pathname == "/view-bid") {
      setPath("View Bid");
    } else if (router.pathname == "/view-bid/[id]") {
      setPath("View Bid");
    } else if (router.pathname == "/dashboard-settings") {
      setPath("Settings");
    } else {
      setPath("Dashboard");
    }
  }, []);

  /* GET ARCHITECT ID */
  function getParameters() {
    let urlString = window.location.href;
    let paramString = urlString.split("/")[4];
    let queryString = new URLSearchParams(paramString);
    for (let pair of queryString.entries()) {
      localStorage.setItem("architectId", pair[0]);
      setArchitectId(pair[0]);
    }
  }

  useEffect(() => {
    var id = localStorage.getItem("architectId");
    if (id !== null) {
      setArchitectId(id);
    } else {
      getParameters();
    }
  }, []);

  /* GET ARCHITECT DATA */
  async function getArchitect() {
    var token = localStorage.getItem("userToken");

    const res = await fetch(`${api_url}/architects/${architectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setArchitect(data);
  }

  /* GET ARCHITECT PROJECTS */
  async function getProjects() {
    var token = localStorage.getItem("userToken");

    const res = await fetch(`${api_url}/projects/${architectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (data.statusCode !== 500) {
      setProjects(data);
    }
  }

  /* GET USER PROJECTS */
  async function getAssignedProjects() {
    var token = localStorage.getItem("userToken");

    const res = await fetch(`${api_url}/projects/singleuserproject/${architectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    // console.log(data);
    setUserProjects(data?.dataresp?.data);
    setUserProjectsDetails(data?.dataresp?.details);
  }

  /* GET ALL BID */
  async function getAllBid() {
    const res = await fetch(`${api_url}/projects/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setAllBidArchitect(data.projects);
  }

  useEffect(() => {
    if (architectId !== "") {
      getArchitect();
      getProjects();
      getAssignedProjects();
      getAllBid();
    }
  }, [architectId]);

  /* GET ACTIVITY LOG */
  async function getActivityLog() {
    var token = localStorage.getItem("userToken");

    const res = await fetch(`${api_url}/activitylog/${architectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setActivityLog(data?.activitylog);
    if (data?.activitylog?.length > 0) {
      setNotification(true);
    } else {
      setNotification(false);
    }
  }

  useEffect(() => {
    if (architectId !== "") {
      getActivityLog();
    }
  }, [architectId]);

  return (
    <>
      <div className={styles.navbar_outer}>
        <div className={styles.start}>
          {router.pathname == "/my-projects/[id]" ? (
            <div className={styles.back}>
              <img src="/img/architect-dashboard/back.svg" alt="back.jpg" />
              <Link href="/my-projects" passHref>
                <span>Back</span>
              </Link>
            </div>
          ) : router.pathname == "/view-bid/[bid]" ? (
            <div className={styles.back}>
              <img src="/img/architect-dashboard/back.svg" alt="back.jpg" />
              <Link href="/view-bid" passHref>
                <span>Back</span>
              </Link>
            </div>
          ) : (
            ""
          )}

          <h5>{path}</h5>
        </div>
        <div className={styles.end}>
          <div className={styles.search}>
            {/* <div className={styles.searchBox}>
              <input
                onChange={() => setSearchpopup(true)}
                type="text"
                placeholder="What would you like to do ?"
              />
              <img
                src="/img/architect-dashboard/navbar/search.svg"
                className={styles.searchIcon}
                alt="search.jpg"
              />
            </div> */}
            <div className={styles.boxes}>
              <a href="tel:8921244492">
                <div className={styles.callBox}>
                  <img className={styles.call_nh} src="/img/architect-dashboard/navbar/call-nh.svg" alt="call.svg" />
                  <img className={styles.call_h} src="/img/architect-dashboard/navbar/call-h.svg" alt="call.svg" />
                </div>
              </a>
              <div onClick={() => setNotificationPopup(true)} className={styles.notificationBox}>
                {notification ? (
                  <>
                    <img className={styles.n_h} src="/img/architect-dashboard/navbar/n-ah.svg" alt="notification" />
                    <img className={styles.n_nh} src="/img/architect-dashboard/navbar/n-anh.svg" alt="notification" />
                  </>
                ) : (
                  <>
                    <img className={styles.n_h} src="/img/architect-dashboard/navbar/n-h.svg" alt="notification" />
                    <img className={styles.n_nh} src="/img/architect-dashboard/navbar/n-nh.svg" alt="notification" />
                  </>
                )}
              </div>
            </div>
            <button className={styles.btn} onClick={() => setAddProject(true)}>
              <img src="/img/architect-dashboard/add.svg" alt="" />
              Add project
            </button>
          </div>
        </div>
      </div>
      <div className={styles.navbar_mobile_outer}>
        <div className={styles.mobile_nav_first}>
          <div onClick={() => setMenu(true)}>
            <img src="/img/architect-dashboard/menu-bar.svg" alt="menu" />
          </div>
          <div>{path}</div>
          <div>
            <img src="/img/architect-dashboard/call-mobile.svg" alt="call" />
          </div>
        </div>
        {/* <div className={styles.mobile_nav_second}>
          <div className={styles.searchBox}>
            <input type="text" placeholder="What would you like to do ?" />
            <img src="/img/architect-dashboard/navbar/search.svg" className={styles.searchIcon} alt="search.jpg" />
          </div>
        </div> */}
      </div>
    </>
  );
}
