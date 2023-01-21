/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { StoreContext } from "../StoreContext";
import Link from "next/link";
import api_url from "../../src/utils/url";

import styles from "./single-main.module.css";

export default function SingleOngoingProjectsMain() {
  const [Store] = useContext(StoreContext);

  const setBidUserId = Store.setBidUserId;

  const router = useRouter();
  const { id } = router.query;
  const projectId = id;

  const [projectDetails, setProjectDetilas] = useState([]);
  const [projectType, setProjectType] = useState("");
  const [projectTypeDetails, setProjectTypeDetails] = useState([]);
  const [reqList, setReqList] = useState("");

  /* GET PROJECT DETAILS */
  async function getProjects() {
    var token = localStorage.getItem("architectToken");
    const res = await fetch(`${api_url}/projects/single/${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    // console.log(data);
    if (data.status === 200) {
      setProjectDetilas(data?.data[0]);
      setProjectType(data?.data[0]?.project_type);
      setBidUserId(data?.data[0]?.creator?._id);
      setProjectTypeDetails(data?.data[0]?.project_requirements[0]);
    }
  }

  useEffect(() => {
    if (projectId !== undefined) {
      getProjects();
    }
  }, [projectId]);

  console.log(projectDetails);

  return (
    <>
      <div className={styles.main_outer}>
        {projectDetails?.length !== 0 ? (
          <div className={styles.main_inner}>
            <div className={styles.title}>{projectDetails?.project_name}</div>
            <div className={styles.h_type}>{projectType}</div>
            <div className={styles.n_thumbnail}>
              <a href={projectDetails?.thumbnail} target="_blank">
                <img
                  src={projectDetails?.thumbnail ? projectDetails?.thumbnail : "/img/common/ni.jpg"}
                  onError={(e) => (e.target.src = "/img/common/ina.png")}
                  alt="thumbnail"
                />
              </a>
              <div className={styles.n_right}>
                <table className={`${styles.table_out} ${styles.spl}`}>
                  <tbody>
                    <tr>
                      <td>Budget</td>
                      <td>: {projectTypeDetails?.budget}</td>
                    </tr>
                    <tr>
                      <td>Location</td>
                      <td>: {projectTypeDetails?.location}</td>
                    </tr>
                    <tr>
                      <td>Expected area of project</td>
                      <td>: {projectTypeDetails?.area} SQFT</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className={styles.n_one}>
              <div className={styles.btns}>
                <div>Reference</div>
                <div>Files</div>
                <div>Payments</div>
                <div>Products</div>
              </div>
            </div>

            {/* <div className={styles.buttons__container}>
              <Link href={`/project-files/${projectDetails._id}`} passHref>
                <div className={styles.decline_button}>Files</div>
              </Link>
              <div className={styles.accept_button}>Add Payment</div>
              <div className={styles.accept_button}>Add Products</div>
            </div> */}
            {/* <div className={styles.title}>{projectDetails?.project_name}</div> */}
            <div className={styles.titleHead}>Basic details</div>
            <div className={styles.results__container}>
              <table className={styles.table_out}>
                <tbody>
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
                  {projectType === "Interior" ? (
                    ""
                  ) : (
                    <tr>
                      <td>Total Plot</td>
                      <td>: {projectTypeDetails?.plot}</td>
                    </tr>
                  )}
                  <tr>
                    <td>Budget</td>
                    <td>: {projectTypeDetails?.budget}</td>
                  </tr>
                  <tr>
                    <td>Suggessions</td>
                    <td>: {projectTypeDetails?.suggessions}</td>
                  </tr>
                  <tr>
                    <td>Project Location</td>
                    <td>: {projectTypeDetails?.location}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {projectType === "Residential" ? (
              <div className={styles.results__container}>
                <table className={styles.table_out}>
                  <tbody>
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
                            return <React.Fragment key={index}>{item}, </React.Fragment>;
                          })}
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              ""
            )}

            {projectType === "Renovation" ? (
              <div className={styles.results__container}>
                <table className={styles.table_out}>
                  <tbody>
                    <tr>
                      <td>Renovation type</td>
                      <td>: {projectDetails.project_type_details[0].renovation_type}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              ""
            )}

            {projectType === "Apartment" ? (
              <div className={styles.results__container}>
                <table className={styles.table_out}>
                  <tbody>
                    <tr>
                      <td>Total Floors</td>
                      <td>: {projectDetails?.project_type_details[0]?.total_floors}</td>
                    </tr>
                    <tr>
                      <td>Apartment Type</td>
                      <td>: {projectDetails?.project_type_details[0]?.apartment_type}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              ""
            )}

            {projectType === "Hotels/restaurants" ? (
              <div className={styles.results__container}>
                <table className={styles.table_out}>
                  <tbody>
                    <tr>
                      <td>Total Floors</td>
                      <td>: {projectDetails?.project_type_details[0]?.total_floors}</td>
                    </tr>
                    <tr>
                      <td>Total Occupancy</td>
                      <td>: {projectDetails?.project_type_details[0]?.occupancy}</td>
                    </tr>
                    <tr>
                      <td>Is Terrace restaurant/cafe need?</td>
                      <td>: {projectDetails?.project_type_details[0]?.terraceRestaurant_cafe ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                      <td>Is outdoor Kitchen need?</td>
                      <td>: {projectDetails?.project_type_details[0]?.outdoorKitchen ? "Yes" : "No"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              ""
            )}

            {projectType === "Hospitals/medical lab" ? (
              <div className={styles.results__container}>
                <table className={styles.table_out}>
                  <tbody>
                    <tr>
                      <td>Total Floors</td>
                      <td>: {projectDetails?.project_type_details[0]?.total_floors}</td>
                    </tr>
                    <tr>
                      <td>Total Beds</td>
                      <td>: {projectDetails?.project_type_details[0]?.total_beds}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              ""
            )}

            {projectType === "Auditorium" ? (
              <div className={styles.results__container}>
                <table className={styles.table_out}>
                  <tbody>
                    <tr>
                      <td>Total Floors</td>
                      <td>: {projectDetails?.project_type_details[0]?.total_floors}</td>
                    </tr>
                    <tr>
                      <td>Total Halls</td>
                      <td>: {projectDetails?.project_type_details[0]?.total_halls}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              ""
            )}

            {projectType === "Industrial/warehouse" ? (
              <div className={styles.results__container}>
                <table className={styles.table_out}>
                  <tbody>
                    <tr>
                      <td>Type of Business</td>
                      <td>: {projectDetails?.project_type_details[0]?.type_of_business}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              ""
            )}

            {projectType === "Mall" ? (
              <div className={styles.results__container}>
                <table className={styles.table_out}>
                  <tbody>
                    <tr>
                      <td>Total Floors</td>
                      <td>: {projectDetails?.project_type_details[0]?.total_floors}</td>
                    </tr>
                    <tr>
                      <td>Total Occupancy</td>
                      <td>: {projectDetails?.project_type_details[0]?.occupancy}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              ""
            )}

            {projectType === "Multiplex" ? (
              <div className={styles.results__container}>
                <table className={styles.table_out}>
                  <tbody>
                    <tr>
                      <td>Total Screens</td>
                      <td>: {projectDetails?.project_type_details[0]?.total_screens}</td>
                    </tr>
                    <tr>
                      <td>Total Occupancy</td>
                      <td>: {projectDetails?.project_type_details[0]?.occupancy}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              ""
            )}

            {projectType === "Religious building" ? (
              <div className={styles.results__container}>
                <table className={styles.table_out}>
                  <tbody>
                    <tr>
                      <td>Type of Religion</td>
                      <td>: {projectDetails?.project_type_details[0]?.type_of_religion}</td>
                    </tr>
                    <tr>
                      <td>Total Occupancy</td>
                      <td>: {projectDetails?.project_type_details[0]?.occupancy}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              ""
            )}

            {projectType === "School/College building" ? (
              <div className={styles.results__container}>
                <table className={styles.table_out}>
                  <tbody>
                    <tr>
                      <td>School/College</td>
                      <td>: {projectDetails?.project_type_details[0]?.school_or_Collage}</td>
                    </tr>
                    {projectDetails?.project_type_details[0]?.school_or_Collage === "School" ? (
                      <>
                        <tr>
                          <td>School type</td>
                          <td>: {projectDetails?.project_type_details[0]?.school_type}</td>
                        </tr>
                        <tr>
                          <td>is residential school ?</td>
                          <td>: {projectDetails?.project_type_details[0]?.is_residential_school ? "Yes" : "No"}</td>
                        </tr>
                      </>
                    ) : (
                      ""
                    )}
                    <tr>
                      <td>Total Floors</td>
                      <td>: {projectDetails?.project_type_details[0]?.total_floors}</td>
                    </tr>
                    <tr>
                      <td>Total Occupancy</td>
                      <td>: {projectDetails?.project_type_details[0]?.occupancy}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              ""
            )}

            {projectType === "Sports building" ? (
              <div className={styles.results__container}>
                <table className={styles.table_out}>
                  <tbody>
                    <tr>
                      <td>Type of Sports</td>
                      <td>: {projectDetails?.project_type_details[0]?.type_of_sport}</td>
                    </tr>
                    <tr>
                      <td>Total Occupancy</td>
                      <td>: {projectDetails?.project_type_details[0]?.occupancy}</td>
                    </tr>
                    <tr>
                      <td>is Pool need ?</td>
                      <td>: {projectDetails?.project_type_details[0]?.pool ? "Yes" : "No"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              ""
            )}

            {projectType === "Hostel" ? (
              <div className={styles.results__container}>
                <table className={styles.table_out}>
                  <tbody>
                    <tr>
                      <td>Total Floors</td>
                      <td>: {projectDetails?.project_type_details[0]?.total_floors}</td>
                    </tr>
                    <tr>
                      <td>Total Rooms</td>
                      <td>: {projectDetails?.project_type_details[0]?.total_rooms}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              ""
            )}

            {/* <============Secondary-details=============> */}

            {/* <div className={styles.titleHead}>Secondary-details</div>

            {projectDetails?.secondary_details ? (
              <table className={styles.table_out}>
              <tbody>
                <tr>
                  <td>Pincode</td>
                  <td>: {projectDetails?.secondary_details[0]?.pincode}</td>
                </tr>
                <tr>
                  <td>District</td>
                  <td>: {projectDetails?.secondary_details[0]?.district}</td>
                </tr>
                <tr>
                  <td>State</td>
                  <td>: {projectDetails?.secondary_details[0]?.state}</td>
                </tr>
                <tr>
                  <td>Country</td>
                  <td>: {projectDetails?.secondary_details[0]?.country}</td>
                </tr>
                <tr>
                  <td>Work location</td>
                  <td>: {projectDetails?.secondary_details[0]?.work_location}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>: {projectDetails?.secondary_details[0]?.address}</td>
                </tr>
                </tbody>
              </table>
            ) : (
              ""
            )} */}

            {/* <============Choose-plan=============> */}
            {projectDetails?.length !== 0 ? (
              <>
                <div className={styles.titleHead}>Choose-plan</div>

                <table className={styles.table_out}>
                  <tbody>
                    {projectDetails?.plan_id ? (
                      <>
                        <tr>
                          <td>Plan name</td>
                          <td>: {projectDetails?.plan_id?.plan_name}</td>
                        </tr>
                        <tr>
                          <td>Plan services</td>
                          <td>: {projectDetails?.plan_id?.plan_services}</td>
                        </tr>
                      </>
                    ) : (
                      ""
                    )}
                    {projectDetails?.plan_services?.length !== 0 ? (
                      <>
                        <tr>
                          <td>Plan name</td>
                          <td>: As per requirements</td>
                        </tr>
                        <tr>
                          <td>Plan services</td>
                          <td>
                            :{" "}
                            {projectDetails?.plan_services?.map((item, index) => {
                              return <React.Fragment key={index}>{item}, </React.Fragment>;
                            })}
                          </td>
                        </tr>
                      </>
                    ) : (
                      ""
                    )}
                  </tbody>
                </table>
              </>
            ) : (
              ""
            )}

            {/* <============File-uploads=============> */}
            {projectDetails?.length !== 0 ? <div className={styles.titleHead}>File-uploads</div> : ""}

            <div className={styles.resultSectionDetails}>
              <table className={styles.table_out}>
                <tbody>
                  {projectDetails.site_plan ? (
                    <tr>
                      <td>Uploaded site plan </td>
                      <td>
                        :{" "}
                        <a href={projectDetails.site_plan} target="_blank">
                          view
                        </a>
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}
                  {projectDetails?.reference_images ? (
                    <tr>
                      <td>Uploaded referance images </td>
                      <td>
                        {projectDetails?.reference_images?.map((item, key) => {
                          return (
                            <a key={key} href={item} target="_blank">
                              <img
                                src={item ? item : "/img/common/ni.jpg"}
                                onError={(e) => (e.target.src = "/img/common/ina.png")}
                                alt="reference_images"
                              />
                            </a>
                          );
                        })}
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}
                  {projectDetails?.thumbnail ? (
                    <tr>
                      <td>Uploaded thumbnail images </td>
                      <td>
                        <a href={projectDetails?.thumbnail} target="_blank">
                          <img
                            src={projectDetails?.thumbnail ? projectDetails?.thumbnail : "/img/common/ni.jpg"}
                            onError={(e) => (e.target.src = "/img/common/ina.png")}
                            alt="thumbnail"
                          />
                        </a>
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className={styles.main_inner}>
            <div className={styles.loading}>
              <img src="/img/landing/loading.svg" alt="Loading..." />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
