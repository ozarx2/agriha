import React from "react";
import SidebarDash from "./SidebarDash";
import styles from "../styles/Sidebar.module.css";
import HeaderSettings from "./HeaderSettings";
import ProfileSettings from "./ProfileSettings";

const Settings = () => {
  return (
    <div>
      <HeaderSettings />
      <div className={styles.bottomDash}>
        <SidebarDash />
        <ProfileSettings />
      </div>
    </div>
  );
};

export default Settings;
