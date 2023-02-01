import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import api_url from "../../src/utils/url";
import { StoreContext } from "../StoreContext";
import FilesUserMyProject from "./FilesUserMyProject";
import HomeUserMyProject from "./HomeUserMyProject";

import styles from "./UserMyProjectsSingle.module.css";

const UserMyProjectsSingle = () => {
  const [projectId, setProjectId] = useState("");
  const [projectDetails, setProjectDetails] = useState([]);

  const [documents, setDocuments] = useState([]);

  const [Store] = useContext(StoreContext);

  const userProjectViewNav = Store.userProjectViewNav;
  const setUserProjectViewNav = Store.setUserProjectViewNav;

  /* GET ARCHITECT ID */
  function getParameters() {
    let urlString = window.location.href;
    let paramString = urlString.split("/")[4];
    let queryString = new URLSearchParams(paramString);
    for (let pair of queryString.entries()) {
      setProjectId(pair[0]);
    }
  }

  useEffect(() => {
    getParameters();
  }, []);

  async function getProject() {
    const token = localStorage.getItem("userToken");
    const res = await fetch(`${api_url}/projects/single/${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    if (data.status === 200) {
      setProjectDetails(data?.data[0]);
    }
  }

  async function getUploadedFiles() {
    const response = await fetch(
      `${api_url}/fileupload/uploaded_file/${projectId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    var documentsForProject = data.data?.filter(
      (res) => res.project_id === projectId
    );
    setDocuments(documentsForProject);
  }

  useEffect(() => {
    if (projectId != "") {
      getProject();
      getUploadedFiles();
    }
  }, [projectId]);

  return (
    <div className={styles.projectContainer_outer}>
      <div className={styles.projectContainer_inner}>
        <div className={styles.container_header}>
          <div className={styles.container_header_nav}>
            <ul>
              {userProjectViewNav === "home" ? (
                <li className={styles.activeNav}>Home</li>
              ) : (
                <li onClick={() => setUserProjectViewNav("home")}>Home</li>
              )}
              {userProjectViewNav === "files" ? (
                <li className={styles.activeNav}>My files</li>
              ) : (
                <li onClick={() => setUserProjectViewNav("files")}>My files</li>
              )}
              {userProjectViewNav === "product" ? (
                <li className={styles.activeNav}>Sugg. Product</li>
              ) : (
                <li onClick={() => setUserProjectViewNav("product")}>
                  Sugg. Product
                </li>
              )}
              {userProjectViewNav === "payment" ? (
                <li className={styles.activeNav}>Payment details</li>
              ) : (
                <li onClick={() => setUserProjectViewNav("payment")}>
                  Payment details
                </li>
              )}
            </ul>
          </div>
        </div>
        {projectDetails.length !== 0 ? (
          userProjectViewNav === "home" ? (
            <div className={styles.container_body}>
              <HomeUserMyProject projectDetails={projectDetails} />
            </div>
          ) : (
            ""
          )
        ) : (
          "loading..."
        )}
        {projectDetails.length !== 0 ? (
          userProjectViewNav === "files" ? (
            <div className={styles.filesContainer_body}>
              <FilesUserMyProject files={documents} />
            </div>
          ) : (
            ""
          )
        ) : (
          "loading..."
        )}
      </div>
    </div>
  );
};

export default UserMyProjectsSingle;
