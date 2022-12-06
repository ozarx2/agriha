/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import styles from "./uploadedfilesmob.module.css";

const FnUploadFilesMob = ({ project_id }) => {
  const [fileUploads, setFileUpload] = useState([]);

  const result = fileUploads.filter((item) => item.project_id === project_id);
  console.log(project_id);
  useEffect(() => {
    getUploadFile();
  }, []);
  async function getUploadFile() {
    const token = localStorage.getItem("userToken");
    const response = await fetch(
      "https://agriha-server-dot-agriha-services.uc.r.appspot.com/fileupload/userfiles",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    setFileUpload(data.userFile);
  }
  console.log(fileUploads);
  return (
    <>
      <div className={styles.fileOuter}>
        {result?.map((items, key) => {
          return (
            <>
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

export default FnUploadFilesMob;
