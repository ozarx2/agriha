/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { StoreContext } from "../StoreContext";
import Link from "next/link";
import api_url from "../../src/utils/url";
import FolderPopup from "../project-files/folder-popup";

import styles from "./single-main.module.css";
import SuggestProductSearch from "./suggestProductSearch";

export default function SingleOngoingProjectsMain() {
  const [Store] = useContext(StoreContext);

  const setBidUserId = Store.setBidUserId;

  // shijin
  const setPaymentPopup = Store.setPaymentPopup;
  // End  shijin

  const router = useRouter();
  const { id } = router.query;
  const projectId = id;

  const [projectDetails, setProjectDetilas] = useState([]);
  const [projectType, setProjectType] = useState("");
  const [projectTypeDetails, setProjectTypeDetails] = useState([]);
  const [reqList, setReqList] = useState("");
  const [section, setSection] = useState("Reference");
  const [productSelect, setProductSelect] = useState("select");

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
      setProjectDetilas(data?.data);
      setProjectType(data?.data?.project_type);
      setBidUserId(data?.data?.creator?._id);
      setProjectTypeDetails(data?.data?.project_requirements[0]);
    }
  }

  useEffect(() => {
    if (projectId !== undefined) {
      getProjects();
      getUserAllPayment();
      getProductSelected();
    }
  }, [projectId]);

  // console.log(projectDetails);
  const [userPayments, setuserPayments] = useState([]);
  async function getUserAllPayment() {
    const res = await fetch(`${api_url}/user-payment/getbyproject/${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.status === 200) {
      setuserPayments(data.data);
    }
  }

  const [searchFeild, setSearchFeild] = useState("");
  const [suggestProductList, setSuggestProductList] = useState([]);
  async function getUserAllProductForSuggest() {
    const res = await fetch(`${api_url}/product/search/${searchFeild.search[0]}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.status === 200) {
      setSuggestProductList(data.products);
    }
  }

  const [suggestData, setSuggestData] = useState({ phase: "", facility: "", products: "" });
  const [selectProduct, setSelectProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);

  const [errorProduct, setErrorProduct] = useState(false);
  const [errorPhase, setErrorPhase] = useState(false);
  const [errorFacility, setErrorFacility] = useState(false);

  async function fnSelectProduct() {
    let array = [];
    selectProduct.map((item) => {
      const data = {
        productId: item._id,
      };
      array.push(data);
    });

    if (array.length !== 0) {
      setErrorProduct(false);
    } else {
      setErrorProduct(true);
    }
    if (suggestData.phase !== "") {
      setErrorPhase(false);
      if (suggestData.phase === "Structural works" || suggestData.phase === "Interior decorating") {
        if (suggestData.facility !== "") {
          setErrorFacility(false);
        } else {
          setErrorFacility(true);
        }
      } else {
        setErrorFacility(false);
      }
    } else {
      setErrorPhase(true);
    }

    if (array.length !== 0 && suggestData.phase !== "") {
      if (suggestData.phase === "Structural works" || suggestData.phase === "Interior decorating") {
        if (suggestData.facility !== "") {
          fnSelectProductApiOne();
        }
      } else {
        fnSelectProductApiTwo();
      }
    }
  }

  async function fnSelectProductApiOne() {
    setErrorProduct(false);
    setErrorPhase(false);
    setErrorFacility(false);
    let array = [];
    selectProduct.map((item) => {
      const data = {
        productId: item._id,
      };
      array.push(data);
    });
    const res = await fetch(`${api_url}/projects/add_products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        project_id: projectId,
        phase: suggestData.phase,
        facility_name: suggestData?.facility,
        products: array,
      }),
    });
    const data = await res.json();
    if (data.status === 200) {
      console.log(data);
    }
  }

  async function fnSelectProductApiTwo() {
    setErrorProduct(false);
    setErrorPhase(false);
    setErrorFacility(false);
    let array = [];
    selectProduct.map((item) => {
      const data = {
        productId: item._id,
      };
      array.push(data);
    });
    const res = await fetch(`${api_url}/projects/add_products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        project_id: projectId,
        phase: suggestData.phase,
        products: array,
      }),
    });
    const data = await res.json();
    if (data.status === 200) {
      console.log(data);
    }
  }

  async function getProductSelected() {
    const res = await fetch(`${api_url}/projects/suggestedProducts/${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.status === 200) {
      setSelectedProduct(data.data);
    }
  }

  console.log(selectedProduct);

  // Shijin  Payment integration  //
  const [bankAccounts, setBankAccounts] = useState([]);
  useEffect(() => {
    IsBankAccountCreated();
  }, []);

  async function IsBankAccountCreated() {
    const architectid = await localStorage.getItem("architectId");
    const res = await fetch(`${api_url}/arc-payment/arcpaymentdetails/63cfb46e4e4aa08393a23368`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.status === 200) {
      // console.log(data);
      setBankAccounts(data.data);
    }
  }
  // Payment integration End  //

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
                <div onClick={() => setSection("Reference")} className={section === "Reference" ? styles.active : ""}>
                  Reference
                </div>
                <div onClick={() => setSection("Files")} className={section === "Files" ? styles.active : ""}>
                  Files
                </div>
                <div onClick={() => setSection("Payments")} className={section === "Payments" ? styles.active : ""}>
                  Payments
                </div>
                <div onClick={() => setSection("Products")} className={section === "Products" ? styles.active : ""}>
                  Products
                </div>
              </div>
            </div>

            {section === "Reference" ? (
              <>
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
                ) : projectType === "Renovation" ? (
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
                ) : projectType === "Apartment" ? (
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
                ) : projectType === "Hotels/restaurants" ? (
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
                ) : projectType === "Hospitals/medical lab" ? (
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
                ) : projectType === "Auditorium" ? (
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
                ) : projectType === "Industrial/warehouse" ? (
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
                ) : projectType === "Mall" ? (
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
                ) : projectType === "Multiplex" ? (
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
                ) : projectType === "Religious building" ? (
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
                ) : projectType === "School/College building" ? (
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
                ) : projectType === "Sports building" ? (
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
                ) : projectType === "Hostel" ? (
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
                              <td>
                                <div className={styles.left_symbel}>
                                  {projectDetails?.plan_id?.plan_services?.map((item, index) => {
                                    return (
                                      <React.Fragment key={index}>
                                        <span>{item},</span>
                                      </React.Fragment>
                                    );
                                  })}
                                </div>
                              </td>
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
                                <div className={styles.left_symbel}>
                                  {projectDetails?.plan_services?.map((item, index) => {
                                    return (
                                      <React.Fragment key={index}>
                                        <span>{item},</span>
                                      </React.Fragment>
                                    );
                                  })}
                                </div>
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
                      {projectDetails?.site_plan ? (
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
              </>
            ) : section === "Files" ? (
              <>
                <FolderPopup />
              </>
            ) : section === "Payments" ? (
              <>
                <div className={styles.payment_section}>
                  {bankAccounts.length > 0 ? (
                    <button className={styles.btn} onClick={() => setPaymentPopup(true)}>
                      <img src="/img/architect-dashboard/add.svg" alt="" />
                      Add payment
                    </button>
                  ) : (
                    <>
                      <button className={styles.btn} id={styles.disableBtn}>
                        <img src="/img/architect-dashboard/add.svg" alt="" />
                        Add payment
                      </button>
                    </>
                  )}

                  <div className={styles.paymentDetails}>
                    {userPayments.length !== 0 ? (
                      <>
                        {userPayments
                          ?.slice(0)
                          .reverse()
                          .map((project, index) => {
                            return (
                              <div className={styles.payments} key={index}>
                                <table className={styles.table_payment}>
                                  <tbody>
                                    <tr>
                                      <td>Amount</td>
                                      <td>: {project.amount}</td>
                                    </tr>
                                    <tr>
                                      <td>Stage</td>
                                      <td>: {project.stage}</td>
                                    </tr>
                                    <tr>
                                      <td>Status</td>
                                      <td>: {project.status}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            );
                          })}
                      </>
                    ) : (
                      <p>No payment here</p>
                    )}
                  </div>
                </div>
              </>
            ) : section === "Products" ? (
              <div className={styles.products_all_outer}>
                <div className={styles.n_one}>
                  <div className={styles.btns}>
                    <div
                      onClick={() => setProductSelect("select")}
                      className={productSelect === "select" ? styles.active : ""}
                    >
                      Select Products
                    </div>
                    <div
                      onClick={() => setProductSelect("selected")}
                      className={productSelect === "selected" ? styles.active : ""}
                    >
                      Selected Products
                    </div>
                  </div>
                </div>

                {productSelect === "select" ? (
                  <>
                    <div className={styles.suggest_all_outer}>
                      <div className={styles.suggest_outer}>
                        <div>
                          <h4>Phase</h4>
                          <select
                            name="phase"
                            onChange={(e) => setSuggestData({ ...suggestData, phase: e.target.value })}
                          >
                            <option disabled selected value>
                              {" "}
                              -- select an option --{" "}
                            </option>
                            <option value="Structural works">Structural works</option>
                            <option value="Interior decorating">Interior decorating</option>
                            <option value="Exterior decorating">Exterior decorating</option>
                            <option value="Landscaping & Hardscaping">Landscaping & Hardscaping</option>
                            <option value="Security & Automation">Security & Automation</option>
                          </select>
                          {errorPhase ? <p className={styles.error}>Select phase</p> : ""}
                        </div>
                        {suggestData.phase === "Structural works" ? (
                          <div>
                            <h4>Facility</h4>
                            <select
                              name="structural_works"
                              onChange={(e) => setSuggestData({ ...suggestData, facility: e.target.value })}
                            >
                              <option disabled selected value>
                                {" "}
                                -- select an option --{" "}
                              </option>
                              <option value="Substructural works">Substructural works</option>
                              <option value="Electrical works">Electrical works</option>
                              <option value="Plumbing works">Plumbing works</option>
                              <option value="Plastering works">Plastering works</option>
                              <option value="Flooring works">Flooring works</option>
                            </select>
                            {errorFacility ? <p className={styles.error}>Select facility</p> : ""}
                          </div>
                        ) : suggestData.phase === "Interior decorating" ? (
                          <div>
                            <h4>Facility</h4>
                            <input
                              type="text"
                              name="facility"
                              onChange={(e) => setSuggestData({ ...suggestData, facility: e.target.value })}
                            />
                            {errorFacility ? <p className={styles.error}>Type facility</p> : ""}
                          </div>
                        ) : (
                          ""
                        )}
                        <div>
                          <button className={styles.suggest_btn} onClick={() => fnSelectProduct()}>
                            Select product
                          </button>
                          {errorProduct ? <p className={styles.error}>Select products</p> : ""}
                        </div>
                      </div>
                    </div>
                    <div className={styles.search_all_outer}>
                      <div className={styles.search_c}>
                        <input
                          type="text"
                          name="search"
                          onChange={() => setSearchFeild({ ...searchFeild, [event.target.name]: [event.target.value] })}
                        />
                        <button onClick={() => getUserAllProductForSuggest()} className={styles.search_btn}>
                          Search
                        </button>
                      </div>
                      <div className={styles.products_max_outer}>
                        {suggestProductList.length !== 0 ? (
                          <>
                            {suggestProductList?.map((product, index) => {
                              return (
                                <SuggestProductSearch
                                  key={index}
                                  index={index}
                                  product={product}
                                  selectProduct={selectProduct}
                                  setSelectProduct={setSelectProduct}
                                />
                              );
                            })}
                          </>
                        ) : (
                          <p>Search to view product here </p>
                        )}
                      </div>
                    </div>
                  </>
                ) : productSelect === "selected" ? (
                  <>
                    <div className={styles.selected_outer}>
                      <h4>Selected Products</h4>
                      <div className={styles.cat_max_outer}>
                        {selectedProduct.length !== 0 ? (
                          <>
                            {selectedProduct?.map((all_phase, index) => {
                              console.log(all_phase);
                              return (
                                <div className={styles.cat_outer} key={index}>
                                  <div className={styles.cat_all}>
                                    <div className={styles.left}>
                                      <span>Phase : {all_phase.phase}</span>
                                      {all_phase.facility_name ? <span>Facility : {all_phase.facility_name}</span> : ""}
                                    </div>
                                    <div className={styles.right}>Suggest</div>
                                  </div>
                                  <div className={styles.selected_products_max_outer}>
                                    {all_phase.products?.map((product, index) => {
                                      return (
                                        <div className={styles.products_outer} key={index}>
                                          <div className={styles.top}>
                                            <div className={styles.left}>
                                              <div className={styles.product_name}>{product.name}</div>
                                              <div className={styles.product_category}>
                                                <span className={styles.product_categoryMain}>Category</span>{" "}
                                                <span>-</span>
                                                <span className={styles.product_subcategory}>Subcategory</span>
                                              </div>
                                            </div>
                                            <div className={styles.right}>
                                              <div>Remove</div>
                                            </div>
                                          </div>
                                          <img className={styles.image} src="/img/common/ni.jpg" alt="product" />
                                          <div className={styles.price}>
                                            <span className={styles.product_mrp}>MRP : ₹{product.mrp}/-</span>
                                            <span className={styles.product_discount}>
                                              Discount : {product.discount_rate}%
                                            </span>
                                          </div>
                                          <div className={styles.product_adnl_details}>
                                            <span className={styles.product_sku}>
                                              <span className={styles.dim}>SKU :</span> {product.sku}
                                            </span>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                          </>
                        ) : (
                          <p>Please go to "select products" and select any product under any phase </p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
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
