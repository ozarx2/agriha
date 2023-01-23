import Head from "next/head";

import React, { useRef, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { StoreContext } from "../../components/StoreContext";
import api_url from "../../src/utils/url";
import Navbar from "../../components/common/navbar";
import Sidebar from "../../components/common/sidebar";
import MobileSidebar from "../../components/common/mobile-sidebar";
import SingleProjectsMain from "../../components/my-projects/single-main";
import AddProject from "../../components/common/addproject";
import LogoutPopup from "../../components/common/logout-popup";
import NotificationPopup from "../../components/common/notification-popup";
import SingleProjectPopup from "../../components/my-projects/single-project";
import AddProjectImage from "../../components/common/add-project-image";
import ShareProjectPopup from "../../components/user-common/share-project-popup";

import styles from "./index-single.module.css";

const ArchitectDashboardMyProject = (props) => {
  // export default function ArchitectDashboard() {
  const [Store] = useContext(StoreContext);

  const sharePopup = Store.sharePopup;

  const router = useRouter();
  useEffect(() => {
    const userId = localStorage.getItem("architectId");
    if (userId) {
    } else {
      router.push("/");
    }
  }, []);

  const addProject = Store.addProject;
  const menu = Store.menu;
  const logout = Store.logout;
  const notificationPopup = Store.notificationPopup;
  const addProjectImagePopup = Store.addProjectImagePopup;

  const [single, setSingle] = useState(false);
  const [page, setPage] = useState("recent");

  const data = props.data[0];

  return (
    <>
      <Head>
        <title>{data?.projectname} | Agriha</title>
        <meta
          name="description"
          content={`Agriha ${data?.project_type} project at ${data?.location} with ${data?.projectarea}sq.ft | Agriha`}
        />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={`${data?.projectname} | Agriha`} />
        <meta
          property="og:description"
          content={`Agriha ${data?.project_type} project at ${data?.location} with ${data?.projectarea}sq.ft | Agriha`}
        />
        <meta property="og:image" content={data?.thumbnail} />
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
              <SingleProjectsMain />
            </div>
          </div>
          {/* </div> */}
          {addProject ? <AddProject /> : ""}
          {single ? <SingleProjectPopup setSingle={setSingle} /> : ""}
          {logout ? <LogoutPopup /> : ""}
          {notificationPopup ? <NotificationPopup /> : ""}
          {addProjectImagePopup ? <AddProjectImage /> : ""}
          {sharePopup ? <ShareProjectPopup id={data?._id} /> : ""}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const id = params.id;

  // Fetch data from external API
  const res = await fetch(`${api_url}/projects/arcprojectsingle/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  return { props: { data } };
}

export default ArchitectDashboardMyProject;
