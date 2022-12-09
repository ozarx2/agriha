/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import styles from "./uploadedfiles.module.css";

const FnUploadFiles = ({ project_id, fileUploads }) => {
  const result = fileUploads.filter((item) => item.project_id === project_id);
  return (
    <>
      <div className={styles.fileOuter}>
        {result?.map((items, key) => {
          return (
            <>
              <div className={styles.uploadedFiles}>Uploaded file:</div>
              <div className={styles.file}>
                <div>
                  <img src="/img/my-project-user/data.svg" />
                  <span>{items?.description}</span>
                </div>
                <a target="_blank" href={`${items.files[0]}`}>
                  view
                </a>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default FnUploadFiles;
