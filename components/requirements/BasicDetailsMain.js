import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import api_url from "../../src/utils/url";
import styles from "./RequirementsMain.module.css";

const BasicDetailsMain = () => {
  const [projectTypes, setProjectTypes] = useState([]);
  const [selectedtype, setSelectedType] = useState("Residential");

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

  const chooseProjectType = (e) => {
    setSelectedType(e.target.value);
  };

  const goToSecondaryDetails = () => {
    window.location.href = "/requirement/secondary-details";
  };

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
                  <input type="tel" placeholder="Enter total area in sq.ft*" />
                  <input type="tel" placeholder="Enter Aproximate budget*" />
                </div>
              </div>
              <div className={styles.inputRow}>
                <div className={styles.plot_input_conatiner}>
                  <input
                    type="tel"
                    placeholder="Total plot in cent/acre (eg. 1200 acre)*"
                  />
                </div>
                <div className={styles.location_input_conatiner}>
                  <input type="text" placeholder="Location*" />
                </div>
              </div>
              <div className={styles.moreDetails_container}>
                <textarea
                  type="text"
                  placeholder="Enter your suggessions (optional)"
                />
              </div>
              {selectedtype === "Residential" ? (
                <div className={styles.residence_details_container}>
                  <p>Residential details</p>
                  <div className={styles.inputRow}>
                    <div className={styles.floorNbedroom_input_conatiner}>
                      <input type="tel" placeholder="Total floors*" />
                      <input type="tel" placeholder="Total bedrooms*" />
                    </div>
                    <div className={styles.floorNbedroom_input_conatiner}>
                      <input placeholder="Total attached bathrooms*" />
                      <input type="tel" placeholder="Total family members*" />
                    </div>
                  </div>
                  <div className={styles.requirementList_container}>
                    <p>Select your Requirements</p>
                    <div className={styles.requirementList_cards_container}>
                      <div className={styles.requirementList_card}>
                        <input type="checkbox" />
                        <p>Sitout</p>
                      </div>
                      <div className={styles.requirementList_card}>
                        <input type="checkbox" />
                        <p>Sitout</p>
                      </div>
                      <div className={styles.requirementList_card}>
                        <input type="checkbox" />
                        <p>Sitout</p>
                      </div>
                      <div className={styles.requirementList_card}>
                        <input type="checkbox" />
                        <p>Sitout</p>
                      </div>
                      <div className={styles.requirementList_card}>
                        <input type="checkbox" />
                        <p>Sitout</p>
                      </div>
                      <div className={styles.requirementList_card}>
                        <input type="checkbox" />
                        <p>Sitout</p>
                      </div>
                      <div className={styles.requirementList_card}>
                        <input type="checkbox" />
                        <p>Sitout</p>
                      </div>

                      <div className={styles.requirementList_card}>
                        <input type="checkbox" />
                        <p>Sitout</p>
                      </div>
                      <div className={styles.requirementList_card}>
                        <input type="checkbox" />
                        <p>Sitout</p>
                      </div>

                      <div className={styles.requirementList_card}>
                        <input type="checkbox" />
                        <p>Sitout</p>
                      </div>
                      <div className={styles.requirementList_card}>
                        <input type="checkbox" />
                        <p>Sitout</p>
                      </div>
                      <div className={styles.requirementList_card}>
                        <input type="checkbox" />
                        <p>Sitout</p>
                      </div>
                      <div className={styles.requirementList_card}>
                        <input type="checkbox" />
                        <p>Sitout</p>
                      </div>
                      <div className={styles.requirementList_card}>
                        <input type="checkbox" />
                        <p>Sitout</p>
                      </div>
                      <div className={styles.requirementList_card}>
                        <input type="checkbox" />
                        <p>Sitout</p>
                      </div>
                      <div className={styles.requirementList_card}>
                        <input type="checkbox" />
                        <p>Sitout</p>
                      </div>
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
                        />
                        <label htmlFor="complete">Complete</label>
                      </div>
                      <div className={styles.complete_radio}>
                        <input
                          type="radio"
                          id="partial"
                          name="completeOrPartial"
                          value="Partial"
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
                        <input
                          type="radio"
                          id="school"
                          name="schoolOrCollege"
                          value="School"
                        />
                        <label htmlFor="school">School</label>
                      </div>
                      <div className={styles.complete_radio}>
                        <input
                          type="radio"
                          id="college"
                          name="schoolOrCollege"
                          value="Collage"
                        />
                        <label htmlFor="college">Collage</label>
                      </div>
                    </div>
                    <div className={styles.apartment_types}>
                      <select>
                        <option value="Lower primary">Lower primary</option>
                        <option value="Upper primary">Upper primary</option>
                        <option value="High School">High School</option>
                        <option value="Higher secondary">
                          Higher secondary
                        </option>
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
