/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import React, { useEffect, useState } from "react";
import endpoint from "../../src/utils/endpoint";
import api_url from "../../src/utils/url";
import styles from "./Admin.module.css";
import HeaderDashboard from "./HeaderDashboard";

const BodyDashboard = () => {
  const [projects, setProjects] = useState([]);

  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjM5NjMxNGQ4MGRhYWE1OTA5NzQyNCIsImlhdCI6MTY2ODE1OTI3OX0.3QBerjNoI_qjGwuhL4DXY3J74kc-U4ZCsP-thSsYK8I"
  );

  async function getAllProjects() {
    const res = await fetch(`${api_url}/projects/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    setProjects(data.projects);
  }

  const [userList, setUserList] = useState([]);

  async function getAllUsers() {
    const res = await fetch(`${endpoint}/user/userlist`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const data = await res.json();
    console.log(data);
    setUserList(data.data);
  }

  useEffect(() => {
    getAllProjects();
    getAllUsers();
  }, []);

  var users = userList.filter((res) => res.role === "user");
  var architects = userList.filter((res) => res.role === "architect");

  return (
    <div className={styles.bodyDashboard}>
      <HeaderDashboard />
      <div className={styles.bottom__bodyDashboard}>
        <div className={styles.top__bottom__dashboard}>
          <div className={`${styles.card__conatiner__overview} ${styles.userCard}`}>
            <p>Total Users</p>
            <h3>{users?.length}</h3>
          </div>
          <div className={`${styles.card__conatiner__overview} ${styles.architectCard}`}>
            <p>Total Architects</p>
            <h3>{architects?.length}</h3>
          </div>
          <div className={`${styles.card__conatiner__overview} ${styles.projectCard}`}>
            <p>Total Projects</p>
            <h3>{projects?.length}</h3>
          </div>
          <div className={`${styles.card__conatiner__overview} ${styles.websiteCard}`}>
            <p>Total Website Visits</p>
            <h3>3290</h3>
          </div>
        </div>
        <div className={styles.bottom__bottom__dashboard}>
          <div className={styles.recentProjects__container}>
            <h4>Recent Projects</h4>
            <table className={styles.table}>
              <tr>
                <th>Project Code</th>
                <th>Project Type</th>
                <th>User</th>
                <th>Architect ID</th>
                <th>Created Date</th>
              </tr>
              {projects
                ?.slice(0)
                .reverse()
                .map((project) => {
                  return (
                    <>
                      {project?.creator?.name && project?.architect_id ? (
                        <tr>
                          <td>{project?.project_name}</td>
                          <td>{project?.project_type}</td>
                          <td>{project?.creator?.name}</td>
                          <td>{project?.architect_id}</td>
                          <td>{moment(project?.createdAt).format("lll")}</td>
                        </tr>
                      ) : (
                        ""
                      )}
                    </>
                  );
                })}
            </table>
          </div>
          <div className={styles.graphContainer}>
            <h4>Recent Users</h4>
            <table className={styles.table}>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Created Date</th>
              </tr>
              <tr>
                <td>Muhammed Yaseen</td>
                <td>9447101708</td>
                <td>yaseen.arclif@gmail.com</td>
                <td>{moment("11-07-2012").format("lll")}</td>
              </tr>

              {users?.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{user?.name}</td>
                    <td>{user?.phone}</td>
                    <td>{user?.email}</td>
                    <td>{moment(user?.createdAt).format("lll")}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyDashboard;
