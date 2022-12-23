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
        <div className={styles.sone_outer}>
          <div className={styles.sone_inner}>
            <div className={styles.left}>Folders</div>
            {/* <div className={styles.right}>
              <img src="/img/architect-dashboard/sort.svg" alt="sort" />
              <span>Sort list</span>
            </div> */}
          </div>
        </div>
        <div className={styles.stwo_outer}>
          <div className={styles.stwo_inner}>
            <div className={styles.folder_max_outer}>
              <FolderPopup />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
