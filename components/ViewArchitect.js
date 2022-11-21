import Image from "next/image";
import React, { useEffect, useState } from "react";
import api_url from "../src/utils/url";
import styles from "../styles/BodyAddArchitect.module.css";

const ViewArchitect = () => {
  const [architectData, setArchitectData] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [projectId, setProjectId] = useState(null);
  const [isSettings, setIsSettings] = useState("false");

  useEffect(() => {
    var id = localStorage.getItem("projectId");
    setProjectId(id);
    var set = localStorage.getItem("isSettings");
    console.log(set);
    setIsSettings(set);
  }, []);

  async function getArchitect(archId) {
    const token = localStorage.getItem("userToken");
    const res = await fetch(`${api_url}/architects/${archId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    setArchitectData(data);
  }

  async function getProjects(archId) {
    const token = localStorage.getItem("userToken");
    const res = await fetch(`${api_url}/projects/${archId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    setAllProjects(data);
  }

  useEffect(() => {
    var archId = localStorage.getItem("viewArch");
    getArchitect(archId);
    getProjects(archId);
  }, []);

  /* SEND MAIL TO USER */
  async function sendmail() {
    const token = localStorage.getItem("userToken");
    var id = localStorage.getItem("projectId");
    console.log(id);
    const res = await fetch(`${api_url}/user/project_success`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data.status === 200) {
      window.location.href = "/dashboard";
    }
  }

  async function selectArchitect() {
    const token = localStorage.getItem("userToken");
    if (document.getElementById("selectArch").innerHTML !== "Connect") {
      var archId = localStorage.getItem("viewArch");
      console.log("clicked");
      const res = await fetch(
        `${api_url}/projects/Choose_architect/${projectId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            architect_id: archId,
          }),
        }
      );
      const data = await res.json();
      console.log(res);
      if (res.status === 200) {
        sendmail();
      }
    } else {
      window.location.href = "tel:9995111325";
    }
  }

  const projectView = (id) => {
    localStorage.setItem("projectIdImage", id);
    window.location.href = "/projectArchitect";
  };

  return (
    <div>
      <div className={styles.architectDetails} id="architectDetails">
        <div className={styles.profile__architect}>
          <div
            className={styles.avatar__architectDetailBg}
            style={{
              backgroundImage: `url(${architectData.profilepic})`,
            }}
          ></div>
          <div className={styles.right__conatiner__profile}>
            <div className={styles.top__right__conatiner__profile}>
              <div className={styles.top__top__right__conatiner__profile}>
                <div className={styles.name__top__right__conatiner__profile}>
                  <h3>
                    {architectData.firstname} {architectData.lastname}
                  </h3>
                  <div></div>
                </div>
                <h4></h4>
              </div>
              <div
                onClick={selectArchitect}
                className={styles.contactButton__profile}
                id="selectArch"
              >
                {isSettings == "false" ? "Select Architect" : "Connect"}
              </div>
            </div>
            <div className={styles.bottom__right__conatiner__profile}>
              <p>{architectData.bio}</p>
            </div>
            <div
              className={styles.contact__architect}
              style={{ marginTop: "20px" }}
            >
              <div className={styles.contactIcon__architect}>
                <Image
                  src="/location.svg"
                  alt=""
                  width={20}
                  height={20}
                ></Image>
              </div>
              <div className={styles.contactText__architect}>
                <h5>Location</h5>
                <p>{architectData.location}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.projectContainer__architect}>
          <h3>Recent Projects</h3>
          <div className={styles.projectCardAdmin}>
            {allProjects.map((items, index) => {
              return (
                <div
                  onClick={() => projectView(items._id)}
                  key={index}
                  style={{
                    backgroundImage: `url(${items.Image[0]})`,
                    cursor: "pointer",
                  }}
                  className={styles.projectCard__architect__admin}
                >
                  <div>
                    <h4>{items.projectname}</h4>
                    <p>
                      {items.location} | {items?.projectarea} sq.ft
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewArchitect;
