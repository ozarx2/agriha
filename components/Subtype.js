import React from "react";
import Cardnav from "./Cardnav";
import styles from "../styles/selectProject.module.css";
import moment from "moment";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import api_url from "../src/utils/url";

const Subtype = () => {
  const [commercialTypes, setCommercialTypes] = useState([]);

  async function getSubTypes() {
    const token = localStorage.getItem("userToken");
    const subtype = localStorage.getItem("subtype");
    const res = await fetch(`${api_url}/project-sub-types/${subtype}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    setCommercialTypes(data.projecttype);
  }

  useEffect(() => {
    getSubTypes();
  }, []);

  const handleSelection = (type) => {
    console.log(type);
    handleSubmit(type);
  };

  const handleSubmit = (type) => {
    if (type !== "") {
      const data = new Date();
      const formatDate = moment(data).format("DD/MM/YYYY");
      const token = localStorage.getItem("userToken");
      const maintype = localStorage.getItem("maintype");
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .post(
          `${api_url}/projects/Choose_project`,
          {
            project_type: maintype,
            starting_date: formatDate,
            ending_date: "null",
            status: "started",
            projectsub_type: type,
          },
          config
        )
        .then((response) => {
          console.log(response);
          if (response.data.status == 200) {
            localStorage.setItem("subtypeList", type);
            localStorage.setItem("projectId", response.data.data._id);
            window.location.href = "/fillDataSub";
          }
        })
        .catch((error) => {
          console.log(error);
          alert("Something went wrong please try again");
        });
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.cardMain}>
        <Cardnav title="Select Subtype" description="Choose building type" />
        <div className={styles.cardContent}>
          {commercialTypes.map((items, index) => {
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
                  <h4>{items.projectSub_type}</h4>
                </div>
                <div
                  className={styles.cardButton__unselect}
                  onClick={() => handleSelection(items.projectSub_type)}
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
};

export default Subtype;
