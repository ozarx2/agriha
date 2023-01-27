import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import Navbar from "../../components/common/navbar";
import Sidebar from "../../components/common/sidebar";
import MobileSidebar from "../../components/common/mobile-sidebar";
import SingleOngoingProjectsMain from "../../components/ongoing-project/single-project";
import AddProject from "../../components/common/addproject";
import OngoingPopup from "../../components/common/ongoing-popup";
import ProjectRequestPopup from "../../components/common/project-request-popup";
import LogoutPopup from "../../components/common/logout-popup";
import NotificationPopup from "../../components/common/notification-popup";
import AddProjectImage from "../../components/common/add-project-image";
import FileUploadPopup from "../../components/common/file-upload-popup";

import styles from "./index.module.css";
import PaymentPopup from "../../components/ongoing-project/paymentPopup";

export default function ArchitectDashboard() {
  const [Store] = useContext(StoreContext);

  const addProject = Store.addProject;
  const menu = Store.menu;
  const logout = Store.logout;
  const notificationPopup = Store.notificationPopup;
  const addProjectImagePopup = Store.addProjectImagePopup;
  const fileUploadPopup = Store.fileUploadPopup;
  const ongoingPopup = Store.ongoingPopup;
  const arcDashQueue = Store.arcDashQueue;

  const paymentPopup = Store.paymentPopup;

  const [projectRequestPopup, setProjectRequestPopup] = useState(false);
  const [page, setPage] = useState("ongoing");

  const router = useRouter();
  useEffect(() => {
    const userId = localStorage.getItem("architectId");
    if (userId) {
    } else {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    arcDashQueue ? setPage("request") : setPage("ongoing");
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
              <SingleOngoingProjectsMain />
            </div>
          </div>
          {addProject ? <AddProject /> : ""}
          {ongoingPopup ? <OngoingPopup /> : ""}
          {projectRequestPopup ? <ProjectRequestPopup setProjectRequestPopup={setProjectRequestPopup} /> : ""}
          {logout ? <LogoutPopup /> : ""}
          {notificationPopup ? <NotificationPopup /> : ""}
          {fileUploadPopup ? <FileUploadPopup /> : ""}
          {addProjectImagePopup ? <AddProjectImage /> : ""}
          {paymentPopup ? <PaymentPopup /> : ""}
        </div>
      </div>
    </>
  );
}
