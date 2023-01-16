/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { StoreContext } from "../StoreContext";
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
