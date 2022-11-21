import React from "react";
import HeaderDash from "./HeaderDash";
import ProjectsView from "./ProjectsView";
import SidebarDash from "./SidebarDash";
import styles from "../styles/Sidebar.module.css";

const Dashboard = () => {
  if (typeof window !== "undefined") {
    console.log(typeof window);
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
      history.go(1);
    };
  }

  return (
    <div>
      <HeaderDash />
      <div className={styles.bottomDash}>
        <SidebarDash active="dashboardActive" />
        <ProjectsView />
      </div>
    </div>
  );
};

export default Dashboard;
