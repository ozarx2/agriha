/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import React, { useContext, useEffect } from "react";

import { StoreContext } from "../../components/StoreContext";
import Navbar from "../../components/common/navbar";
import Sidebar from "../../components/common/sidebar";
import MobileSidebar from "../../components/common/mobile-sidebar";
import ArchitectDashboardMain from "../../components/architect-dashboard/main";
import AddProject from "../../components/common/addproject";
import LogoutPopup from "../../components/common/logout-popup";
import NotificationPopup from "../../components/common/notification-popup";
import AddProjectImage from "../../components/common/add-project-image";
import FileUploadPopup from "../../components/common/file-upload-popup";
import OngoingPopup from "../../components/common/ongoing-popup";
import SearchPopUp from "../../components/common/search-popup";
import styles from "./index.module.css";

export default function ArchitectDashboard() {
  const [Store] = useContext(StoreContext);

  const addProject = Store.addProject;
  const menu = Store.menu;
  const logout = Store.logout;
  const notificationPopup = Store.notificationPopup;
  const addProjectImagePopup = Store.addProjectImagePopup;
  const fileUploadPopup = Store.fileUploadPopup;
  const ongoingPopup = Store.ongoingPopup;
  const searchpopup = Store.searchpopup;

  /* GET ARCHITECT ID */
  function getParameters() {
    let urlString = window.location.href;
    let paramString = urlString.split("/")[4];
    let queryString = new URLSearchParams(paramString);
    for (let pair of queryString.entries()) {
      localStorage.setItem("architectId", pair[0]);
    }
  }

  useEffect(() => {
    getParameters();
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
    } else {
      window.location.href = "/";
    }
  }, []);

  return (
    <>
      <Head>
        <title>Architect Dashboard</title>
        <meta name="description" content="Architect Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className={styles.container_outer}>
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
              <ArchitectDashboardMain />
            </div>
          </div>
          {addProject ? <AddProject /> : ""}
          {logout ? <LogoutPopup /> : ""}
          {notificationPopup ? <NotificationPopup /> : ""}
          {addProjectImagePopup ? <AddProjectImage /> : ""}
          {fileUploadPopup ? <FileUploadPopup /> : ""}
          {ongoingPopup ? <OngoingPopup /> : ""}
          {searchpopup ? <SearchPopUp /> : ""}
        </div>
      </div>
    </>
  );
}
