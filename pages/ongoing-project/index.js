import Head from "next/head";
import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import Navbar from "../../components/common/navbar";
import Sidebar from "../../components/common/sidebar";
import MobileSidebar from "../../components/common/mobile-sidebar";
import OngoingProjectMain from "../../components/ongoing-project/main";
import AddProject from "../../components/common/addproject";
import OngoingPopup from "../../components/common/ongoing-popup";
import ProjectRequestPopup from "../../components/common/project-request-popup";
import LogoutPopup from "../../components/common/logout-popup";
import NotificationPopup from "../../components/common/notification-popup";
import AddProjectImage from "../../components/common/add-project-image";
import FileUploadPopup from "../../components/common/file-upload-popup";

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

  const [projectRequestPopup, setProjectRequestPopup] = useState(false);
  const [page, setPage] = useState("ongoing");

  function getParameters() {
    let urlString = window.location.href;
    let paramString = urlString.split("/")[4];
    let queryString = new URLSearchParams(paramString);
    for (let pair of queryString.entries()) {
      if (pair[0] === "request") {
        setPage("request");
      }
      localStorage.setItem("architectId", pair[0]);
      console.log(pair[0]);
    }
  }

  useEffect(() => {
    getParameters();
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
              <OngoingProjectMain
                page={page}
                setPage={setPage}
                setProjectRequestPopup={setProjectRequestPopup}
              />
            </div>
          </div>
          {addProject ? <AddProject /> : ""}
          {ongoingPopup ? <OngoingPopup /> : ""}
          {projectRequestPopup ? (
            <ProjectRequestPopup
              setProjectRequestPopup={setProjectRequestPopup}
            />
          ) : (
            ""
          )}
          {logout ? <LogoutPopup /> : ""}
          {notificationPopup ? <NotificationPopup /> : ""}
          {fileUploadPopup ? <FileUploadPopup /> : ""}
          {addProjectImagePopup ? <AddProjectImage /> : ""}
        </div>
      </div>
    </>
  );
}
