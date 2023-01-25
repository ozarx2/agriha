import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import api_url from "../../src/utils/url";

import styles from "./UserMyProjectsSingle.module.css";

const UserMyProjectsSingle = () => {
  const router = useRouter();
  const [projectId, setProjectId] = useState("");
  const [projectDetails, setProjectDetails] = useState([]);

  /* GET ARCHITECT ID */
  function getParameters() {
    let urlString = window.location.href;
    let paramString = urlString.split("/")[4];
    let queryString = new URLSearchParams(paramString);
    for (let pair of queryString.entries()) {
      console.log(pair[0]);
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
    // if (data.status === 200) {
    //   setProjectDetails(data?.projects);
    // }
  }

  useEffect(() => {
    if (projectId != "") {
      getProject();
    }
  }, []);

  return (
    <div className={styles.projectContainer_outer}>
      <div className={styles.projectContainer_inner}>
        <div className={styles.container_header}>
          <div className={styles.container_header_nav}>
            <ul>
              <li>Home</li>
              <li>My files</li>
              <li>Sugg. Product</li>
              <li>Reference image</li>
            </ul>
          </div>
        </div>
        <div className={styles.container_body}>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default UserMyProjectsSingle;
