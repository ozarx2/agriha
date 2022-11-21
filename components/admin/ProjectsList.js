/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import api_url from "../../src/utils/url";
import styles from "./UsersList.module.css";
import moment from "moment";

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);

  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjM5NjMxNGQ4MGRhYWE1OTA5NzQyNCIsImlhdCI6MTY2ODE1OTI3OX0.3QBerjNoI_qjGwuhL4DXY3J74kc-U4ZCsP-thSsYK8I"
  );

  async function getAllProjects() {
    const res = await fetch(`${api_url}/projects/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    setProjects(data.projects);
  }

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div className={styles.userList}>
      <h3>All Projects</h3>
      <div className={styles.userList_container}>
        <div className={styles.title_userList_container}>
          <table>
            <tr>
              <th>Project Code</th>
              <th>Project Type</th>
              <th>status</th>
              <th>User</th>
              <th>Architect ID</th>
              <th>Created Date</th>
            </tr>
            {projects
              ?.slice(0)
              .reverse()
              .map((item, index) => {
                return (
                  <>
                    {item?.architect_id && item?.creator?.name ? (
                      <tr key={index}>
                        <td>{item?.project_name}</td>
                        <td>{item?.project_type}</td>
                        <td>{item?.status}</td>
                        <td>{item?.creator?.name}</td>
                        <td>{item?.architect_id}</td>
                        <td>{moment(item?.createdAt).format("lll")}</td>
                      </tr>
                    ) : (
                      ""
                    )}
                  </>
                );
              })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectsList;
