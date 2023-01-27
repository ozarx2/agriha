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

  useEffect(() => {
    if (projectId != "") {
      getProject();
    }
  }, [projectId]);

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
          {projectDetails.length !== 0 ? (
            <>
              <div className={styles.container_body_top}>
                <div className={styles.container_body_top_left}>
                  <p>{projectDetails?.project_name}</p>
                  <div className={styles.title_project}>
                    {projectDetails?.project_type}
                    <p>
                      {projectDetails?.project_requirements[0]?.area} <span>sqft</span>
                    </p>
                  </div>
                  <div className={styles.location_projectCard}>
                    <img src="/img/user-my-project/locationIcon.svg" alt="" />
                    {projectDetails?.project_requirements[0]?.location}
                  </div>
                </div>

                <div className={styles.container_body_top_right}>
                  <div className={styles.architect_projectCard_left}>
                    <img
                      onClick={() => goToArchProfile(projectDetails.architect_id._id)}
                      onError={(e) => (e.target.src = "/img/user-my-project/no-image.png")}
                      src={
                        projectDetails.architect_id?.profilepic
                          ? projectDetails.architect_id.profilepic
                          : "/img/user-my-project/profile-demo.svg"
                      }
                      alt=""
                    />
                    <p onClick={() => goToArchProfile(projectDetails.architect_id._id)}>
                      {projectDetails.architect_id?.firstname}
                    </p>
                  </div>
                  <a onClick={() => goToArchProfile(projectDetails.architect_id._id)}>Show architect</a>
                </div>
              </div>
              <div className={styles.container_body_bottom}>
                <div className={styles.container_body_bottom_section}>
                  <div className={styles.container_body_bottom_table}>
                    <div className={styles.table_row}>
                      <div className={styles.table_row_left}>
                        <p>Project Code</p>
                        <span></span>
                      </div>
                      <p>{projectDetails?.project_name}</p>
                    </div>
                    <div className={styles.table_row}>
                      <div className={styles.table_row_left}>
                        <p>Location </p>
                        <span></span>
                      </div>
                      <p>{projectDetails?.project_requirements[0]?.location}</p>
                    </div>
                    <div className={styles.table_row}>
                      <div className={styles.table_row_left}>
                        <p>Budget </p>
                        <span></span>
                      </div>
                      <p>₹ {projectDetails?.project_requirements[0]?.budget}</p>
                    </div>
                    <div className={styles.table_row}>
                      <div className={styles.table_row_left}>
                        <p>Project type</p>
                        <span></span>
                      </div>
                      <p>{projectDetails?.project_type}</p>
                    </div>
                    <div className={styles.table_row}>
                      <div className={styles.table_row_left}>
                        <p>Starting date</p>
                        <span></span>
                      </div>
                      <p>{projectDetails?.starting_date}</p>
                    </div>
                    <div className={styles.table_row}>
                      <div className={styles.table_row_left}>
                        <p>Status</p>
                        <span></span>
                      </div>
                      <p>{projectDetails?.status}</p>
                    </div>
                  </div>
                </div>
                <div className={styles.container_body_bottom_section}>
                  <div className={styles.container_body_bottom_table}>
                    <div className={styles.table_row}>
                      <div className={styles.table_row_left}>
                        <p>Project area</p>
                        <span></span>
                      </div>
                      <p>{projectDetails?.project_requirements[0]?.area} SQFT</p>
                    </div>
                    <div className={styles.table_row}>
                      <div className={styles.table_row_left}>
                        <p>Rf Images</p>
                        <span></span>
                      </div>
                      <p>{projectDetails?.reference_images.length}</p>
                    </div>
                    <div className={styles.table_row}>
                      <div className={styles.table_row_left}>
                        <p>Agent </p>
                        <span></span>
                      </div>
                      <p>NILL</p>
                    </div>
                    <div className={styles.table_row}>
                      <div className={styles.table_row_left}>
                        <p>Plan</p>
                        <span></span>
                      </div>
                      <p>{projectDetails?.plan_id?.plan_name ? projectDetails?.plan_id?.plan_name : "NILL"}</p>
                    </div>
                    <div className={styles.table_row}>
                      <div className={styles.table_row_left}>
                        <p>Payment status</p>
                        <span></span>
                      </div>
                      <p>{projectDetails?.payment_status ? projectDetails?.payment_status : "unpaid"}</p>
                    </div>
                    <div className={styles.table_row}>
                      <div className={styles.table_row_left}>
                        <p>Number of files</p>
                        <span></span>
                      </div>
                      <p>{projectDetails?.files ? projectDetails?.files.length : 0}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            "loading..."
          )}
        </div>
      </div>
    </div>
  );
};

export default UserMyProjectsSingle;
