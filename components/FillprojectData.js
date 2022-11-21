/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styles from "../styles/fillData.module.css";
import Cardnav from "./Cardnav";
import axios from "axios";
import api_url from "../src/utils/url";

function FillprojectData() {
  const initialState = {
    no_of_floors: null,
    total_area: null,
    no_of_bedrooms: null,
    attached_bathrooms: null,
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
    if (
      requirements.attached_bathrooms &&
      requirements.no_of_bedrooms &&
      requirements.no_of_floors &&
      requirements.total_area &&
      requirements.total_budget !== null
    ) {
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
          <Cardnav title="FILL YOUR REQUIREMENTS" description="" />
          <div className={styles.Maincontent}>
            <div className={styles.content}>
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
                  placeholder="Number of floors"
                  name="no_of_floors"
                  onChange={handleChange}
                />
              </div>
              <div className={styles.content__inputs}>
                <input
                  type="text"
                  placeholder="Number of bedroom"
                  name="no_of_bedrooms"
                  onChange={handleChange}
                />
              </div>
              <div className={styles.content__inputs}>
                <input
                  type="text"
                  placeholder="Number of attached bathrooms"
                  name="attached_bathrooms"
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
}

export default FillprojectData;
