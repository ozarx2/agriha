import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../components/StoreContext";
import Navbar from "../../components/common/navbar";
import Sidebar from "../../components/common/sidebar";
import MobileSidebar from "../../components/common/mobile-sidebar";
import AddProject from "../../components/common/addproject";
import LogoutPopup from "../../components/common/logout-popup";
import NotificationPopup from "../../components/common/notification-popup";
import AddProjectImage from "../../components/common/add-project-image";
import DataPopup from "../../components/view-bid/data-popup";

import styles from "./index.module.css";
import SinglePaymentProjectMain from "../../components/payment-project-arch/main";

export default function BidDetails() {
  const [Store] = useContext(StoreContext);

  const addProject = Store.addProject;
  const menu = Store.menu;
  const logout = Store.logout;
  const notificationPopup = Store.notificationPopup;
  const addProjectImagePopup = Store.addProjectImagePopup;
  const bidDataPopup = Store.bidDataPopup;

  const [isQuoted, setIsQuoted] = useState(true);

  const router = useRouter();
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
    }
  }, []);

  return (
    <>
      <Head>
        <title>Payment project View - Architect Dashboard</title>
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
              <SinglePaymentProjectMain />
            </div>
          </div>
          {addProject ? <AddProject /> : ""}
          {logout ? <LogoutPopup /> : ""}
          {notificationPopup ? <NotificationPopup /> : ""}
          {addProjectImagePopup ? <AddProjectImage /> : ""}
          {bidDataPopup ? <DataPopup setIsQuoted={setIsQuoted} /> : ""}
        </div>
      </div>
    </>
  );
}
