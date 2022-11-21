import React, { useEffect } from "react";
import styles from "../styles/selectProject.module.css";
import Cardnav from "./Cardnav";
import axios from "axios";
import moment from "moment";
import { useState } from "react";
import api_url from "../src/utils/url";

function SelectProject() {
  const [projectTypes, setProjectTypes] = useState([]);

  async function getProjects() {
    const token = localStorage.getItem("userToken");
    const res = await fetch(`${api_url}/project-types`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data.projecttype);
    setProjectTypes(data.projecttype);
  }

  useEffect(() => {
    getProjects();
  }, []);

  const handleSelection = (type, id) => {
    console.log(type, id);
    handleSubmit(type, id);
  };

  const handleSubmit = (type, id) => {
    console.log(type, id);
    if (type === "Residential") {
      const data = new Date();
      const formatDate = moment(data).format("DD/MM/YYYY");
      const token = localStorage.getItem("userToken");
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .post(
          `${api_url}/projects/Choose_project`,
          {
            project_type: type,
            starting_date: formatDate,
            ending_date: "null",
            status: "started",
            projectsub_type: null,
          },
          config
        )
        .then((response) => {
          console.log(response);
          if (response.data.status == 200) {
            localStorage.setItem("projectId", response.data.data._id);
            window.location.href = "/Filldata";
          }
        })
        .catch((error) => {
          console.log(error);
          alert("Something went wrong please try again");
        });
    } else {
      if (type !== "") {
        localStorage.setItem("maintype", type);
        localStorage.setItem("subtype", id);
        window.location.href = "/subtype";
      }
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.cardMain}>
        <Cardnav
          title="Select your Project"
          description="Choose your project type"
        />
        <div className={styles.cardContent__selectProject}>
          {projectTypes.map((items, index) => {
            return (
              <div
                style={{ backgroundColor: items.bgColor }}
                className={styles.selectCards}
                key={index}
              >
                <div className={styles.indicators}>
                  <div></div>
                  <div
                    style={{ backgroundColor: items.indicator_color }}
                    className={styles.selected_right}
                  ></div>
                </div>
                <div className={styles.projectImages}>
                  <div
                    className={styles.projectImageBg}
                    style={{
                      backgroundImage: `url('${items.image})`,
                    }}
                  ></div>
                </div>
                <div className={styles.cardTitle}>
                  <h4>{items.project_type}</h4>
                  <p>{items.description}</p>
                </div>
                <div
                  className={styles.cardButton__unselect}
                  onClick={() => handleSelection(items.project_type, items._id)}
                >
                  Select
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SelectProject;
