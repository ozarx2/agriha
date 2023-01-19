/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { StoreContext } from "../../components/StoreContext";
import Link from "next/link";

import styles from "./sidebar.module.css";

export default function Sidebar() {
  const router = useRouter();

  const [Store] = useContext(StoreContext);

  const setLogout = Store.setLogout;
  const architectData = Store.architectData;
  const architectId = Store.architectId;

  // console.log(architectData);

  return (
    <>
      <div className={styles.sidebar_outer}>
        <div className={styles.sidebar}>
          <div className={styles.first}>
            <div className={styles.top}>
              {/* <Link href={`/architect-dashboard/${architectId}`} passHref> */}
              <Link href={`/`} passHref>
                <img src="/img/architect-dashboard/agrihalogo.svg" alt="agrihaLogo.svg" className={styles.agrihaLogo} />
              </Link>
            </div>
            <div className={styles.middle}>
              <Link href={`/architect-dashboard/${architectId}`} passHref>
                <div
                  className={`${styles.mainLists} ${
                    router.pathname == "/architect-dashboard" || router.pathname == "/architect-dashboard/[index]"
                      ? styles.active
                      : ""
                  }`}
                >
                  <img
                    className={styles.imgselect}
                    src="/img/architect-dashboard/sidebar/overview-s.svg"
                    alt="agrihaLogo.svg"
                  />
                  <img
                    className={styles.imgnoselect}
                    src="/img/architect-dashboard/sidebar/overview-ns.svg"
                    alt="agrihaLogo.svg"
                  />
                  <h5>Overview</h5>
                </div>
              </Link>
              <Link href="/my-projects" passHref>
                <div className={`${styles.mainLists} ${router.pathname == "/my-projects" ? styles.active : ""}`}>
                  <img
                    className={styles.imgselect}
                    src="/img/architect-dashboard/sidebar/projects-s.svg"
                    alt="agrihaLogo.svg"
                  />
                  <img
                    className={styles.imgnoselect}
                    src="/img/architect-dashboard/sidebar/projects-ns.svg"
                    alt="agrihaLogo.svg"
                  />
                  <h5>My Projects</h5>
                </div>
              </Link>
              <Link href="/ongoing-project" passHref>
                <div className={`${styles.mainLists} ${router.pathname == "/ongoing-project" ? styles.active : ""}`}>
                  <img
                    className={styles.imgselect}
                    src="/img/architect-dashboard/sidebar/ongoing-s.svg"
                    alt="agrihaLogo.svg"
                  />
                  <img
                    className={styles.imgnoselect}
                    src="/img/architect-dashboard/sidebar/ongoing-ns.svg"
                    alt="agrihaLogo.svg"
                  />
                  <h5>Ongoing Project</h5>
                </div>
              </Link>
              <Link href="/project-files" passHref>
                <div className={`${styles.mainLists} ${router.pathname == "/project-files" ? styles.active : ""}`}>
                  <img
                    className={styles.imgselect}
                    src="/img/architect-dashboard/sidebar/files-s.svg"
                    alt="agrihaLogo.svg"
                  />
                  <img
                    className={styles.imgnoselect}
                    src="/img/architect-dashboard/sidebar/files-ns.svg"
                    alt="agrihaLogo.svg"
                  />
                  <h5>Project Files</h5>
                </div>
              </Link>
              <Link href="/view-bid" passHref>
                <div className={`${styles.mainLists} ${router.pathname == "/view-bid" ? styles.active : ""}`}>
                  <img
                    className={styles.imgselect}
                    src="/img/architect-dashboard/sidebar/bid-s.svg"
                    alt="agrihaLogo.svg"
                  />
                  <img
                    className={styles.imgnoselect}
                    src="/img/architect-dashboard/sidebar/bid-ns.svg"
                    alt="agrihaLogo.svg"
                  />
                  <h5>View Bid</h5>
                </div>
              </Link>
            </div>
          </div>
          <div className={styles.quarter}>
            <Link href="/dashboard-settings" passHref>
              <div className={styles.mainListsCompany}>
                <img
                  src={
                    architectData?.profilepic ? architectData?.profilepic : "/img/architect-dashboard/profile_img.svg"
                  }
                  onError={(e) => (e.target.src = "/img/landing/profile_img.svg")}
                  alt="amourDecor.svg"
                  className={styles.companyLogo}
                />
                <h4 className={styles.companyName}>
                  {architectData?.registered_id?.name
                    ? architectData?.registered_id?.name
                    : architectData?.firstname + " " + architectData?.lastname}

                  {/* {architectData?.firstname !== undefined
                    ? architectData?.firstname + " " + architectData?.lastname
                    : architectData?.registered_id?.name} */}
                </h4>
              </div>
            </Link>
          </div>
          <div className={styles.end}>
            <Link href="/dashboard-settings" passHref>
              <div className={`${styles.mainLists} ${router.pathname == "/dashboard-settings" ? styles.active : ""}`}>
                <img
                  className={styles.imgselect}
                  src="/img/architect-dashboard/sidebar/settings-s.svg"
                  alt="agrihaLogo.svg"
                />
                <img
                  className={styles.imgnoselect}
                  src="/img/architect-dashboard/sidebar/settings-ns.svg"
                  alt="agrihaLogo.svg"
                />
                <h5>Settings</h5>
              </div>
            </Link>
            <div onClick={() => setLogout(true)} className={styles.mainLists}>
              <img src="/img/architect-dashboard/sidebar/logout.svg" alt="agrihaLogo.svg" />
              <h5 className={styles.logout}>Log out</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
