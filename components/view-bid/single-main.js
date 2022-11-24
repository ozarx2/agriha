import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { StoreContext } from "../StoreContext";

import styles from "./single-main.module.css";

export default function SingleProjectsMain() {
  const [Store] = useContext(StoreContext);

  const setBidDataPopup = Store.setBidDataPopup;

  const [projectType, setProjectTyepe] = useState("School/College building");

  const acceptClick = () => {
    setBidDataPopup(true);
  };

  return (
    <>
      <div className={styles.main_outer}>
        <div className={styles.main_inner}>
          <div className={styles.title}>Enter Project name</div>
          <div className={styles.results__container}>
            <div className={styles.resultSection}>
              <p>Project type</p>
              <div className={styles.resultTextContainer}>{projectType}</div>
            </div>
            <div className={styles.resultSection}>
              <p>Project name</p>
              <div className={styles.resultTextContainer}>
                Luxury Appartment
              </div>
            </div>
            <div className={styles.resultSection}>
              <p>Expected area of project</p>
              <div className={styles.resultTextContainer}>6000 SQFT</div>
            </div>
            <div className={styles.resultSection}>
              <p>Expected Budget of project</p>
              <div className={styles.resultTextContainer}>₹ 70,000,00</div>
            </div>
            <div className={styles.resultSection}>
              <p>Project size</p>
              <div className={styles.resultTextContainer}>2 BHK</div>
            </div>
            <div className={styles.resultSection}>
              <p>03 floor</p>
              <div className={styles.resultTextContainer}>Number of floors</div>
            </div>
            <div className={styles.resultSection}>
              <p>Number of unit</p>
              <div className={styles.resultTextContainer}>07 unit</div>
            </div>
          </div>

          {projectType === "Residential" ? (
            <div className={styles.results__container}>
              <div className={styles.resultSection}>
                <p>Total Floors</p>
                <div className={styles.resultTextContainer}>0</div>
              </div>
              <div className={styles.resultSection}>
                <p>Total Bedrooms</p>
                <div className={styles.resultTextContainer}>5</div>
              </div>
              <div className={styles.resultSection}>
                <p>Total Attched Bathrooms</p>
                <div className={styles.resultTextContainer}>5</div>
              </div>
              <div className={styles.resultSection}>
                <p>Total Family members</p>
                <div className={styles.resultTextContainer}>5</div>
              </div>
              <div className={styles.resultSection}>
                <p>Requirement List</p>
                <div className={styles.resultTextContainerList}>
                  <ul>
                    <li>Bedrrom</li>
                    <li>Sitout</li>
                    <li>Kitchen</li>
                    <li>washroom</li>
                    <li>gamerrom</li>
                    <li>patio</li>
                    <li>varanda</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          {projectType === "Renovation" ? (
            <div className={styles.results__container}>
              <div className={styles.resultSection}>
                <p>Renovation type</p>
                <div className={styles.resultTextContainer}>complete</div>
              </div>
            </div>
          ) : (
            ""
          )}

          {projectType === "Apartment" ? (
            <div className={styles.results__container}>
              <div className={styles.resultSection}>
                <p>Total Floors</p>
                <div className={styles.resultTextContainer}>3</div>
              </div>
              <div className={styles.resultSection}>
                <p>Apartment Type</p>
                <div className={styles.resultTextContainer}>1 BHK</div>
              </div>
            </div>
          ) : (
            ""
          )}

          {projectType === "Hotels/restaurants" ? (
            <div className={styles.results__container}>
              <div className={styles.resultSection}>
                <p>Total Floors</p>
                <div className={styles.resultTextContainer}>3</div>
              </div>
              <div className={styles.resultSection}>
                <p>Total Occupancy</p>
                <div className={styles.resultTextContainer}>3000</div>
              </div>
              <div className={styles.resultSection}>
                <p>Is Terrace restaurant/cafe need?</p>
                <div className={styles.resultTextContainer}>Yes</div>
              </div>
              <div className={styles.resultSection}>
                <p>Is outdoor Kitchen need?</p>
                <div className={styles.resultTextContainer}>No</div>
              </div>
            </div>
          ) : (
            ""
          )}

          {projectType === "Hospitals/medical lab" ? (
            <div className={styles.results__container}>
              <div className={styles.resultSection}>
                <p>Total Floors</p>
                <div className={styles.resultTextContainer}>3</div>
              </div>
              <div className={styles.resultSection}>
                <p>Total Beds</p>
                <div className={styles.resultTextContainer}>3000</div>
              </div>
            </div>
          ) : (
            ""
          )}

          {projectType === "Auditorium" ? (
            <div className={styles.results__container}>
              <div className={styles.resultSection}>
                <p>Total Floors</p>
                <div className={styles.resultTextContainer}>3</div>
              </div>
              <div className={styles.resultSection}>
                <p>Total Halls</p>
                <div className={styles.resultTextContainer}>5</div>
              </div>
            </div>
          ) : (
            ""
          )}

          {projectType === "Industrial/warehouse" ? (
            <div className={styles.results__container}>
              <div className={styles.resultSection}>
                <p>Type of Business</p>
                <div className={styles.resultTextContainer}>Food</div>
              </div>
            </div>
          ) : (
            ""
          )}

          {projectType === "Mall" ? (
            <div className={styles.results__container}>
              <div className={styles.resultSection}>
                <p>Total Floors</p>
                <div className={styles.resultTextContainer}>3</div>
              </div>
              <div className={styles.resultSection}>
                <p>Total Occupancy</p>
                <div className={styles.resultTextContainer}>3000</div>
              </div>
            </div>
          ) : (
            ""
          )}

          {projectType === "Multiplex" ? (
            <div className={styles.results__container}>
              <div className={styles.resultSection}>
                <p>Total Screens</p>
                <div className={styles.resultTextContainer}>3</div>
              </div>
              <div className={styles.resultSection}>
                <p>Total Occupancy</p>
                <div className={styles.resultTextContainer}>3000</div>
              </div>
            </div>
          ) : (
            ""
          )}

          {projectType === "Religious building" ? (
            <div className={styles.results__container}>
              <div className={styles.resultSection}>
                <p>Total of Religion</p>
                <div className={styles.resultTextContainer}>Hindu</div>
              </div>
              <div className={styles.resultSection}>
                <p>Total Occupancy</p>
                <div className={styles.resultTextContainer}>3000</div>
              </div>
            </div>
          ) : (
            ""
          )}

          {projectType === "School/College building" ? (
            <div className={styles.results__container}>
              <div className={styles.resultSection}>
                <p>School/College</p>
                <div className={styles.resultTextContainer}>College</div>
              </div>
              <div className={styles.resultSection}>
                <p>School type</p>
                <div className={styles.resultTextContainer}>LP</div>
              </div>
              <div className={styles.resultSection}>
                <p>is residential school?</p>
                <div className={styles.resultTextContainer}>Yes</div>
              </div>
              <div className={styles.resultSection}>
                <p>Total Floors</p>
                <div className={styles.resultTextContainer}>3</div>
              </div>
              <div className={styles.resultSection}>
                <p>Total Occupancy</p>
                <div className={styles.resultTextContainer}>2000</div>
              </div>
            </div>
          ) : (
            ""
          )}

          {projectType === "Sports building" ? (
            <div className={styles.results__container}>
              <div className={styles.resultSection}>
                <p>Total of Sport</p>
                <div className={styles.resultTextContainer}>Hindu</div>
              </div>
              <div className={styles.resultSection}>
                <p>Total Occupancy</p>
                <div className={styles.resultTextContainer}>3000</div>
              </div>
              <div className={styles.resultSection}>
                <p>is Pool need?</p>
                <div className={styles.resultTextContainer}>No</div>
              </div>
            </div>
          ) : (
            ""
          )}

          {projectType === "Hostel" ? (
            <div className={styles.results__container}>
              <div className={styles.resultSection}>
                <p>Total Floors</p>
                <div className={styles.resultTextContainer}>3</div>
              </div>
              <div className={styles.resultSection}>
                <p>Total Rooms</p>
                <div className={styles.resultTextContainer}>30</div>
              </div>
            </div>
          ) : (
            ""
          )}

          <div className={styles.buttons__container}>
            <div className={styles.decline_button}>Decline</div>
            <div className={styles.accept_button} onClick={acceptClick}>
              Accept
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
