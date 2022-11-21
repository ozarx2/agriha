/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Cardnav from "./Cardnav";
import styles from "../styles/fillData.module.css";
import axios from "axios";
import api_url from "../src/utils/url";

const FillDataSubtypes = () => {
  const [commercialType, setCommercialType] = useState("");

  useEffect(() => {
    var item = localStorage.getItem("subtypeList");
    setCommercialType(item);
  }, []);

  const initialState = {
    total_area: null,
    total_budget: null,
    project: "",
  };

  const [requirements, setRequirments] = useState(initialState);

  useEffect(() => {
    setRequirments({
      ...requirements,
      project: localStorage.getItem("projectId"),
    });
  }, []);

  const [error, setError] = useState("");
  const handleChange = (event) => {
    setRequirments({
      ...requirements,
      [event.target.name]: parseInt(event.target.value),
    });
  };

  const handleNextBtn = () => {
    if (requirements.total_area && requirements.total_budget !== null) {
      const token = localStorage.getItem("userToken");
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .post(`${api_url}/project-requirements/add`, requirements, config)
        .then((response) => {
          if (response.data.status == 200) {
            window.location.href = "/SelectArchitect";
          } else {
            alert("Something went Wrong please try again");
          }
        })
        .catch((error) => {
          alert("Something went Wrong please try again");
        });
    } else {
      setError("Fill all fields");
    }
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.cardMain}>
          <Cardnav
            title="Commercial Building Requirements"
            description="Fill your requiremnets for Commercial Building"
          />
          <div className={styles.Maincontent}>
            <div className={styles.content}>
              <div className={styles.content__inputs}>
                <input
                  type="text"
                  name="total_budget"
                  value={commercialType}
                  readOnly
                />
              </div>
              <div className={styles.content__inputs}>
                <input
                  type="text"
                  placeholder="Enter area in sqft"
                  name="total_area"
                  onChange={handleChange}
                />
              </div>
              <div className={styles.content__inputs}>
                <input
                  type="text"
                  placeholder="Enter your budget"
                  name="total_budget"
                  onChange={handleChange}
                />
              </div>
              {error ? (
                <div className={styles.errorDiv}>
                  <p>{error}</p>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className={styles.button_div}>
            <div className={styles.button_div__right} onClick={handleNextBtn}>
              <p>Next</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FillDataSubtypes;
