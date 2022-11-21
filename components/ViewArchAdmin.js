import Image from "next/image";
import React, { useEffect, useState } from "react";
import api_url from "../src/utils/url";
import styles from "../styles/BodyAddArchitect.module.css";
import style from "../styles/ProjectView.module.css";

const ViewArchAdmin = () => {
  const [architectData, setArchitectData] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [assignedProjects, setAssignedProjects] = useState([]);

  const [architectId, setArchitectId] = useState("");

  /* GET ARCHITECT ID */

  function getParameters() {
    let urlString = window.location.href;
    let paramString = urlString.split("/")[4];
    let queryString = new URLSearchParams(paramString);
    for (let pair of queryString.entries()) {
      setArchitectId(pair[0]);
      console.log(pair[0]);
    }
  }
  useEffect(() => {
    getParameters();
  }, []);

  async function getArchitect(archId) {
    const res = await fetch(`${api_url}/architects/${archId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMGM5ZDhiNWIyOWEyZjM0OGM5NzQ5NyIsImlhdCI6MTY2MTc3MTE0OCwiZXhwIjoxNjYxODU3NTQ4fQ.n9kwWACUDQzUT45XecGYGZ638bOYfTv8iUpdfD-_m3Q",
      },
    });
    const data = await res.json();
    console.log(data);
    setArchitectData(data);
  }

  async function getProjects(archId) {
    const res = await fetch(`${api_url}/projects/${archId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMGM5ZDhiNWIyOWEyZjM0OGM5NzQ5NyIsImlhdCI6MTY2MTc3MTE0OCwiZXhwIjoxNjYxODU3NTQ4fQ.n9kwWACUDQzUT45XecGYGZ638bOYfTv8iUpdfD-_m3Q",
      },
    });
    const data = await res.json();
    console.log(data);
    setAllProjects(data);
  }

  /* ASSIGNED PROJECTS */
  async function getAssignedProjects(archId) {
    const res = await fetch(`${api_url}/projects/singleuserproject/${archId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMGM5ZDhiNWIyOWEyZjM0OGM5NzQ5NyIsImlhdCI6MTY2MTc3MTE0OCwiZXhwIjoxNjYxODU3NTQ4fQ.n9kwWACUDQzUT45XecGYGZ638bOYfTv8iUpdfD-_m3Q",
      },
    });
    const data = await res.json();
    console.log(data);
    setAssignedProjects(data.data);
  }

  useEffect(() => {
    if (architectId !== "" && architectId !== undefined) {
      getArchitect(architectId);
      getProjects(architectId);
      getAssignedProjects(architectId);
    }
  }, [architectId]);

  const projectView = (id) => {
    localStorage.setItem("projectIdImage", id);
    window.location.href = "/projectArchitectAdmin";
  };

  const editArchitect = (id) => {
    window.location.href = `editArchitectAdmin/${id}`;
  };

  const onProjectViewClick = (id) => {
    window.location.href = `/uploadDocuments/${id}`;
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
                onClick={() => editArchitect(architectData._id)}
                className={styles.contactButton__profile}
              >
                Edit Architect
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
        <div className={styles.projectContainer__architect}>
          <h3>Assigned Projects</h3>
          {assignedProjects?.length <= 0 ? <h5>No Projects</h5> : ""}
          <div className={styles.projectView_admin}>
            <div className={styles.projectsCard__container_admin}>
              {assignedProjects
                ?.slice(0)
                .reverse()
                .map((items, index) => {
                  return (
                    <div
                      key={index}
                      className={style.projectCard}
                      style={{ border: "1px solid #333333" }}
                    >
                      <div className={style.top__projectCard}>
                        <div className={style.title__projectCard}>
                          <h5>{items.project_name}</h5>
                          <p>{items.starting_date}</p>
                        </div>
                        <div
                          onClick={() => onProjectViewClick(items._id)}
                          className={style.viewMore__button}
                        >
                          View More
                        </div>
                      </div>
                      <div className={style.bottom__projectCard}>
                        <div className={style.bottom__projectCard__content}>
                          <p>{items.project_type}</p>
                        </div>
                        <div className={style.bottom__projectCard__buttons}>
                          <a
                            className={style.nextButton__card}
                            onClick={() => onProjectViewClick(items._id)}
                          >
                            Upload Files
                          </a>
                          <div
                            className={style.indicator__projectCard__content}
                          >
                            <span>
                              <div></div>
                            </span>
                            <p>{items.status}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewArchAdmin;
