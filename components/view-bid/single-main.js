/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import api_url from "../../src/utils/url";
import { StoreContext } from "../StoreContext";

import styles from "./single-main.module.css";

export default function SingleProjectsMain({ isQuoted, setIsQuoted }) {
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
  const [reqList, setReqList] = useState("");

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

  console.log(projectDetails);

  return (
    <>
      <div className={styles.main_outer}>
        <div className={styles.main_inner}>
          <div className={styles.title}>{projectDetails?.project_name}</div>
          <div className={styles.titleHead}>Basic details</div>
          <div className={styles.results__container}>
            <table className={styles.table_out}>
              <tr>
                <td>Project type</td>
                <td>: {projectType}</td>
              </tr>
              <tr>
                <td>Project Code</td>
                <td>: {projectDetails?.project_name}</td>
              </tr>
              <tr>
                <td>Expected area of project</td>
                <td>: {projectTypeDetails?.area} SQFT</td>
              </tr>
              <tr>
                <td>Total Plot</td>
                <td>: {projectTypeDetails?.plot}</td>
              </tr>
              <tr>
                <td>Number of floors</td>
                <td>: {projectTypeDetails?.suggessions}</td>
              </tr>
              <tr>
                <td>Project Location</td>
                <td>: {projectTypeDetails?.location}</td>
              </tr>
            </table>
          </div>
          {projectType === "Residential" ? (
            <div className={styles.results__container}>
              <table className={styles.table_out}>
                <tr>
                  <td>Total Floors</td>
                  <td>: {projectDetails?.project_type_details[0]?.total_floors}</td>
                </tr>
                <tr>
                  <td>Total Bedrooms</td>
                  <td>: {projectDetails?.project_type_details[0]?.total_bedroom}</td>
                </tr>
                <tr>
                  <td>Total Attched Bathrooms</td>
                  <td>: {projectDetails?.project_type_details[0]?.total_bathroom}</td>
                </tr>
                <tr>
                  <td>Total Family members</td>
                  <td>: {projectDetails?.project_type_details[0]?.total_familyMembers}</td>
                </tr>
                {projectDetails?.requirement_list?.length !== 0 ? (
                  <tr>
                    <td>Requirement List</td>
                    <td>
                      :{" "}
                      {projectDetails?.requirement_list?.map((item, index) => {
                        return <React.Fragment key={index}>{item},</React.Fragment>;
                      })}
                    </td>
                  </tr>
                ) : (
                  ""
                )}
              </table>
            </div>
          ) : (
            ""
          )}

          {projectType === "Renovation" ? (
            <div className={styles.results__container}>
              <table className={styles.table_out}>
                <tr>
                  <td>Renovation type</td>
                  <td>: {projectDetails.project_type_details[0].renovation_type}</td>
                </tr>
              </table>
            </div>
          ) : (
            ""
          )}
          {projectType === "Apartment" ? (
            <div className={styles.results__container}>
              <div className={styles.resultSectionDetails}>
                <p>Total Floors</p>
                <div>{projectDetails.project_type_details[0].total_floors}</div>
              </div>
              <div className={styles.resultSectionDetails}>
                <p>Apartment Type</p>
                <div>{projectDetails.project_type_details[0].apartment_type}</div>
              </div>
            </div>
          ) : (
            ""
          )}
          {projectType === "Mall" ? (
            <div className={styles.results__container}>
              <div className={styles.resultSectionDetails}>
                <p>Total Floors</p>
                <div>3</div>
              </div>
              <div className={styles.resultSectionDetails}>
                <p>Total Occupancy</p>
                <div>3000</div>
              </div>
            </div>
          ) : (
            ""
          )}
          {projectType === "Hospitals/medical lab" ? (
            <div className={styles.results__container}>
              <div className={styles.resultSectionDetails}>
                <p>Total Floors</p>
                <div>3</div>
              </div>
              <div className={styles.resultSectionDetails}>
                <p>Total Beds</p>
                <div>3000</div>
              </div>
            </div>
          ) : (
            ""
          )}
          {projectType === "Auditorium" ? (
            <div className={styles.results__container}>
              <div className={styles.resultSectionDetails}>
                <p>Total Floors</p>
                <div>3</div>
              </div>
              <div className={styles.resultSectionDetails}>
                <p>Total Halls</p>
                <div>5</div>
              </div>
            </div>
          ) : (
            ""
          )}
          {projectType === "Industrial/warehouse" ? (
            <div className={styles.results__container}>
              <div className={styles.resultSectionDetails}>
                <p>Type of Business</p>
                <div>Food</div>
              </div>
            </div>
          ) : (
            ""
          )}
          {projectType === "Multiplex" ? (
            <div className={styles.results__container}>
              <div className={styles.resultSectionDetails}>
                <p>Total Screens</p>
                <div>3</div>
              </div>
              <div className={styles.resultSectionDetails}>
                <p>Total Occupancy</p>
                <div>3000</div>
              </div>
            </div>
          ) : (
            ""
          )}
          {projectType === "Religious building" ? (
            <div className={styles.results__container}>
              <div className={styles.resultSectionDetails}>
                <p>Total of Religion</p>
                <div>Hindu</div>
              </div>
              <div className={styles.resultSectionDetails}>
                <p>Total Occupancy</p>
                <div>3000</div>
              </div>
            </div>
          ) : (
            ""
          )}
          {projectType === "School/College building" ? (
            <div className={styles.results__container}>
              <div className={styles.resultSectionDetails}>
                <p>School/College</p>
                <div>College</div>
              </div>
              <div className={styles.resultSectionDetails}>
                <p>School type</p>
                <div>LP</div>
              </div>
              <div className={styles.resultSectionDetails}>
                <p>is residential school ?</p>
                <div>Yes</div>
              </div>
              <div className={styles.resultSectionDetails}>
                <p>Total Floors</p>
                <div>3</div>
              </div>
              <div className={styles.resultSectionDetails}>
                <p>Total Occupancy</p>
                <div>2000</div>
              </div>
            </div>
          ) : (
            ""
          )}
          {projectType === "Sports building" ? (
            <div className={styles.results__container}>
              <div className={styles.resultSectionDetails}>
                <p>Total of Sport</p>
                <div>Hindu</div>
              </div>
              <div className={styles.resultSectionDetails}>
                <p>Total Occupancy</p>
                <div>3000</div>
              </div>
              <div className={styles.resultSectionDetails}>
                <p>is Pool need ?</p>
                <div>No</div>
              </div>
            </div>
          ) : (
            ""
          )}
          {projectType === "Hostel" ? (
            <div className={styles.results__container}>
              <div className={styles.resultSectionDetails}>
                <p>Total Floors</p>
                <div>3</div>
              </div>
              <div className={styles.resultSectionDetails}>
                <p>Total Rooms</p>
                <div>30</div>
              </div>
            </div>
          ) : (
            ""
          )}
          {/* {projectType === "Apartment" ? (
            <div className={styles.results__container}>
              <div className={styles.resultSection}>
                <p>Total Floorsss</p>
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
          )} */}
          {/* <============Secondary-details=============> */}
          <div className={styles.titleHead}>Secondary-details</div>
          {/* {projectType === "Renovation" ? ( */}
          {projectDetails?.secondary_details ? (
            <>
              <div className={styles.resultSectionDetails}>
                <p>Pincode</p>
                <div>{projectDetails?.secondary_details[0]?.pincode}</div>
              </div>
              <div className={styles.resultSectionDetails}>
                <p>District</p>
                <div>{projectDetails?.secondary_details[0]?.district}</div>
              </div>
              <div className={styles.resultSectionDetails}>
                <p>State</p>
                <div>{projectDetails?.secondary_details[0]?.state}</div>
              </div>
              <div className={styles.resultSectionDetails}>
                <p>Country</p>
                <div>{projectDetails?.secondary_details[0]?.country}</div>
              </div>
              <div className={styles.resultSectionDetails}>
                <p>Work location</p>
                <div>{projectDetails?.secondary_details[0]?.work_location}</div>
              </div>
              <div className={styles.resultSectionDetails}>
                <p>Address</p>
                <div>{projectDetails?.secondary_details[0]?.address}</div>
              </div>
            </>
          ) : (
            ""
          )}
          {/* ) : (
            ""
          )} */}
          {/* <============Choose-plan=============> */}
          <div className={styles.titleHead}>Choose-plan</div>
          {/* {projectType === "Renovation" ? (
            <> */}
          <div className={styles.resultSectionDetails}>
            <p>Plan name</p>
            <div>{projectDetails?.plan_id?.plan_name}</div>
          </div>
          {projectDetails?.plan_id?.plan_name === "BASIC" ? (
            <div className={styles.resultSectionDetails}>
              <p>Plan services</p>
              <div>{projectDetails?.plan_id?.plan_services}</div>
            </div>
          ) : (
            ""
          )}
          {projectDetails?.plan_id?.plan_name === "PLUS" ? (
            <div className={styles.resultSectionDetails}>
              <p>Plan services</p>
              <div>{projectDetails?.plan_id?.plan_services}</div>
            </div>
          ) : (
            ""
          )}
          {projectDetails?.plan_id?.plan_name === "ELITE" ? (
            <div className={styles.resultSectionDetails}>
              <p>Plan services</p>
              <div>{projectDetails?.plan_id?.plan_services}</div>
            </div>
          ) : (
            ""
          )}
          {/* </>
          ) : (
            ""
          )} */}
          {/* <============File-uploads=============> */}
          <div className={styles.titleHead}>File-uploads</div>
          {/* {projectType === "Renovation" ? (
            <> */}
          <div className={styles.resultSectionDetails}>
            <p>Upload site plan</p>
            <div>
              <a href={projectDetails.site_plan} target="_blank">
                view
              </a>
            </div>
          </div>
          <div className={styles.resultSectionDetails}>
            <p>Upload referance images</p>
            <div>
              {projectDetails?.reference_images?.map((items, key) => {
                return (
                  <>
                    {/* <a href={projectDetails.reference_images} target="_blank">
                  : <img src={projectDetails.reference_images} alt="reference_images" />
                </a> */}
                    <img
                      src={item ? item : "/img/landing/nophoto.jpg"}
                      onError={(e) => (e.target.src = "/img/landing/nophoto.jpg")}
                      alt="reference_images"
                    />
                  </>
                );
              })}
            </div>
          </div>
          <div className={styles.resultSectionDetails}>
            <p>Upload thumbnail images</p>
            {/* <a href={projectDetails.thumbnail} target="_blank">
                  : view
                </a> */}
            <div>
              <img
                src={projectDetails?.thumbnail ? projectDetails?.thumbnail : "/img/common/ni.jpg"}
                onError={(e) => (e.target.src = "/img/common/ina.png")}
                alt="thumbnail"
              />
            </div>
          </div>
          {/* </>
          ) : (
            ""
          )} */}
          {/* {projectType === "Apartment" ? (
            <div className={styles.results__container}>
              <div className={styles.resultSection}>
                <p>Total Floorsss</p>
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
          )} */}
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
          {/* {projectType === "Hotels/restaurants" ? (
            <div className={styles.results__container}>
              <div className={styles.resultSection}>
                <p>Total Floors</p>
                <div className={styles.resultTextContainer}>3</div>
              </div>
              <div className={styles.resultSection}>
                <p>Total occupancy</p>
                <div className={styles.resultTextContainer}>3000</div>
              </div>
              <div className={styles.resultSection}>
                <p>Terrace Restaurant/Cafe</p>
                <div className={styles.resultTextContainer}>test</div>
              </div>
              <div className={styles.resultSection}>
                <p>Outer kitchen</p>
                <div className={styles.resultTextContainer}>y/n</div>
              </div>
            </div>
          ) : (
            ""
          )} */}
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
