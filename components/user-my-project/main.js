/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import windowSize from "../windowRes";
import ProfilePopup from "../user-common/profile-popup";
import FnUserMyProjectDesktop from "./desktop";
import FnUserMyProjectMobile from "./mobile";

import styles from "./main.module.css";
import api_url from "../../src/utils/url";
import ProjectContainer from "./ProjectContainer";

const UserMyProjects = () => {
  const [allProjects, setAllProjects] = useState([]);

  const windowRes = windowSize();

  async function getAllProjects() {
    const token = localStorage.getItem("userToken");
    const res = await fetch(`${api_url}/projects/view`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setAllProjects(data.projects);
  }

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <>
      <div className={styles.main_outer}>
        <div className={styles.main_inner}>
          {/* {windowRes.innerWidth >= 1100 ? (
            <FnUserMyProjectDesktop projects={allProjects} />
          ) : (
            <FnUserMyProjectMobile projects={allProjects} />
          )} */}
          <ProjectContainer />
        </div>
      </div>
    </>
  );
};

export default UserMyProjects;
