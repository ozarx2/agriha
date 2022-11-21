import React, { useEffect, useState } from "react";
import api_url from "../src/utils/url";
import styles from "../styles/ProjectView.module.css";

const ProjectsView = () => {
  const [projectId, setProjectId] = useState("");
  const [userId, setUserId] = useState();

  const [allProjects, setAllProjects] = useState([]);

  const onProjectViewClick = (id) => {
    localStorage.setItem("projectView", id);
    window.location.href = "/projectDetails";
  };

  async function getAllProjects() {
    const token = localStorage.getItem("userToken");
    const res = await fetch(`${api_url}/projects/view/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + `${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    setAllProjects(data.projects);
  }

  useEffect(() => {
    var id = localStorage.getItem("projectId");
    setProjectId(id);
    getAllProjects();
  }, []);

  const enquiryClick = (id) => {
    console.log("mail send : " + id);
  };

  return (
    <div className={styles.projectView}>
      <div className={styles.projectsCard__container}>
        {allProjects
          .slice(0)
          .reverse()
          .map((items, index) => {
            return (
              <div key={index} className={styles.projectCard}>
                <div className={styles.top__projectCard}>
                  <div className={styles.title__projectCard}>
                    <h5>{items.project_name}</h5>
                    <p>{items.starting_date}</p>
                  </div>
                  <div
                    onClick={() => onProjectViewClick(items._id)}
                    className={styles.viewMore__button}
                  >
                    View more
                  </div>
                </div>
                <div className={styles.bottom__projectCard}>
                  <div className={styles.bottom__projectCard__content}>
                    <p>{items.project_type}</p>
                  </div>
                  <div className={styles.bottom__projectCard__buttons}>
                    <a
                      href={`https://api.whatsapp.com/send?phone=919995111325&text=Hello%2C%20I%20would%20like%20to%20get%20the%20details%20of%20my%20project.%0AMy%20project%20code%20is%20%3A%20%20${items.project_name}`}
                      className={styles.nextButton__card}
                      onClick={() => enquiryClick(items._id)}
                    >
                      ENQUIRY
                    </a>
                    <div className={styles.indicator__projectCard__content}>
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
  );
};

export default ProjectsView;
