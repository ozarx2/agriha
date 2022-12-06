import Head from "next/head";
import React, { useRef, useState, useEffect, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import Navbar from "../../components/common/navbar";
import Sidebar from "../../components/common/sidebar";
import MobileSidebar from "../../components/common/mobile-sidebar";
import MyProjectsMain from "../../components/my-projects/main";
import AddProject from "../../components/common/addproject";
import LogoutPopup from "../../components/common/logout-popup";
import NotificationPopup from "../../components/common/notification-popup";
import AddProjectImage from "../../components/common/add-project-image";

import styles from "./index.module.css";

export default function ArchitectDashboard() {
  const [Store] = useContext(StoreContext);

  const addProject = Store.addProject;
  const menu = Store.menu;
  const logout = Store.logout;
  const notificationPopup = Store.notificationPopup;
  const addProjectImagePopup = Store.addProjectImagePopup;

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
    } else {
      window.location.href = "/";
    }
  }, []);

  const [page, setPage] = useState("recent");

  return (
    <>
      <Head>
        <title>Architect Dashboard</title>
        <meta name="description" content="Architect Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className={styles.container_outer}>
          {/* <div className={`container ${styles.container} ${styles.dashboard}`}> */}
          <div className={styles.container_inner}>
            <div className={styles.sidebar}>
              <Sidebar />
            </div>
            {menu ? (
              <div className={styles.mobile_sidebar}>
                <MobileSidebar />
              </div>
            ) : (
              ""
            )}
            <div className={styles.main}>
              <Navbar />
              <MyProjectsMain page={page} setPage={setPage} />
            </div>
          </div>
          {/* </div> */}
          {addProject ? <AddProject /> : ""}
          {logout ? <LogoutPopup /> : ""}
          {notificationPopup ? <NotificationPopup /> : ""}
          {addProjectImagePopup ? <AddProjectImage /> : ""}
        </div>
      </div>
    </>
  );
}
