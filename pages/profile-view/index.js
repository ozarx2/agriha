/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import SectionOne from "./section-one";
import SectionTwo from "./section-two";
import style from "../../styles/ProjectView.module.css";
import AlsoViewed from "./also-viewed";
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import api_url from "../../src/utils/url";

export default function Home() {
  const [architectId, setArchitectId] = useState("");
  const [architectData, setArchitectData] = useState("");
  const [loading, setLoading] = useState(true);
  const [assignedProjects, setAssignedProjects] = useState([]);

  function getParameters() {
    let urlString = window.location.href;
    let paramString = urlString.split("/")[4];
    let queryString = new URLSearchParams(paramString);
    for (let pair of queryString.entries()) {
      setArchitectId(pair[0]);
    }
  }

  /*GET ASSIGNED PROJECTS */
  async function getAssignedProjects(architectId) {
    console.log(architectId);
    const res = await fetch(
      `${api_url}/projects/singleuserproject/${architectId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMGM5ZDhiNWIyOWEyZjM0OGM5NzQ5NyIsImlhdCI6MTY2MTc3MTE0OCwiZXhwIjoxNjYxODU3NTQ4fQ.n9kwWACUDQzUT45XecGYGZ638bOYfTv8iUpdfD-_m3Q",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    setAssignedProjects(data.data);
  }

  useEffect(() => {
    getAssignedProjects(architectId);
  }, [architectId]);

  async function getarchitectData() {
    try {
      if (architectId) {
        const response = await fetch(`${api_url}/architects/${architectId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " +
              `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMmViMWZkYjVkOGEyYmFjMjNjMjBlZCIsImlhdCI6MTY2NDk0NDgyMn0.-g6oh4ZEa7mjyJb2rGYCug07eCX6XLE-CeUsxjPlzAM`,
          },
        });
        const data = await response.json();
        if (data) {
          setLoading(false);
          setArchitectData(data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getParameters();
  }, []);

  useEffect(() => {
    getarchitectData();
  }, [architectId]);

  const onProjectViewClick = (id) => {
    window.location.href = `/uploadDocuments/${id}`;
  };

  return (
    <>
      <Head>
        <title>Profile Architect | Agriha</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <header>header</header> */}

      <div className={styles.container_outer}>
        {/* {loading ? (
          <div className={styles.loader}>
            <PulseLoader color="#1c9c76" />
          </div>
        ) : (
          ""
        )} */}
        <div className={styles.container}>
          <div className={styles.profile_view_outer}>
            <div className={styles.main_left}>
              <div className={styles.profile_right}>
                <img
                  className={styles.profile_image}
                  src={architectData.profilepic}
                  alt=""
                />
                <div className={styles.profile_head_right}>
                  {architectData.firstname} {architectData.lastname}
                  <h4>{architectData.location}</h4>
                  {/* <Link href="/">
                    <a className={styles.edit}>
                      <img src="/img/pen.svg" alt="select" />
                      <span>Edit Profile</span>
                    </a>
                  </Link> */}
                  <div className={styles.share}>
                    <div className={styles.select}>
                      {/* <button>
                        <span>Contact Us</span>
                      </button> */}
                    </div>
                    <div className={`${styles.select} ${styles.new}`}>
                      {/*  <button>
                        <span>Add New</span>
                      </button> */}
                    </div>
                  </div>
                  <div className={styles.clear}></div>
                </div>
              </div>
              <SectionOne bio={architectData.bio} />
              <SectionTwo id={architectId} />
            </div>
            <div className={styles.main_right}>
              <AlsoViewed id={architectId} />
            </div>
          </div>
          {/* <div className={styles.clear}></div> */}
        </div>
        <div className={styles.projectContainer__architect}>
          <h3>Assigned Projects</h3>
          {assignedProjects?.length <= 0 ? <h5>No projects</h5> : " "}
          <div className={styles.projectView_admin}>
            <div className={styles.projectsCard__container_arch}>
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
      <div className={styles.clear}></div>

      {/* <footer className={styles.footer}>footer</footer> */}
    </>
  );
}
