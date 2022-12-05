import Head from "next/head";
import React, { useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import Navbar from "../../components/common/navbar";
import Sidebar from "../../components/common/sidebar";
import MobileSidebar from "../../components/common/mobile-sidebar";
import SingleBidMain from "../../components/view-bid/single-main";
import AddProject from "../../components/common/addproject";
import LogoutPopup from "../../components/common/logout-popup";
import NotificationPopup from "../../components/common/notification-popup";
import AddProjectImage from "../../components/common/add-project-image";

import styles from "./index-single.module.css";
import DataPopup from "../../components/view-bid/data-popup";

export default function BidDetails() {
  const [Store] = useContext(StoreContext);

  const addProject = Store.addProject;
  const menu = Store.menu;
  const logout = Store.logout;
  const notificationPopup = Store.notificationPopup;
  const addProjectImagePopup = Store.addProjectImagePopup;
  const bidDataPopup = Store.bidDataPopup;

  return (
    <>
      <Head>
        <title>Bid View - Architect Dashboard</title>
        <meta name="description" content="Bid View - Architect Dashboard" />
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
              <SingleBidMain />
            </div>
          </div>
          {addProject ? <AddProject /> : ""}
          {logout ? <LogoutPopup /> : ""}
          {notificationPopup ? <NotificationPopup /> : ""}
          {addProjectImagePopup ? <AddProjectImage /> : ""}
          {bidDataPopup ? <DataPopup /> : ""}
        </div>
      </div>
    </>
  );
}
