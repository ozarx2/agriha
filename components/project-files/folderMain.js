/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./main.module.css";
import FolderPopup from "./folder-popup";

export default function ProjectFolderFilesMain() {
  return (
    <>
      <div className={styles.main_outer}>
        <FolderPopup />
      </div>
    </>
  );
}
