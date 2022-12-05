/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import moment from "moment";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { StoreContext } from "../StoreContext";

import styles from "./RequirementsMain.module.css";
import api_url from "../../src/utils/url";

const BasicDetailsMain = () => {
  const [Store] = useContext(StoreContext);

  const bid = Store.bid;
  const bidArchitectId = Store.bidArchitectId;
  const setBid = Store.setBid;
  const setBidArchitectId = Store.setBidArchitectId;

  const [projectTypes, setProjectTypes] = useState([]);
  const [allRequirements, setRequirements] = useState([]);

  const [selectedtype, setSelectedType] = useState("Residential");
  const [area, setArea] = useState("");
  const [budget, setBudget] = useState("");
  const [plot, setPlot] = useState("");
  const [location, setLocation] = useState("");
  const [suggessions, setSuggessions] = useState("");
  const [projectDetails, setProjectDetails] = useState([]);
  const [requirementList, setRequirementList] = useState([]);

  const [floor, setFloor] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [familyMembers, setFamilyMembers] = useState("");

  const storeCommonDetails = () => {
    setArea(document.getElementById("area").value);
    setBudget(document.getElementById("budget").value);
    setPlot(document.getElementById("plot").value);
    setLocation(document.getElementById("location").value);
    setSuggessions(document.getElementById("suggessions").value);
  };

  const storeResDetails = () => {
    setFloor(document.getElementById("floor").value);
    setBedroom(document.getElementById("bedroom").value);
    setBathroom(document.getElementById("bathroom").value);
    setFamilyMembers(document.getElementById("familyMembers").value);
  };

  const residentialDetails = [
    {
      total_floors: floor,
      total_bedroom: bedroom,
      total_bathroom: bathroom,
      total_familyMembers: familyMembers,
    },
  ];

  useEffect(() => {
    if (selectedtype === "Residential") {
      setProjectDetails(residentialDetails);
    }
  }, [selectedtype, floor, bedroom, bathroom, familyMembers]);

  /* GET PROJECT TYPES */
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

  /* GET REQUIREMET LIST */
  async function getRequirementList() {
    const token = localStorage.getItem("userToken");
    const res = await fetch(`${api_url}/requirementlist`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data.data);
    setRequirements(data.data);
  }

  useEffect(() => {
    getProjects();
    getRequirementList();
  }, []);

  const chooseProjectType = (e) => {
    setSelectedType(e.target.value);
  };

  const goToSecondaryDetails = () => {
    handleSubmit();
  };

  /* CREATE PROJECT */
  const handleSubmit = () => {
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
          project_type: selectedtype,
          starting_date: formatDate,
          ending_date: "null",
          status: "started",
          architect_id: bidArchitectId,
          bid: bid,
          projectsub_type: null,
          project_type_details: projectDetails,
          requiremet_list: requirementList,
          project_requirements: [
            {
              area: area,
              budget: budget,
              plot: plot,
              location: location,
              suggessions: suggessions,
            },
          ],
        },
        config
      )
      .then((response) => {
        console.log(response);
        if (response.data.status == 200) {
          localStorage.setItem("projectId", response.data.data._id);
          window.location.href = "/requirement/secondary-details";
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong please try again");
      });
  };

  const getValueChecked = (e) => {
    if (e.target.checked) {
      setRequirementList((requirementList) => [...requirementList, e.target.value]);
    } else {
      requirementList.splice(requirementList.indexOf(e.target.value), 1);
    }
  };

  useEffect(() => {
    console.log(requirementList);
  }, [requirementList]);

  return (
    <>
      <div className={styles.main_outer}>
        <div className={styles.main_inner}>
          <div className={styles.top__main_inner}>
            <div className={styles.left__main_inner}>
              <div className={styles.progressCol}>
                <div className={styles.progress_container}>
                  <span>1</span>
                  <p>Basic Details</p>
                </div>
                <span></span>
              </div>
              <div className={styles.progressColn}>
                <div className={styles.progress_containern}>
                  <span>2</span>
                  <p>Secondary Details</p>
                </div>
                <span></span>
              </div>
              <div className={styles.progressColn}>
                <div className={styles.progress_containern}>
                  <span>3</span>
                  <p>Choose Plan</p>
                </div>
                <span></span>
              </div>
              <div className={styles.progressColn}>
                <div className={styles.progress_containern}>
                  <span>4</span>
                  <p>Files Upload</p>
                </div>
              </div>
            </div>
            <div className={styles.right__main_inner}>
              <p>Basic Details</p>
              <div className={styles.inputRow}>
                <div className={styles.projectType_input_container}>
                  <p>
                    Choose project type <span>*</span>
                  </p>
                  <div className={styles.projectType_select_container}>
                    <select onChange={chooseProjectType}>
                      {projectTypes?.map((project, index) => {
                        return (
                          <option key={index} value={project.project_type}>
                            {project.project_type}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className={styles.areaNbudget_input_conatiner}>
                  <input onChange={storeCommonDetails} id="area" type="tel" placeholder="Enter total area in sq.ft*" />
                  <input onChange={storeCommonDetails} id="budget" type="tel" placeholder="Enter Aproximate budget*" />
                </div>
              </div>
              <div className={styles.inputRow}>
                <div className={styles.plot_input_conatiner}>
                  <input
                    type="text"
                    onChange={storeCommonDetails}
                    id="plot"
                    placeholder="Total plot in cent/acre (eg. 1200 acre)*"
                  />
                </div>
                <div className={styles.location_input_conatiner}>
                  <input onChange={storeCommonDetails} id="location" type="text" placeholder="Location*" />
                </div>
              </div>
              <div className={styles.moreDetails_container}>
                <textarea
                  type="text"
                  onChange={storeCommonDetails}
                  id="suggessions"
                  placeholder="Enter your suggessions (optional)"
                />
              </div>
              {selectedtype === "Residential" ? (
                <div className={styles.residence_details_container}>
                  <p>Residential details</p>
                  <div className={styles.inputRow}>
                    <div className={styles.floorNbedroom_input_conatiner}>
                      <input type="tel" id="floor" onChange={storeResDetails} placeholder="Total floors*" />
                      <input type="tel" id="bedroom" onChange={storeResDetails} placeholder="Total bedrooms*" />
                    </div>
                    <div className={styles.floorNbedroom_input_conatiner}>
                      <input
                        type="tel"
                        id="bathroom"
                        onChange={storeResDetails}
                        placeholder="Total attached bathrooms*"
                      />
                      <input
                        type="tel"
                        id="familyMembers"
                        onChange={storeResDetails}
                        placeholder="Total family members*"
                      />
                    </div>
                  </div>
                  <div className={styles.requirementList_container}>
                    <p>Select your Requirements</p>
                    <div className={styles.requirementList_cards_container}>
                      {allRequirements?.map((item, index) => {
                        return (
                          <div key={index} className={styles.requirementList_card}>
                            <input type="checkbox" onClick={getValueChecked} id={item._id} value={item.item} />
                            <p>{item.item}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                " "
              )}
              {selectedtype === "Renovation" ? (
                <div className={styles.residence_details_container}>
                  <p>Renovation details</p>
                  <div className={styles.inputRow}>
                    <div className={styles.renovation_radio_conatiner}>
                      <div className={styles.complete_radio}>
                        <input
                          type="radio"
                          id="complete"
                          name="completeOrPartial"
                          value="Complete"
                          onClick={storeRenovDetails}
                        />
                        <label htmlFor="complete">Complete</label>
                      </div>
                      <div className={styles.complete_radio}>
                        <input
                          type="radio"
                          id="partial"
                          name="completeOrPartial"
                          value="Partial"
                          onClick={storeRenovDetails}
                        />
                        <label htmlFor="partial">Partial</label>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                " "
              )}
              {selectedtype === "Apartment" ? (
                <div className={styles.residence_details_container}>
                  <p>Apartment details</p>
                  <div className={styles.inputRow}>
                    <div className={styles.floorNbedroom_input_conatiner}>
                      <input type="tel" placeholder="Total floors*" />
                      <div className={styles.apartment_types}>
                        <select>
                          <option value="1 BHK">1 BHK</option>
                          <option value="2 BHK">2 BHK</option>
                          <option value="3 BHK">3 BHK</option>
                          <option value="4 BHK">4 BHK</option>
                          <option value="other">other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                " "
              )}
              {selectedtype === "Hotels/restaurants" ? (
                <div className={styles.residence_details_container}>
                  <p>Hotels/restaurants details</p>
                  <div className={styles.inputRow}>
                    <div className={styles.floorNbedroom_input_conatiner}>
                      <input type="tel" placeholder="Total floors*" />
                      <input type="tel" placeholder="Total occupancy*" />
                    </div>
                    <div className={styles.terraceNoutdoor_container}>
                      <div className={styles.terraceNoutdoor_card}>
                        <input type="checkbox" />
                        <p>Terrace Restaurant/Cafe</p>
                      </div>
                      <div className={styles.terraceNoutdoor_card}>
                        <input type="checkbox" />
                        <p>Outdoor kitchen</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                " "
              )}
              {selectedtype === "Hospitals/medical lab" ? (
                <div className={styles.residence_details_container}>
                  <p>Hospitals/medical lab details</p>
                  <div className={styles.inputRow}>
                    <div className={styles.floorNbedroom_input_conatiner}>
                      <input type="tel" placeholder="Total floors*" />
                      <input type="tel" placeholder="Total no. of beds*" />
                    </div>
                  </div>
                </div>
              ) : (
                " "
              )}
              {selectedtype === "Auditorium" ? (
                <div className={styles.residence_details_container}>
                  <p>Auditorium details</p>
                  <div className={styles.inputRow}>
                    <div className={styles.floorNbedroom_input_conatiner}>
                      <input type="tel" placeholder="Total floors*" />
                      <input type="tel" placeholder="Total no. of halls*" />
                    </div>
                  </div>
                </div>
              ) : (
                " "
              )}
              {selectedtype === "Industrial/warehouse" ? (
                <div className={styles.residence_details_container}>
                  <p>Industrial/warehouse details</p>
                  <div className={styles.inputRow}>
                    <div className={styles.floorNbedroom_input_conatiner}>
                      <input type="text" placeholder="Type of business*" />
                    </div>
                  </div>
                </div>
              ) : (
                " "
              )}
              {selectedtype === "Mall" ? (
                <div className={styles.residence_details_container}>
                  <p>Mall details</p>
                  <div className={styles.inputRow}>
                    <div className={styles.floorNbedroom_input_conatiner}>
                      <input type="tel" placeholder="Total floors*" />
                      <input type="tel" placeholder="Total occupancy*" />
                    </div>
                  </div>
                </div>
              ) : (
                " "
              )}
              {selectedtype === "Multiplex" ? (
                <div className={styles.residence_details_container}>
                  <p>Multiplex details</p>
                  <div className={styles.inputRow}>
                    <div className={styles.floorNbedroom_input_conatiner}>
                      <input type="tel" placeholder="Total no. of screens*" />
                      <input type="tel" placeholder="Total occupancy*" />
                    </div>
                  </div>
                </div>
              ) : (
                " "
              )}
              {selectedtype === "Religious building" ? (
                <div className={styles.residence_details_container}>
                  <p>Religious building details</p>
                  <div className={styles.inputRow}>
                    <div className={styles.floorNbedroom_input_conatiner}>
                      <input type="text" placeholder="Type of religion*" />
                      <input type="tel" placeholder="Total occupancy*" />
                    </div>
                  </div>
                </div>
              ) : (
                " "
              )}
              {selectedtype === "School/College building" ? (
                <div className={styles.residence_details_container}>
                  <p>Religious building details</p>
                  <div className={styles.inputRow}>
                    <div className={styles.renovation_radio_conatiner}>
                      <div className={styles.complete_radio}>
                        <input type="radio" id="school" name="schoolOrCollege" value="School" />
                        <label htmlFor="school">School</label>
                      </div>
                      <div className={styles.complete_radio}>
                        <input type="radio" id="college" name="schoolOrCollege" value="Collage" />
                        <label htmlFor="college">Collage</label>
                      </div>
                    </div>
                    <div className={styles.apartment_types}>
                      <select>
                        <option value="Lower primary">Lower primary</option>
                        <option value="Upper primary">Upper primary</option>
                        <option value="High School">High School</option>
                        <option value="Higher secondary">Higher secondary</option>
                      </select>
                    </div>
                    <div className={styles.residentialSchool_card}>
                      <input type="checkbox" />
                      <p>Residential School</p>
                    </div>
                  </div>
                  <div className={styles.floorNbedroom_input_conatiner}>
                    <input type="tel" placeholder="Total floors*" />
                    <input type="tel" placeholder="Total occupancy*" />
                  </div>
                </div>
              ) : (
                " "
              )}
              {selectedtype === "Sports building" ? (
                <div className={styles.residence_details_container}>
                  <p>Sports building details</p>
                  <div className={styles.inputRow}>
                    <div className={styles.floorNbedroom_input_conatiner}>
                      <input type="text" placeholder="Type of sport*" />
                      <input type="tel" placeholder="Total occupancy*" />
                    </div>
                    <div className={styles.terraceNoutdoor_container}>
                      <div className={styles.terraceNoutdoor_card}>
                        <input type="checkbox" />
                        <p>Pool</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                " "
              )}
              {selectedtype === "Hostel" ? (
                <div className={styles.residence_details_container}>
                  <p>Hostel details</p>
                  <div className={styles.inputRow}>
                    <div className={styles.floorNbedroom_input_conatiner}>
                      <input type="tel" placeholder="Total no. of floors*" />
                      <input type="tel" placeholder="Total no. of rooms*" />
                    </div>
                  </div>
                </div>
              ) : (
                " "
              )}
            </div>
          </div>
          <div className={styles.bottom__main_inner}>
            <div className={styles.contactUs_button}>Contact us</div>
            <div className={styles.save_button} onClick={goToSecondaryDetails}>
              Save & Continue
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicDetailsMain;
