import Head from "next/head";
import { useRouter } from "next/router";
import React, { useRef, useState, useEffect, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import Navbar from "../../components/common/navbar";
import Sidebar from "../../components/common/sidebar";
import MobileSidebar from "../../components/common/mobile-sidebar";
import AddProject from "../../components/common/addproject";
import LogoutPopup from "../../components/common/logout-popup";
import NotificationPopup from "../../components/common/notification-popup";
import AddProjectImage from "../../components/common/add-project-image";
import ProjectFolderFilesMain from "../../components/project-files/folderMain";

import styles from "./index.module.css";

export default function ArchitectDashboardFilesSingle() {
  const router = useRouter();
  useEffect(() => {
    const userId = localStorage.getItem("architectId");
    if (userId) {
    } else {
      router.push("/");
    }
  }, []);

  const [Store] = useContext(StoreContext);

  const addProject = Store.addProject;
  const menu = Store.menu;
  const logout = Store.logout;
  const notificationPopup = Store.notificationPopup;
  const addProjectImagePopup = Store.addProjectImagePopup;

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
              <ProjectFolderFilesMain />
            </div>
          </div>
          {addProject ? <AddProject /> : ""}
          {logout ? <LogoutPopup /> : ""}
          {notificationPopup ? <NotificationPopup /> : ""}
          {addProjectImagePopup ? <AddProjectImage /> : ""}
        </div>
      </div>
    </>
  );
}
