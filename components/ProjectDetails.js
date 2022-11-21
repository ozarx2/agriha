import React from "react";
import styles from "../styles/Sidebar.module.css";
import ProjectDetailedView from "./ProjectDetailedView";
import ProjectHeader from "./ProjectHeader";
import SidebarDash from "./SidebarDash";

const ProjectDetails = () => {
  return (
    <div>
      <ProjectHeader />
      <div className={styles.bottomDash}>
        <SidebarDash />
        <ProjectDetailedView />
      </div>
    </div>
  );
};

export default ProjectDetails;
