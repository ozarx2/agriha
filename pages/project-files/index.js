import Head from "next/head";
import React, { useRef, useState, useEffect, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import Navbar from "../../components/common/navbar";
import Sidebar from "../../components/common/sidebar";
import MobileSidebar from "../../components/common/mobile-sidebar";
import ProjectFilesMain from "../../components/project-files/main";
import AddProject from "../../components/common/addproject";
import LogoutPopup from "../../components/common/logout-popup";
import NotificationPopup from "../../components/common/notification-popup";
import FolderPopup from "../../components/project-files/folder-popup";
import AddProjectImage from "../../components/common/add-project-image";

import styles from "./index.module.css";

export default function ArchitectDashboard() {
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
    } else {
      window.location.href = "/";
    }
  }, []);

  const [Store] = useContext(StoreContext);

  const addProject = Store.addProject;
  const menu = Store.menu;
  const logout = Store.logout;
  const notificationPopup = Store.notificationPopup;
  const addProjectImagePopup = Store.addProjectImagePopup;

  const [folderPopup, setFolderPopup] = useState(false);

  return (
    <>
      <Head>
        <title>Project Files - Architect Dashboard</title>
        <meta name="description" content="Project Files - Architect Dashboard" />
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
              <ProjectFilesMain setFolderPopup={setFolderPopup} />
            </div>
          </div>
          {addProject ? <AddProject /> : ""}
          {logout ? <LogoutPopup /> : ""}
          {notificationPopup ? <NotificationPopup /> : ""}
          {folderPopup ? <FolderPopup folderPopup={folderPopup} setFolderPopup={setFolderPopup} /> : ""}
          {addProjectImagePopup ? <AddProjectImage /> : ""}
        </div>
      </div>
    </>
  );
}
