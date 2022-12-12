/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import api_url from "../../src/utils/url";
import { StoreContext } from "../StoreContext";

import styles from "./single-main.module.css";

export default function SingleProjectsMain() {
  const [Store] = useContext(StoreContext);

  const setBidDataPopup = Store.setBidDataPopup;
  const setBidUserId = Store.setBidUserId;
  const architectId = Store.architectId;

  const router = useRouter();
  const { bid } = router.query;
  const projectId = bid;

  const [projectDetails, setProjectDetilas] = useState([]);
  const [projectType, setProjectType] = useState("");
  const [projectTypeDetails, setProjectTypeDetails] = useState([]);

  const [isQuoted, setIsQuoted] = useState(true);

  /* GET PROJECT DETAILS */
  async function getProjects() {
    var token = localStorage.getItem("userToken");
    const res = await fetch(`${api_url}/projects/single/${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    if (data.status === 200) {
      setProjectDetilas(data?.data[0]);
      setProjectType(data?.data[0]?.project_type);
      setBidUserId(data?.data[0]?.creator?._id);
      setProjectTypeDetails(data?.data[0]?.project_requirements[0]);
      var result = data?.data[0]?.acceptQuotes.filter((res) => res === architectId);
      if (result.length !== 0) {
        setIsQuoted(true);
      } else {
        setIsQuoted(false);
      }
    }
  }

  useEffect(() => {
    if (projectId !== undefined) {
      getProjects();
    }
  }, [projectId]);

  const acceptClick = () => {
    setBidDataPopup(true);
  };

  return (
    <>
      <div className={styles.main_outer}>
        <div className={styles.main_inner}>
          <div className={styles.title}>{projectDetails?.project_name}</div>
          <div className={styles.results__container}>
            <div className={styles.resultSection}>
              <p>Project type</p>
              <div className={styles.resultTextContainer}>{projectType}</div>
            </div>
            <div className={styles.resultSection}>
              <p>Project Code</p>
              <div className={styles.resultTextContainer}>{projectDetails?.project_name}</div>
            </div>
            <div className={styles.resultSection}>
              <p>Expected area of project</p>
              <div className={styles.resultTextContainer}>{projectTypeDetails?.area} SQFT</div>
            </div>
            <div className={styles.resultSection}>
              <p>Expected Budget of project</p>
              <div className={styles.resultTextContainer}>₹ {projectTypeDetails?.budget}</div>
            </div>
            <div className={styles.resultSection}>
              <p>Total Plot</p>
              <div className={styles.resultTextContainer}>{projectTypeDetails?.plot}</div>
            </div>
            <div className={styles.resultSection}>
              <p>Number of floors</p>
              <div className={styles.resultTextContainer}>{projectTypeDetails?.suggessions}</div>
            </div>
            <div className={styles.resultSection}>
              <p>Project Location</p>
              <div className={styles.resultTextContainer}>{projectTypeDetails?.location}</div>
            </div>
          </div>

          {projectType === "Residential" ? (
            <div className={styles.results__container}>
              <div className={styles.resultSection}>
                <p>Total Floors</p>
                <div className={styles.resultTextContainer}>
                  {projectDetails?.project_type_details[0]?.total_floors}
                </div>
              </div>
              <div className={styles.resultSection}>
                <p>Total Bedrooms</p>
                <div className={styles.resultTextContainer}>
                  {projectDetails?.project_type_details[0]?.total_bedroom}
                </div>
              </div>
              <div className={styles.resultSection}>
                <p>Total Attched Bathrooms</p>
                <div className={styles.resultTextContainer}>
                  {projectDetails?.project_type_details[0]?.total_bathroom}
                </div>
              </div>
              <div className={styles.resultSection}>
                <p>Total Family members</p>
                <div className={styles.resultTextContainer}>
                  {projectDetails?.project_type_details[0]?.total_familyMembers}
                </div>
              </div>
              {projectDetails?.requirement_list.length !==
              (
                <>
                  {projectDetails?.requirement_list?.map((item, index) => {
                    return (
                      <div key={index} className={styles.resultSection}>
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
                    );
                  })}
                </>
              )}
            </div>
          ) : (
            ""
          )}

          {projectType === "Renovation" ? (
            <div className={styles.results__container}>
              <div className={styles.resultSection}>
                <p>Renovation type</p>
                <div className={styles.resultTextContainer}>
                  {projectDetails.project_type_details[0].renovation_type}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          {projectType === "Apartment" ? (
            <div className={styles.results__container}>
              <div className={styles.resultSection}>
                <p>Total Floors</p>
                <div className={styles.resultTextContainer}>{projectDetails.project_type_details[0].total_floors}</div>
              </div>
              <div className={styles.resultSection}>
                <p>Apartment Type</p>
                <div className={styles.resultTextContainer}>
                  {projectDetails.project_type_details[0].apartment_type}
                </div>
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

          {!isQuoted ? (
            <>
              <div className={styles.buttons__container}>
                <div className={styles.decline_button}>Decline</div>
                <div className={styles.accept_button} onClick={acceptClick}>
                  Accept
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
