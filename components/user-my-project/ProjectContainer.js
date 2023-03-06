import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import api_url from "../../src/utils/url";
import styles from "./ProjectContainer.module.css";

const ProjectContainer = () => {
  const router = useRouter();
  const [projects, setprojects] = useState([]);

  async function getAllProjects() {
    const token = localStorage.getItem("userToken");
    const res = await fetch(`${api_url}/projects/view`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    if (data.status === 200) {
      setprojects(data?.projects);
    }
  }

  useEffect(() => {
    getAllProjects();
  }, []);

  const goToArchProfile = (id) => {
    router.push(`/user-architect-about/${id}`);
  };

  const gotoProjectDetails = (id) => {
    router.push(`/user-my-project/${id}`);
  };

  return (
    <div className={styles.projectContainer_outer}>
      <div className={styles.projectContainer_inner}>
        {projects
          ?.slice(0)
          .reverse()
          .map((item, index) => {
            return item.architect_id ? (
              <div className={styles.projectCard} key={index}>
                <div className={styles.left_projectCard}>
                  <img
                    onError={(e) => (e.target.src = "/img/user-my-project/no-image.png")}
                    src={item.thumbnail ? item.thumbnail : "/img/user-my-project/no-image.png"}
                    alt=""
                  />
                  <div className={styles.showMore_button_white} onClick={() => gotoProjectDetails(item._id)}>
                    Show more
                    <img src="/img/user-my-project/arrow1.svg" alt="" />
                  </div>
                </div>
                <div className={styles.right_projectCard}>
                  <p>
                    {item.project_name} {item.bid ? <span>With bid</span> : ""}
                  </p>
                  <div className={styles.title_projectCard}>
                    {item.project_type}
                    <p>
                      {item.project_requirements[0]?.area} <span>sqft</span>
                    </p>
                  </div>
                  <div className={styles.location_projectCard}>
                    <img src="/img/user-my-project/locationIcon.svg" alt="" />
                    {item.project_requirements[0]?.location}
                  </div>
                  <div className={styles.architect_projectCard}>
                    <div className={styles.architect_projectCard_left}>
                      <img
                        onClick={() => goToArchProfile(item.architect_id._id)}
                        onError={(e) => (e.target.src = "/img/user-my-project/no-image.png")}
                        src={
                          item.architect_id?.profilepic
                            ? item.architect_id.profilepic
                            : "/img/user-my-project/profile-demo.svg"
                        }
                        alt=""
                      />
                      <p onClick={() => goToArchProfile(item.architect_id._id)}>
                        {item.architect_id?.registered_id?.name}
                      </p>
                      <a onClick={() => goToArchProfile(item.architect_id._id)}>Show architect</a>
                    </div>
                    <div className={styles.showMore_button} onClick={() => gotoProjectDetails(item._id)}>
                      Show more
                      <img src="/img/user-my-project/arrow.svg" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            );
          })}
      </div>
    </div>
  );
};

export default ProjectContainer;
